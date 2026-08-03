import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { WaitlistEntry, WaitlistRequest } from '@busybuddy/shared';

/**
 * A tiny append-only JSON-file datastore for waitlist leads.
 *
 * This is intentionally simple: it persists entries to `<dataDir>/waitlist.json`
 * as a JSON array. It is process-safe within a single instance via an in-memory
 * write lock, and survives restarts. For production scale you would swap this
 * for Postgres/Mongo behind the same interface — see README "Follow-ups".
 */
export class WaitlistStore {
  private readonly filePath: string;
  private writeChain: Promise<void> = Promise.resolve();

  constructor(dataDir: string) {
    this.filePath = path.join(dataDir, 'waitlist.json');
  }

  private async ensureFile(): Promise<void> {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, '[]', 'utf8');
    }
  }

  async readAll(): Promise<WaitlistEntry[]> {
    await this.ensureFile();
    const raw = await fs.readFile(this.filePath, 'utf8');
    try {
      const parsed = JSON.parse(raw) as unknown;
      return Array.isArray(parsed) ? (parsed as WaitlistEntry[]) : [];
    } catch {
      return [];
    }
  }

  /** Serialize writes so concurrent requests don't clobber the file. */
  async add(input: WaitlistRequest): Promise<WaitlistEntry> {
    const entry: WaitlistEntry = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const run = this.writeChain.then(async () => {
      const all = await this.readAll();
      all.push(entry);
      await fs.writeFile(this.filePath, JSON.stringify(all, null, 2), 'utf8');
    });

    // Keep the chain alive even if one write rejects.
    this.writeChain = run.catch(() => undefined);
    await run;
    return entry;
  }

  async count(): Promise<number> {
    return (await this.readAll()).length;
  }
}

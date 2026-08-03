import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Resolved runtime configuration, read once at startup. */
export interface AppConfig {
  port: number;
  corsOrigins: string[];
  dataDir: string;
}

function parseOrigins(raw: string | undefined): string[] {
  if (!raw) return ['http://localhost:5173'];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export const config: AppConfig = {
  port: Number(process.env.PORT ?? 3001),
  corsOrigins: parseOrigins(process.env.CORS_ORIGIN),
  // Default to backend/data (dist/.. -> backend root) so it works after build too.
  dataDir: process.env.DATA_DIR
    ? path.resolve(process.env.DATA_DIR)
    : path.resolve(__dirname, '..', 'data'),
};

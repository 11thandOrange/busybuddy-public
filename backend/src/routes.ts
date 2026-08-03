import { Router } from 'express';
import type { HealthResponse, WaitlistResponse, WidgetsResponse } from '@busybuddy/shared';
import { WIDGET_IDS } from '@busybuddy/shared';
import { waitlistSchema } from './validation.js';
import type { WaitlistStore } from './store.js';

export function createRouter(store: WaitlistStore): Router {
  const router = Router();

  // Health check.
  router.get('/health', (_req, res) => {
    const body: HealthResponse = {
      status: 'ok',
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    };
    res.json(body);
  });

  // Widget catalog metadata (ids only; full catalog is bundled in the frontend).
  router.get('/widgets', (_req, res) => {
    const body: WidgetsResponse = {
      ok: true,
      data: { count: WIDGET_IDS.length, ids: [...WIDGET_IDS] },
    };
    res.json(body);
  });

  // Waitlist / contact submission.
  router.post('/waitlist', async (req, res) => {
    const parsed = waitlistSchema.safeParse(req.body);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join('.') || 'form';
        if (!fields[key]) fields[key] = issue.message;
      }
      const body: WaitlistResponse = {
        ok: false,
        error: 'Validation failed',
        fields,
      };
      res.status(400).json(body);
      return;
    }

    try {
      const entry = await store.add(parsed.data);
      const body: WaitlistResponse = { ok: true, data: entry };
      res.status(201).json(body);
    } catch {
      const body: WaitlistResponse = { ok: false, error: 'Failed to save entry' };
      res.status(500).json(body);
    }
  });

  return router;
}

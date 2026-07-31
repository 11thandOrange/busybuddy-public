import express, { type Express } from 'express';
import cors from 'cors';
import { config } from './config.js';
import { WaitlistStore } from './store.js';
import { createRouter } from './routes.js';

/** Build the Express app. Exported separately so it can be tested/imported. */
export function createApp(): Express {
  const app = express();
  const store = new WaitlistStore(config.dataDir);

  app.use(
    cors({
      origin: config.corsOrigins,
    }),
  );
  app.use(express.json({ limit: '32kb' }));

  app.use('/api', createRouter(store));

  // 404 fallback for unknown API routes.
  app.use('/api', (_req, res) => {
    res.status(404).json({ ok: false, error: 'Not found' });
  });

  return app;
}

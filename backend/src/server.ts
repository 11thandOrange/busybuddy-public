import { createApp } from './app.js';
import { config } from './config.js';

const app = createApp();

app.listen(config.port, () => {
  console.log(`[busybuddy] API listening on http://localhost:${config.port}`);
  console.log(`[busybuddy] CORS origins: ${config.corsOrigins.join(', ')}`);
});

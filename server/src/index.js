const app = require('./app');
const { PORT } = require('./env');
const pool = require('./db/pool');

async function bootstrap() {
  try {
    await pool.query('SELECT 1');
    app.locals.readyAt = new Date();
    app.listen(PORT, () => {
      console.log(`[server] API listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('[server] Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();

const { Pool } = require('pg');
const { DATABASE_URL, PGSSLMODE } = require('../env');

const useSSL = ['require', 'prefer'].includes(PGSSLMODE);

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: useSSL
    ? {
        rejectUnauthorized: false
      }
    : undefined
});

pool.on('error', (err) => {
  console.error('[postgres] Unexpected error on idle client', err);
});

module.exports = pool;

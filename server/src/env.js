const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const DATABASE_URL = process.env.DATABASE_URL;
const PGSSLMODE = (process.env.PGSSLMODE || 'disable').toLowerCase();

if (!DATABASE_URL) {
  console.warn('[env] DATABASE_URL 未设置，PostgreSQL 连接可能失败。');
}

module.exports = {
  PORT,
  DATABASE_URL,
  PGSSLMODE
};

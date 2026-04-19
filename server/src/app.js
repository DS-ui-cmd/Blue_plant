const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const markersRouter = require('./routes/markers');

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/markers', markersRouter);

// 404
app.use((req, res) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: '请求的资源不存在'
  });
});

// 错误处理
app.use((err, req, res, _next) => {
  console.error('[server] Unhandled error:', err);
  res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: err.message || '服务器内部错误'
  });
});

module.exports = app;

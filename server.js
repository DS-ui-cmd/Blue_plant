/**
 * 蔚蓝守护 - 后端服务器
 * 支持 AI 智能助手和搜索功能
 */

require('dotenv').config(); // 加载 .env 环境变量

const express = require('express');
const path = require('path');
const { createAIAssistantRoute } = require('./server/ai-assistant');

const app = express();
const PORT = process.env.PORT || 8081;

/* ============= 中间件配置 ============= */

// 静态文件服务
app.use(express.static(path.join(__dirname), {
    maxAge: '1h'
}));

// 请求解析
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 请求日志中间件
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

/* ============= API 路由 ============= */

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 注册 AI 助手路由
createAIAssistantRoute(app);

// 搜索 API 占位符（如果你有后端搜索功能）
app.get('/api/markers/search', (req, res) => {
    const query = req.query.q || '';
    const limit = parseInt(req.query.limit) || 8;

    // 这里可以连接到你的数据库或其他搜索服务
    // 现在返回示例数据
    res.json({
        success: true,
        data: [
            {
                id: 'yh-01',
                type: 'good',
                name: '黄海监测点',
                content: '黄海位于中国北方，是重要的海洋生态区。',
                detailedContent: '黄海水温现状：18-20°C，绿潮监测中...'
            }
        ]
    });
});

// 主页路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 详情页路由
app.get('/detail.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'detail.html'));
});

app.get('/deep-archive.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'deep-archive.html'));
});

/* ============= 错误处理 ============= */

// 404 处理
app.use((req, res) => {
    res.status(404).json({
        error: '请求的资源不存在',
        path: req.path,
        timestamp: new Date().toISOString()
    });
});

// 全局错误处理
app.use((err, req, res, next) => {
    console.error('[Error]', err);
    res.status(500).json({
        error: err.message || '服务器内部错误',
        timestamp: new Date().toISOString()
    });
});

/* ============= 服务器启动 ============= */

app.listen(PORT, () => {
    console.log('\n' + '='.repeat(50));
    console.log('🌊 蔚蓝守护 - 后端服务器已启动');
    console.log('='.repeat(50));
    console.log(`📍 服务器地址: http://localhost:${PORT}`);
    console.log(`🤖 AI 助手: http://localhost:${PORT}/api/ai-assistant/health`);
    console.log(`📊 搜索 API: http://localhost:${PORT}/api/markers/search`);
    console.log('='.repeat(50) + '\n');

    // 显示配置状态
    console.log('📋 配置状态:');
    console.log(`   ✓ 环境: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   ${process.env.SILICONFLOW_API_KEY ? '✓' : '⚠️'} AI Key: ${process.env.SILICONFLOW_API_KEY ? '已配置' : '未配置'}`);
    console.log(`   ✓ 端口: ${PORT}`);
    console.log('\n💡 提示:');
    console.log('   - 按 Ctrl+C 停止服务器');
    console.log('   - 编辑 .env 文件来改变配置');
    console.log('   - 查看 QUICK_START_AI.md 获取快速帮助\n');
});

/* ============= 优雅关闭 ============= */

process.on('SIGTERM', () => {
    console.log('\n⏹️  收到关闭信号，正在优雅关闭...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n⏹️  收到中断信号，正在优雅关闭...');
    process.exit(0);
});

module.exports = app;

/**
 * 硅基流动 AI 智能助手 API 代理
 * 安全地处理与硅基流动的通信，隐藏 API key
 */

const API_KEY = process.env.SILICONFLOW_API_KEY || '';
const BASE_URL = 'https://api.siliconflow.cn/v1';
const MODEL = 'Qwen/Qwen2.5-7B-Instruct'; // 硅基流动的正确模型名称格式

/**
 * 与硅基流动 API 通信
 * @param {string} userMessage 用户输入的消息
 * @param {Array} conversationHistory 对话历史
 * @returns {Promise<string>} AI 助手的回复
 *
 * 可用模型列表：
 * - Qwen/Qwen2.5-7B-Instruct (推荐：轻量快速)
 * - Qwen/Qwen2.5-72B-Instruct (更强推理能力)
 * - deepseek-ai/DeepSeek-V2.5 (代码能力强)
 */
async function callSiliconFlowAPI(userMessage, conversationHistory = []) {
    if (!API_KEY) {
        throw new Error('未配置 SILICONFLOW_API_KEY 环境变量');
    }

    // 构建消息列表
    const messages = [
        {
            role: 'system',
            content: '你是一个专业的海洋环保与海域监测的智能助手，名叫"蔚蓝守护助手"。你需要帮助用户查询和理解关于中国沿海水域、海洋生态、气象预警、污染治理等相关信息。使用简洁、准确的语言回答问题。'
        },
        ...conversationHistory,
        {
            role: 'user',
            content: userMessage
        }
    ];

    try {
        const response = await fetch(`${BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages: messages,
                temperature: 0.7,
                top_p: 0.9,
                max_tokens: 1024,
                stream: false
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`SiliconFlow API 错误: ${error.message || response.statusText}`);
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('无效的 API 响应格式');
        }

        return data.choices[0].message.content;
    } catch (error) {
        console.error('[AI Assistant] API 调用错误:', error);
        throw error;
    }
}

/**
 * Express 路由处理函数
 * 用于处理前端的对话请求
 */
function createAIAssistantRoute(app) {
    app.post('/api/ai-assistant/chat', async (req, res) => {
        try {
            const { message, history } = req.body;

            if (!message || typeof message !== 'string') {
                return res.status(400).json({
                    error: '缺少必要参数或参数格式错误'
                });
            }

            // 清理用户输入
            const cleanMessage = message.trim().slice(0, 1000);

            // 确保历史记录格式正确
            const conversationHistory = Array.isArray(history) ? history : [];

            // 调用 API
            const aiResponse = await callSiliconFlowAPI(cleanMessage, conversationHistory);

            return res.json({
                success: true,
                message: aiResponse,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('[AI Assistant Route] 错误:', error);
            return res.status(500).json({
                error: error.message || '处理请求时出错',
                timestamp: new Date().toISOString()
            });
        }
    });

    // 健康检查端点
    app.get('/api/ai-assistant/health', (req, res) => {
        res.json({
            status: 'ok',
            apiKey: API_KEY ? '已配置' : '未配置',
            model: MODEL
        });
    });
}

module.exports = {
    callSiliconFlowAPI,
    createAIAssistantRoute
};

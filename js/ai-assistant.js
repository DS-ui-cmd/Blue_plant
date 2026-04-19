/**
 * 蔚蓝守护 - AI 智能助手前端模块
 * 集成硅基流动的智能对话功能
 */

class AIAssistant {
    constructor() {
        this.apiBaseUrl = (window.__BLUE_AEGIS_API__ || 'http://localhost:8080').replace(/\/$/, '');
        this.conversationHistory = [];
        this.isLoading = false;
        this.elements = {
            input: document.getElementById('searchInput'),
            results: document.getElementById('searchResults'),
            status: document.getElementById('searchStatus'),
            panel: document.getElementById('searchPanel')
        };

        if (!this.elements.input) return;
        this.init();
    }

    init() {
        // 监听输入框的回车键
        this.elements.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey && this.isAIMode()) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // 初始化 AI 模式标记
        this.elements.input.dataset.aiMode = 'true';
    }

    /**
     * 检查是否启用 AI 模式
     * 可以通过输入框的特殊前缀或模式标记来判断
     */
    isAIMode() {
        const value = this.elements.input.value.trim();
        // 如果输入框不为空，就在智能模式下
        return value.length > 0;
    }

    /**
     * 发送消息给 AI 助手
     */
    async sendMessage() {
        const message = this.elements.input.value.trim();
        if (!message) return;

        this.isLoading = true;
        this.elements.input.disabled = true;

        // 显示用户消息
        this.addUserMessage(message);
        this.elements.input.value = '';

        try {
            // 调用后端 API
            const response = await fetch(`${this.apiBaseUrl}/api/ai-assistant/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    history: this.conversationHistory
                })
            });

            if (!response.ok) {
                throw new Error(`请求失败: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                // 添加 AI 的回复到历史
                this.conversationHistory.push({
                    role: 'user',
                    content: message
                });
                this.conversationHistory.push({
                    role: 'assistant',
                    content: data.message
                });

                // 显示 AI 回复
                this.addAIMessage(data.message);
                this.setStatus(`✓ 回复已生成 (${new Date().toLocaleTimeString()})`);
            } else {
                throw new Error(data.error || '未知错误');
            }
        } catch (error) {
            console.error('[AI Assistant] 错误:', error);
            this.addErrorMessage(`错误: ${error.message}`);
            this.setStatus('连接失败，请重试');
        } finally {
            this.isLoading = false;
            this.elements.input.disabled = false;
            this.elements.input.focus();
        }
    }

    /**
     * 添加用户消息到显示区域
     */
    addUserMessage(message) {
        const html = `
            <div class="ai-message ai-message--user">
                <div class="ai-message__avatar">👤</div>
                <div class="ai-message__content">
                    <p>${this.escapeHtml(message)}</p>
                    <span class="ai-message__time">${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        `;
        this.appendToResults(html);
    }

    /**
     * 添加 AI 回复到显示区域
     */
    addAIMessage(message) {
        const html = `
            <div class="ai-message ai-message--assistant">
                <div class="ai-message__avatar">🤖</div>
                <div class="ai-message__content">
                    <p>${this.markdownToHtml(message)}</p>
                    <span class="ai-message__time">${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        `;
        this.appendToResults(html);
    }

    /**
     * 添加错误消息
     */
    addErrorMessage(message) {
        const html = `
            <div class="ai-message ai-message--error">
                <div class="ai-message__avatar">⚠️</div>
                <div class="ai-message__content">
                    <p>${this.escapeHtml(message)}</p>
                </div>
            </div>
        `;
        this.appendToResults(html);
    }

    /**
     * 追加内容到结果区域
     */
    appendToResults(html) {
        if (!this.elements.results) return;

        const div = document.createElement('div');
        div.innerHTML = html;
        this.elements.results.appendChild(div);

        // 自动滚动到底部
        this.elements.results.scrollTop = this.elements.results.scrollHeight;
    }

    /**
     * 设置状态消息
     */
    setStatus(message) {
        if (this.elements.status) {
            this.elements.status.textContent = message;
        }
    }

    /**
     * 清空对话历史
     */
    clearHistory() {
        this.conversationHistory = [];
        if (this.elements.results) {
            this.elements.results.innerHTML = `
                <div class="ai-message ai-message--system">
                    <div class="ai-message__content">
                        <p>👋 欢迎使用蔚蓝守护 AI 智能助手！</p>
                        <p>我可以帮助你查询海域信息、了解气象预警、获取生态数据。请提出你的问题吧！</p>
                    </div>
                </div>
            `;
        }
        this.setStatus('已清空对话历史');
    }

    /**
     * HTML 转义
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * 简单的 Markdown 转 HTML（支持基本格式）
     */
    markdownToHtml(text) {
        let html = this.escapeHtml(text);

        // 加粗：**text** 或 __text__
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

        // 斜体：*text* 或 _text_
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
        html = html.replace(/_(.+?)_/g, '<em>$1</em>');

        // 代码：`text`
        html = html.replace(/`(.+?)`/g, '<code>$1</code>');

        // 换行
        html = html.replace(/\n/g, '<br>');

        return html;
    }
}

// 初始化 AI 助手
document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new AIAssistant();
});

/* ======================== 帮助说明模态框模块 ======================== */

class HelpModal {
    constructor() {
        this.layer = document.getElementById('helpModal');
        this.backdrop = document.querySelector('.help-backdrop');
        this.closeBtn = document.getElementById('helpCloseBtn');
        this.toggleBtn = document.getElementById('helpToggleBtn');

        if (!this.layer || !this.toggleBtn) {
            console.warn('HelpModal: Required elements not found');
            return;
        }

        this.initEvents();
    }

    initEvents() {
        // 打开/关闭帮助
        this.toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (document.body.classList.contains('help-active')) {
                this.close();
            } else {
                this.open();
            }
        });

        // 关闭帮助
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.close();
            });
        }

        // 点击背景关闭
        if (this.backdrop) {
            this.backdrop.addEventListener('click', (e) => {
                if (e.target === this.backdrop) {
                    this.close();
                }
            });
        }

        // Esc键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('help-active')) {
                e.preventDefault();
                this.close();
            }
        });
    }

    open() {
        document.body.classList.add('help-active');
        this.layer.setAttribute('aria-hidden', 'false');
    }

    close() {
        document.body.classList.remove('help-active');
        this.layer.setAttribute('aria-hidden', 'true');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.BlueAegis = window.BlueAegis || {};
    window.BlueAegis.helpModal = new HelpModal();
});

window.HelpModal = HelpModal;

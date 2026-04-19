// 资讯滚动条（依赖 presets.js 中的 tickerPresets）
class InformationTicker {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        const lang = window.BlueI18n && typeof window.BlueI18n.getLang === 'function' ? window.BlueI18n.getLang() : 'zh';
        this.items = tickerPresets[lang] || tickerPresets.zh;
        this.idx = 0;
        this.start();
        if (window.BlueI18n && typeof window.BlueI18n.subscribe === 'function') {
            window.BlueI18n.subscribe((nextLang) => {
                this.items = tickerPresets[nextLang] || tickerPresets.zh;
                this.idx = 0;
                this.container.innerHTML = '';
                this.add();
            });
        }
    }

    start() {
        this.add();
        setInterval(() => this.add(), 5000);
    }

    add() {
        const el = document.createElement('div');
        el.className = 'mb-4 border-l-2 border-ecoGreen/30 pl-3 opacity-0';
        el.innerHTML = `<span class="text-ecoGreen/50 font-mono">[${new Date().toLocaleTimeString()}]</span><br/>${this.items[this.idx]}`;
        this.container.prepend(el);
        gsap.to(el, { opacity: 1, x: 5, duration: 0.5 });
        this.idx = (this.idx + 1) % this.items.length;
        if(this.container.children.length > 6) this.container.lastChild.remove();
    }
}

window.InformationTicker = InformationTicker;

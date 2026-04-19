// 标语轮播（依赖 presets.js 中的 sloganPresets）
class SloganRotator {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        if(!this.element) return;
        const lang = window.BlueI18n && typeof window.BlueI18n.getLang === 'function' ? window.BlueI18n.getLang() : 'zh';
        this.slogans = sloganPresets[lang] || sloganPresets.zh;
        this.idx = 0;
        this.element.innerText = this.slogans[0];
        this.start();
        if (window.BlueI18n && typeof window.BlueI18n.subscribe === 'function') {
            window.BlueI18n.subscribe((nextLang) => {
                this.slogans = sloganPresets[nextLang] || sloganPresets.zh;
                this.idx = 0;
                this.element.innerText = this.slogans[0];
            });
        }
    }

    start() {
        setInterval(() => {
            gsap.to(this.element, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    this.idx = (this.idx + 1) % this.slogans.length;
                    this.element.innerText = this.slogans[this.idx];
                    gsap.to(this.element, { opacity: 1, duration: 0.5 });
                }
            });
        }, 8000);
    }
}

window.SloganRotator = SloganRotator;

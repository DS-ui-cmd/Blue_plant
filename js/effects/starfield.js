// 星空粒子背景
class Starfield {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        const starCount = 150;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 2 + 0.5;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            if (Math.random() > 0.8) star.style.background = Math.random() > 0.5 ? '#4FC3F7' : '#7B61FF';
            this.container.appendChild(star);
        }
    }
}

window.Starfield = Starfield;

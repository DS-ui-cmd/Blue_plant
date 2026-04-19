// 底层数据流 HUD 背景
class BackgroundHUDCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initData();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initData() {
        this.columns = Math.floor(window.innerWidth / 100);
        this.dataPoints = Array(this.columns).fill(0).map((_, i) => ({
            x: i * 100 + 50,
            y: Math.random() * window.innerHeight,
            val: Math.random().toString(16).substr(2, 6).toUpperCase()
        }));
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgba(79, 195, 247, 0.15)';
        this.ctx.font = '9px monospace';
        this.dataPoints.forEach(p => {
            p.y += 0.5;
            if (p.y > this.canvas.height) p.y = -20;
            if (Math.random() < 0.02) p.val = Math.random().toString(16).substr(2, 6).toUpperCase();
            this.ctx.fillText(`0x${p.val}`, p.x, p.y);
            // 绘制连接微弱网格
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'rgba(79, 195, 247, 0.05)';
            this.ctx.moveTo(p.x, 0); this.ctx.lineTo(p.x, this.canvas.height);
            this.ctx.stroke();
        });
    }
}

window.BackgroundHUDCanvas = BackgroundHUDCanvas;

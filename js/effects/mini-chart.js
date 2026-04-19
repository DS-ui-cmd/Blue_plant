// 右侧迷你折线图 (Canvas)
class MiniChart {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if(!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.data = Array(20).fill(0).map(() => Math.random() * 50 + 20);
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const w = this.canvas.width;
        const h = this.canvas.height;
        const step = w / (this.data.length - 1);

        // 绘制网格
        this.ctx.strokeStyle = 'rgba(79, 195, 247, 0.1)';
        this.ctx.beginPath();
        for(let i=0; i<4; i++) {
            this.ctx.moveTo(0, h * (i/4)); this.ctx.lineTo(w, h * (i/4));
        }
        this.ctx.stroke();

        // 绘制折线
        this.ctx.strokeStyle = '#4FC3F7';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.data.forEach((d, i) => {
            const x = i * step;
            const y = h - (d / 100 * h);
            if(i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        });
        this.ctx.stroke();

        // 填充渐变
        this.ctx.lineTo(w, h);
        this.ctx.lineTo(0, h);
        const grad = this.ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, 'rgba(79, 195, 247, 0.2)');
        grad.addColorStop(1, 'rgba(79, 195, 247, 0)');
        this.ctx.fillStyle = grad;
        this.ctx.fill();

        // 数据更新
        if(Math.random() < 0.1) {
            this.data.shift();
            this.data.push(Math.random() * 40 + 30);
        }
    }
}

window.MiniChart = MiniChart;

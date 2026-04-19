// 动态洋流台风流场背景
class OceanCurrentCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numParticles = 800;
        this.time = 0;

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initParticles() {
        for(let i=0; i<this.numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: 0,
                vy: 0,
                life: Math.random() * 100,
                color: Math.random() > 0.5 ? 'rgba(79, 195, 247, 0.4)' : 'rgba(17, 93, 140, 0.3)',
                size: Math.random() * 1.5 + 0.5
            });
        }
    }

    // 简易噪声函数近似
    noise(x, y, t) {
        return Math.sin(x * 0.005 + t) * Math.cos(y * 0.005 + t) +
               Math.sin(y * 0.01 - t) * Math.cos(x * 0.01 + t * 0.5);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // 拖尾效果
        this.ctx.fillStyle = 'rgba(1, 10, 21, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.time += 0.005;

        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;

        for(let i=0; i<this.numParticles; i++) {
            let p = this.particles[i];

            // 洋流漩涡效果 (台风)
            let dx = p.x - cx;
            let dy = p.y - cy;
            let dist = Math.sqrt(dx*dx + dy*dy);

            // 基于距离的旋转场
            let angle = Math.atan2(dy, dx) + this.noise(p.x, p.y, this.time) * Math.PI;
            let force = 2.0 / (dist * 0.01 + 1);

            // 加入主洋流方向
            p.vx += Math.cos(angle) * force + 0.5;
            p.vy += Math.sin(angle) * force + 0.2;

            // 速度限制
            p.vx *= 0.95;
            p.vy *= 0.95;

            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.5;

            if(p.x < 0 || p.x > this.canvas.width || p.y < 0 || p.y > this.canvas.height || p.life <= 0) {
                p.x = Math.random() * this.canvas.width;
                p.y = Math.random() * this.canvas.height;
                p.life = 100;
                p.vx = 0;
                p.vy = 0;
            }

            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
}

// 气象与潮汐动态模拟
class WeatherDynamics {
    constructor() {
        this.els = {
            tide: document.getElementById('val-tide'),
            wave: document.getElementById('val-wave'),
            wind: document.getElementById('val-wind'),
            dir: document.getElementById('val-dir'),
            bars: {
                plastic: document.getElementById('bar-plastic'),
                co2: document.getElementById('bar-co2'),
                acid: document.getElementById('bar-acid'),
                valPlastic: document.getElementById('val-plastic'),
                valCo2: document.getElementById('val-co2'),
                valAcid: document.getElementById('val-acid')
            }
        };
        this.start();
    }

    start() {
        setInterval(() => {
            // 潮汐模拟
            const time = Date.now() * 0.001;
            const tide = (Math.sin(time * 0.2) * 2).toFixed(2);
            const wave = (Math.abs(Math.cos(time * 0.5)) * 4 + 1).toFixed(1);

            if(this.els.tide) this.els.tide.innerText = `${tide > 0 ? '+' : ''}${tide}m`;
            if(this.els.wave) this.els.wave.innerText = `${wave}m`;

            // 指数微调
            this.updateBar('plastic', 80 + Math.sin(time * 0.1) * 5);
            this.updateBar('co2', 60 + Math.cos(time * 0.1) * 8);
            this.updateBar('acid', 40 + Math.sin(time * 0.05) * 10);
        }, 2000);
    }

    updateBar(key, val) {
        const percent = Math.max(0, Math.min(100, val)).toFixed(0);
        if(this.els.bars[key]) this.els.bars[key].style.width = `${percent}%`;
        const valEl = this.els.bars['val' + key.charAt(0).toUpperCase() + key.slice(1)];
        if(valEl) valEl.innerText = `${percent}%`;
    }
}

window.WeatherDynamics = WeatherDynamics;

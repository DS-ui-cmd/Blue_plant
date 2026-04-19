/* ======================== 中国地形地图弹窗模块 ======================== */

class ChinaMapModal {
    constructor() {
        this.isOpen = false;
        this.layer = document.getElementById('chinaMapModal');
        this.backdrop = document.querySelector('.china-map-backdrop');
        this.closeBtn = document.getElementById('chinaMapCloseBtn');
        this.portalBtn = document.getElementById('chinaMapPortalBtn');
        this.svg = document.getElementById('chinaMapSvg');

        this.markerData = [
            { name: '黄海绿潮防线', type: 'water', lat: 35.0, lng: 121.0, slug: 'yellow-sea-ecoshield', description: '预测提前 72h' },
            { name: '渤海能源守护网', type: 'water', lat: 39.0, lng: 118.5, slug: 'bohai-energy-guardian', description: '211 座油气平台' },
            { name: '珠江口咸潮护盾', type: 'water', lat: 22.5, lng: 113.5, slug: 'pearl-river-saline-guard', description: '大湾区水安全' },
            { name: '南沙群岛监测站', type: 'water', lat: 11.5, lng: 114.3, slug: '', description: '南海监测网络' },
            { name: '滇池再生水网格', type: 'lake', lat: 24.8, lng: 102.7, slug: 'dianchi-regenerative-grid', description: '再生水廊道' },
            { name: '洞庭湖水质监测', type: 'lake', lat: 29.3, lng: 112.5, slug: '', description: '长江支流湖泊' },
            { name: '太湖生态恢复', type: 'lake', lat: 31.2, lng: 120.1, slug: '', description: '富营养化防控' },
            { name: '上海港', type: 'port', lat: 31.4, lng: 121.5, slug: '', description: '全球最大集装箱港' },
            { name: '深圳港', type: 'port', lat: 22.3, lng: 113.9, slug: '', description: '大湾区枢纽' },
            { name: '青岛港', type: 'port', lat: 36.1, lng: 120.3, slug: '', description: '环渤海最大港' },
            { name: '天津港', type: 'port', lat: 38.9, lng: 117.7, slug: '', description: '京津冀枢纽' },
            { name: '大连港', type: 'port', lat: 38.9, lng: 121.6, slug: '', description: '东北最大港口' },
            { name: '长江口碳通量走廊', type: 'eco', lat: 31.3, lng: 121.9, slug: 'yangtze-estuary-carbon-corridor', description: '蓝碳贡献' }
        ];

        this.initEvents();
    }

    initEvents() {
        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
        if (this.backdrop) this.backdrop.addEventListener('click', () => this.close());
        if (this.portalBtn) {
            this.portalBtn.addEventListener('click', () => {
                this.close();
                if (window.BlueAegis && window.BlueAegis.portal) {
                    window.BlueAegis.portal.toggle(true);
                }
            });
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('china-map-active')) {
                this.close();
            }
        });
    }

    open() {
        this.isOpen = true;
        document.body.classList.add('china-map-active');
        this.layer.setAttribute('aria-hidden', 'false');
        if (!this.svg.children.length) this._buildSVG();
    }

    close() {
        this.isOpen = false;
        document.body.classList.remove('china-map-active');
        this.layer.setAttribute('aria-hidden', 'true');
    }

    _buildSVG() {
        // 先清除之前的标记
        const oldMarkers = this.svg.querySelectorAll('.cmap-markers, .cmap-plates');
        oldMarkers.forEach(m => m.remove());

        // 添加板块边界
        const platesG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        platesG.setAttribute('class', 'cmap-plates');

        // 板块区域背景（半透明）
        const plateFills = [
            { color: 'rgba(100, 150, 255, 0.08)', path: 'M 10 20 L 50 25 L 70 40 L 50 70 L 20 65 Z', name: '华北板块 (North China Craton)' },
            { color: 'rgba(100, 200, 150, 0.08)', path: 'M 50 40 L 90 35 L 95 70 L 60 75 Z', name: '华南板块 (South China Plate)' },
            { color: 'rgba(150, 100, 200, 0.08)', path: 'M 15 60 L 50 65 L 55 85 L 25 88 Z', name: '西南板块 (Southwest Plate)' },
            { color: 'rgba(200, 150, 100, 0.08)', path: 'M 50 25 L 95 30 L 98 50 L 80 45 Z', name: '欧亚板块东部 (Eurasian East)' }
        ];

        plateFills.forEach(pf => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', pf.path);
            path.setAttribute('fill', pf.color);
            path.setAttribute('stroke', 'rgba(255, 150, 100, 0.5)');
            path.setAttribute('stroke-width', '0.5');
            platesG.appendChild(path);
        });

        // 板块边界线（更详细）
        const plateBoundaries = [
            { stroke: 'rgba(255, 100, 100, 0.6)', path: 'M 50 20 L 80 40 L 85 65' },      // 东边界
            { stroke: 'rgba(255, 150, 100, 0.5)', path: 'M 50 25 L 50 75' },             // 中间分界
            { stroke: 'rgba(100, 150, 255, 0.4)', path: 'M 20 65 L 60 70' },             // 南北分界
            { stroke: 'rgba(150, 200, 150, 0.5)', path: 'M 70 35 L 95 50 L 90 70' }      // 东部边界
        ];

        plateBoundaries.forEach(pb => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', pb.path);
            path.setAttribute('stroke', pb.stroke);
            path.setAttribute('stroke-width', '0.6');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-dasharray', '1.5, 1');
            path.setAttribute('stroke-linecap', 'round');
            platesG.appendChild(path);
        });

        // 板块标签（位置优化）
        const labels = [
            { text: '华北板块', x: 30, y: 40, color: 'rgba(100, 150, 255, 0.8)' },
            { text: '华南板块', x: 70, y: 55, color: 'rgba(100, 200, 150, 0.8)' },
            { text: '西南板块\n(青藏)', x: 35, y: 75, color: 'rgba(150, 100, 200, 0.8)' },
            { text: '太平洋/菲律宾海板块', x: 85, y: 45, color: 'rgba(255, 150, 100, 0.8)' }
        ];

        labels.forEach(lb => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', lb.x);
            text.setAttribute('y', lb.y);
            text.setAttribute('font-size', '1.2');
            text.setAttribute('fill', lb.color);
            text.setAttribute('font-weight', '600');
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('pointer-events', 'none');
            text.textContent = lb.text;
            platesG.appendChild(text);
        });

        this.svg.appendChild(platesG);

        // 添加新的标记点
        const markersG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        markersG.setAttribute('class', 'cmap-markers');

        this.markerData.forEach((m, i) => {
            const g = this._createMarker(m, i);
            markersG.appendChild(g);
        });
        this.svg.appendChild(markersG);

        this._attachMarkerEvents();
    }

    _drawTerrainBackground(ctx, w, h) {
        // 绘制地形渐变背景
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, 'rgba(79,195,247,0.15)');
        grad.addColorStop(0.5, 'rgba(0,223,192,0.08)');
        grad.addColorStop(1, 'rgba(79,195,247,0.12)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // 添加网格效果
        ctx.strokeStyle = 'rgba(79,195,247,0.05)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < w; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, h);
            ctx.stroke();
        }
        for (let j = 0; j < h; j += 40) {
            ctx.beginPath();
            ctx.moveTo(0, j);
            ctx.lineTo(w, j);
            ctx.stroke();
        }
    }

    _createMarker(marker, index) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'cmap-marker');
        g.setAttribute('data-type', marker.type);
        g.dataset.markerData = JSON.stringify(marker);

        const { x, y } = this._lngLatToSVG(marker.lng, marker.lat);
        const colors = { port: '#4FC3F7', water: '#00DFC0', lake: '#7B61FF', eco: '#FF9800' };
        const color = colors[marker.type] || '#4FC3F7';

        // 圆点（调整大小适应新的viewBox）
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '0.6');
        circle.setAttribute('fill', color);
        circle.setAttribute('filter', `drop-shadow(0 0 1px ${color})`);
        g.appendChild(circle);

        // 标签（调整大小适应新的viewBox）
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y - 1.5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '0.8');
        text.setAttribute('fill', 'rgba(255,255,255,0.9)');
        text.setAttribute('pointer-events', 'none');
        text.setAttribute('font-weight', 'bold');
        text.textContent = marker.name;
        g.appendChild(text);

        g.style.cursor = 'pointer';
        return g;
    }

    _lngLatToSVG(lng, lat) {
        // viewBox: 0 0 100 100，所以坐标范围是0-100
        const minLng = 73, maxLng = 135, minLat = 15, maxLat = 55;
        const x = ((lng - minLng) / (maxLng - minLng)) * 85 + 10;  // 从10-95的范围
        const y = ((maxLat - lat) / (maxLat - minLat)) * 50 + 20;  // 从20-70的范围
        return { x: Math.max(10, Math.min(95, x)), y: Math.max(20, Math.min(70, y)) };
    }

    _attachMarkerEvents() {
        this.svg.querySelectorAll('.cmap-marker').forEach(m => {
            m.addEventListener('click', (e) => {
                e.stopPropagation();
                const data = JSON.parse(m.dataset.markerData);
                if (data.slug) window.location.href = `./detail.html?slug=${data.slug}`;
            });
        });
    }

    _getChinaMapPath() {
        // 完整中国轮廓（更多控制点）
        return `M 73 48 L 85 46 L 95 44 L 108 45 L 118 43 L 130 42 L 142 41 L 155 40 L 165 38 L 180 37 L 190 36 L 205 37 L 215 35 L 228 36 L 238 34 L 252 35 L 265 33 L 278 32 L 290 31 L 302 32 L 315 30 L 328 31 L 340 29 L 352 28 L 365 27 L 375 26 L 385 27 L 395 25 L 405 26 L 415 24 L 425 25 L 433 23 L 442 24 L 448 22 L 455 23 L 462 21 L 468 20 L 473 19 L 478 18 L 482 17 L 486 16 L 490 15 L 493 14 L 495 13 L 498 14 L 500 15 L 502 17 L 504 20 L 505 25 L 506 32 L 507 40 L 507 48 L 506 55 L 505 62 L 504 68 L 502 72 L 500 75 L 498 78 L 495 80 L 490 82 L 485 84 L 480 85 L 475 84 L 470 82 L 465 80 L 460 78 L 455 76 L 450 75 L 445 74 L 440 73 L 435 72 L 430 71 L 425 70 L 420 69 L 415 68 L 410 67 L 405 68 L 400 69 L 395 70 L 390 71 L 385 72 L 380 71 L 375 70 L 370 69 L 365 68 L 360 67 L 355 68 L 350 69 L 345 70 L 340 71 L 335 72 L 330 71 L 325 70 L 320 69 L 315 68 L 310 67 L 305 66 L 300 65 L 295 64 L 290 63 L 285 62 L 280 61 L 275 62 L 270 63 L 265 64 L 260 65 L 255 66 L 250 67 L 245 66 L 240 65 L 235 64 L 230 63 L 225 62 L 220 61 L 215 60 L 210 59 L 205 60 L 200 61 L 195 62 L 190 63 L 185 64 L 180 65 L 175 64 L 170 63 L 165 62 L 160 61 L 155 60 L 150 59 L 145 58 L 140 59 L 135 60 L 130 61 L 125 62 L 120 61 L 115 60 L 110 59 L 105 58 L 100 57 L 95 56 L 90 55 L 85 54 L 80 53 L 75 52 L 73 48 Z`;
    }

    _getProvinceLines() {
        return [
            'M 120 55 L 180 65 L 240 70 L 300 75 L 350 78',
            'M 100 60 L 160 70 L 220 75 L 280 80 L 320 82',
            'M 140 70 L 200 80 L 260 85 L 310 88',
            'M 110 45 L 160 55 L 210 60 L 260 65',
            'M 150 50 L 200 58 L 250 62 L 290 65',
            'M 90 65 L 150 72 L 210 78 L 270 82',
            'M 125 48 L 175 58 L 225 65 L 275 70'
        ];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.BlueAegis = window.BlueAegis || {};
    window.BlueAegis.chinaMap = new ChinaMapModal();
});
window.ChinaMapModal = ChinaMapModal;

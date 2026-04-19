const HERO_LABEL_FALLBACK = {
    good: '生态护盾',
    warn: '危机压制单元',
    demo: '示范实验区'
};

function getHeroTypeLabel(type = 'good') {
    if (window.BlueI18n && typeof window.BlueI18n.resolveTypeLabel === 'function') {
        return window.BlueI18n.resolveTypeLabel(type, 'hero');
    }
    return HERO_LABEL_FALLBACK[type] || HERO_LABEL_FALLBACK.demo;
}

function getSlugFromQuery() {
    const search = new URLSearchParams(window.location.search);
    return search.get('slug');
}

function buildFallbackIntel(marker) {
    const stats = Object.entries(marker.stats || {}).map(([label, value]) => ({
        label,
        value,
        trend: '现场采样'
    }));
    return {
        subtitle: marker.title,
        mission: marker.content.replace(/<[^>]*>/g, ''),
        focusMetrics: stats.slice(0, 3),
        news: [
            {
                title: `${marker.name} 最新态势播报`,
                source: 'Global Ocean Sentinel',
                date: new Date().toISOString().split('T')[0],
                url: 'https://www.unep.org/',
                excerpt: marker.detailedContent.replace(/<[^>]*>/g, '').slice(0, 120) + '...'
            }
        ],
        resources: [
            { label: 'UNEP Ocean Hub', type: '报告', url: 'https://www.unep.org/oceans-seas-and-coasts' },
            { label: 'NOAA Ocean Data', type: '数据', url: 'https://www.noaa.gov/ocean-exploration' }
        ],
        gallery: [],
        partners: ['BLUE AEGIS'],
        timeline: [],
        actions: []
    };
}

function renderList(container, items, builder) {
    container.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = builder(item);
        container.appendChild(div);
    });
}

function extractNumeric(value) {
    if (typeof value === 'number') return value;
    const parsed = parseFloat(String(value).replace(/[^0-9.-]/g, ''));
    if (!isNaN(parsed)) return parsed;
    return Math.random() * 100;
}

function createSpectralChart(canvas, metrics, accent = '#4FC3F7') {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const values = (metrics && metrics.length ? metrics : [{ label: 'Signal', value: 50 }]).map(m => extractNumeric(m.value));
    const draw = () => {
        const dpr = window.devicePixelRatio || 1;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (width <= 0 || height <= 0) return; // guard: canvas not yet laid out
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
        const centerX = width / 2;
        const centerY = height / 2;
        const maxRadius = Math.min(width, height) / 2 - 20;
        if (maxRadius <= 0) return; // guard: insufficient space
        const maxValue = Math.max(...values) || 1;
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 4; i++) {
            const radius = (maxRadius / 4) * i;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
        const angleStep = (Math.PI * 2) / values.length;
        ctx.beginPath();
        values.forEach((val, idx) => {
            const norm = val / maxValue;
            const radius = norm * maxRadius;
            const angle = angleStep * idx - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            if (idx === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.closePath();
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, accent || '#4FC3F7');
        gradient.addColorStop(1, '#00DFC0');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.35;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = accent || '#4FC3F7';
        ctx.lineWidth = 2;
        ctx.stroke();
    };
    draw();
    window.addEventListener('resize', draw);
}

function renderLayerStack(container, metrics, accent = '#4FC3F7') {
    if (!container) return;
    container.innerHTML = '';
    const stack = (metrics && metrics.length ? metrics : [{ label: 'DATA LAYER', value: 'N/A' }]).slice(0, 4);
    stack.forEach((metric, index) => {
        const card = document.createElement('div');
        card.className = 'layer-card';
        card.style.setProperty('--layer', (stack.length - index).toString());
        card.style.borderColor = `${accent}40`;
        card.innerHTML = `
            <strong>${metric.label}</strong>
            <span>${metric.value}</span>
            <div class="text-[0.7rem] tracking-[0.3em] uppercase text-white/40 mt-2">${metric.trend || 'DATA STREAM'}</div>
        `;
        container.appendChild(card);
    });
}

function initTelemetry(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const devicePixelRatio = window.devicePixelRatio || 1;
    const resize = () => {
        canvas.width = canvas.clientWidth * devicePixelRatio;
        canvas.height = canvas.clientHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener('resize', resize);
    let time = 0;
    function draw() {
        requestAnimationFrame(draw);
        const w = canvas.width;
        const h = canvas.height;
        if (w <= 0 || h <= 0) return; // guard: canvas not yet laid out
        ctx.clearRect(0, 0, w, h);
        ctx.lineWidth = 2 * devicePixelRatio;
        ctx.strokeStyle = '#4FC3F7';
        ctx.beginPath();
        for (let x = 0; x < w; x += 4 * devicePixelRatio) {
            const y = h / 2 + Math.sin((x + time) * 0.01) * 40 * devicePixelRatio + Math.sin((x + time) * 0.04) * 12 * devicePixelRatio;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        time += 2;
    }
    draw();
}

document.addEventListener('DOMContentLoaded', () => {
    if (!window.markersData || !window.markersData.length) return;
    const slug = getSlugFromQuery() || window.markersData[0].slug;
    const marker = window.markersData.find(item => item.slug === slug) || window.markersData[0];
    const intel = (window.archiveIntel && window.archiveIntel[slug]) || buildFallbackIntel(marker);

    const heroTitleEl = document.getElementById('heroTitle');
    const heroSubtitleEl = document.getElementById('heroSubtitle');
    const heroCoordsEl = document.getElementById('heroCoords');
    const spectralNoteEl = document.getElementById('spectralNote');
    const telemetryNoteEl = document.getElementById('telemetryNote');
    heroTitleEl.innerText = marker.name;
    document.getElementById('missionTitle').innerText = intel.subtitle || marker.title;
    document.getElementById('missionBody').innerText = intel.mission || marker.content.replace(/<[^>]*>/g, '');
    document.getElementById('heroImage').src = marker.image;

    const metricsGrid = document.getElementById('metricsGrid');
    metricsGrid.innerHTML = '';
    const metrics = intel.focusMetrics && intel.focusMetrics.length
        ? intel.focusMetrics
        : Object.entries(marker.stats || {}).map(([label, value]) => ({ label, value, trend: marker.data || '' }));
    metrics.forEach(metric => {
        const card = document.createElement('div');
        card.className = 'metric-chip';
        card.innerHTML = `
            <span class="metric-label">${metric.label}</span>
            <span class="metric-value">${metric.value}</span>
            <span class="metric-trend">${metric.trend || ''}</span>
        `;
        metricsGrid.appendChild(card);
    });

    const statMatrix = document.getElementById('statMatrix');
    if (statMatrix) {
        const matrixSource = [];
        Object.entries(marker.stats || {}).forEach(([label, value]) => {
            matrixSource.push({ label, value, note: marker.data || '现场基线' });
        });
        metrics.slice(0, 4).forEach(metric => {
            matrixSource.push({ label: metric.label, value: metric.value, note: metric.trend || 'Live Stream' });
        });
        matrixSource.push({
            label: 'COORD',
            value: `${marker.lat.toFixed(2)} / ${marker.lng.toFixed(2)}`,
            note: '地理索引'
        });
        statMatrix.innerHTML = '';
        matrixSource.slice(0, 8).forEach(entry => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            cell.innerHTML = `
                <small>${entry.label}</small>
                <strong>${entry.value}</strong>
                <span>${entry.note || '实时监测'}</span>
            `;
            statMatrix.appendChild(cell);
        });
    }

    createSpectralChart(document.getElementById('spectralCanvas'), metrics, marker.color);
    const spectralNote = document.getElementById('spectralNote');
    if (spectralNote) {
        spectralNote.innerText = `基于 ${metrics.length} 项关键指标生成的 2D 频谱雷达 · 色彩映射：${marker.name}`;
    }
    renderLayerStack(document.getElementById('layerStack'), metrics, marker.color);

    const partnerChips = document.getElementById('partnerChips');
    partnerChips.innerHTML = '';
    (intel.partners || []).forEach(p => {
        const span = document.createElement('span');
        span.innerText = p;
        partnerChips.appendChild(span);
    });

    const intelList = document.getElementById('intelList');
    intelList.innerHTML = '';
    const briefingItems = Array.isArray(intel.briefing) ? intel.briefing : [];
    briefingItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <small>${item.tag || 'BRIEF'}</small>
            <strong>${item.title}</strong>
            <p class="text-sm text-white/70 leading-relaxed">${item.detail}</p>
            ${item.stat ? `<span class="text-cyan-300 text-xs tracking-[0.28em] uppercase block mt-1">${item.stat}</span>` : ''}
        `;
        intelList.appendChild(div);
    });
    const narrativeBlock = document.createElement('div');
    narrativeBlock.className = 'list-item rich-copy';
    narrativeBlock.innerHTML = marker.detailedContent || `<p>${intel.mission || ''}</p>`;
    intelList.appendChild(narrativeBlock);

    renderList(document.getElementById('newsList'), intel.news || [], (news) => `
        <small>${news.source} · ${news.date}</small>
        <strong>${news.title}</strong>
        <p class="text-sm text-white/70">${news.excerpt}</p>
        <a class="text-cyan-300 text-xs tracking-[0.3em]" target="_blank" rel="noopener" href="${news.url}" data-i18n-key="cta.openSource">
            ${(window.BlueI18n && window.BlueI18n.t) ? window.BlueI18n.t('cta.openSource') : '打开情报源 →'}
        </a>
    `);

    renderList(document.getElementById('resourceList'), intel.resources || [], (res) => `
        <small>${res.type}</small>
        <strong>${res.label}</strong>
        <a class="text-cyan-300 text-xs tracking-[0.3em]" target="_blank" rel="noopener" href="${res.url}" data-i18n-key="cta.visitLink">
            ${(window.BlueI18n && window.BlueI18n.t) ? window.BlueI18n.t('cta.visitLink') : '访问链接 →'}
        </a>
    `);

    const galleryGrid = document.getElementById('galleryGrid');
    const gallery = [marker.image].concat(intel.gallery || []).filter((url, idx, arr) => url && arr.indexOf(url) === idx);
    galleryGrid.innerHTML = '';
    gallery.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        galleryGrid.appendChild(img);
    });

    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    (intel.timeline || []).forEach(item => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        div.innerHTML = `
            <small>${item.date}</small>
            <h4>${item.title}</h4>
            <p>${item.impact}</p>
        `;
        timeline.appendChild(div);
    });

    const signalBoard = document.getElementById('signalBoard');
    if (signalBoard) {
        const signalItems = [];
        (intel.timeline || []).slice(0, 3).forEach(item => {
            signalItems.push({
                tag: 'TIMELINE',
                title: item.title,
                meta: item.date,
                detail: item.impact
            });
        });
        (intel.news || []).slice(0, 3).forEach(item => {
            signalItems.push({
                tag: item.source,
                title: item.title,
                meta: item.date,
                detail: item.excerpt
            });
        });
        (intel.actions || []).slice(0, 2).forEach(item => {
            signalItems.push({
                tag: 'ACTION',
                title: item.title,
                meta: 'OPS',
                detail: item.detail
            });
        });
        signalBoard.innerHTML = '';
        signalItems.slice(0, 6).forEach(signal => {
            const card = document.createElement('div');
            card.className = 'signal-card';
            card.innerHTML = `
                <small>${signal.tag} · ${signal.meta}</small>
                <strong>${signal.title}</strong>
                <p>${signal.detail}</p>
            `;
            signalBoard.appendChild(card);
        });
    }

    renderList(document.getElementById('actionsList'), intel.actions || [], (action) => `
        <strong>${action.title}</strong>
        <p class="text-white/70">${action.detail}</p>
    `);

    if (window.BlueI18n && typeof window.BlueI18n.applyDom === 'function') {
        window.BlueI18n.applyDom(document.querySelector('.page-shell'));
    }

    const videoLink = document.getElementById('videoLink');
    const resourceWithVideo = (intel.resources || []).find(r => /视频|video/i.test(r.type || ''));
    videoLink.href = (resourceWithVideo && resourceWithVideo.url) || 'https://www.youtube.com/@OceanDecade';
    const newsroomLink = document.getElementById('newsroomLink');
    newsroomLink.href = ((intel.news && intel.news[0]) || {}).url || 'https://www.unep.org/';

    const telemetryCanvas = document.getElementById('telemetryCanvas');
    const telemetrySource = (intel.partners || [])[0] || 'Blue Aegis';
    initTelemetry(telemetryCanvas);

    function applyLanguageLayer() {
        const heroLabel = getHeroTypeLabel(marker.type);
        if (heroSubtitleEl) {
            const subtitle = (window.BlueI18n && typeof window.BlueI18n.t === 'function')
                ? window.BlueI18n.t('detail.hero.subtitleTemplate', { label: heroLabel })
                : `${heroLabel}`;
            heroSubtitleEl.innerText = subtitle;
        }
        if (heroCoordsEl) {
            const coordsText = (window.BlueI18n && typeof window.BlueI18n.t === 'function')
                ? window.BlueI18n.t('detail.hero.coordsTemplate', {
                    lat: marker.lat.toFixed(4),
                    lon: marker.lng.toFixed(4)
                })
                : `LAT ${marker.lat.toFixed(4)} · LON ${marker.lng.toFixed(4)}`;
            heroCoordsEl.innerText = coordsText;
        }
        if (spectralNoteEl) {
            const spectralText = (window.BlueI18n && typeof window.BlueI18n.t === 'function')
                ? window.BlueI18n.t('detail.spectralNote', { count: metrics.length, region: marker.name })
                : `基于 ${metrics.length} 项关键指标生成的二维频谱雷达 · 色彩映射：${marker.name}`;
            spectralNoteEl.innerText = spectralText;
        }
        if (telemetryNoteEl) {
            const telemetryText = (window.BlueI18n && typeof window.BlueI18n.t === 'function')
                ? window.BlueI18n.t('detail.telemetryNote', { source: telemetrySource, time: new Date().toLocaleString() })
                : `同步源：${telemetrySource} · 更新时间 ${new Date().toLocaleString()}`;
            telemetryNoteEl.innerText = telemetryText;
        }
    }

    applyLanguageLayer();
    if (window.BlueI18n && typeof window.BlueI18n.subscribe === 'function') {
        window.BlueI18n.subscribe(applyLanguageLayer);
    }

    const deepLinkBtn = document.getElementById('deepLinkBtn');
    deepLinkBtn.addEventListener('click', () => {
        window.location.href = `./deep-archive.html?slug=${slug}`;
    });

    newsroomLink.addEventListener('click', (e) => {
        if (!newsroomLink.href) e.preventDefault();
    });
});

const HERO_LEVEL_FALLBACK = {
    good: '生态护盾',
    warn: '危机压制单元',
    demo: '示范实验区'
};

function getLevelLabel(type = 'good') {
    if (window.BlueI18n && typeof window.BlueI18n.resolveTypeLabel === 'function') {
        return window.BlueI18n.resolveTypeLabel(type, 'hero');
    }
    return HERO_LEVEL_FALLBACK[type] || HERO_LEVEL_FALLBACK.demo;
}

function getSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get('slug');
}

function stripHtml(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}

function createRow(label, value, note) {
    return `
        <tr>
            <td style="padding:0.4rem 0.6rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.6);">${label}</td>
            <td style="padding:0.4rem 0.6rem;">${value}</td>
            <td style="padding:0.4rem 0.6rem; color:rgba(79,195,247,0.8); font-size:0.85rem;">${note || ''}</td>
        </tr>
    `;
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

function renderReferences(container, resources) {
    container.innerHTML = '';
    resources.forEach(res => {
        const card = document.createElement('a');
        card.href = res.url;
        card.target = '_blank';
        card.rel = 'noopener';
        card.className = 'reference-card';
        card.innerHTML = `
            <small>${res.type}</small>
            <strong>${res.label}</strong>
            <span>${res.url}</span>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const slug = getSlug();
    if (!window.markersData || !window.markersData.length) return;
    const marker = window.markersData.find(item => item.slug === slug) || window.markersData[0];
    const intel = (window.archiveIntel && window.archiveIntel[marker.slug]) || null;

    const deepTitleEl = document.getElementById('deepTitle');
    const deepTaglineEl = document.getElementById('deepTagline');
    deepTitleEl.innerText = marker.name;
    document.getElementById('backToDetail').href = `./detail.html?slug=${marker.slug}`;
    document.getElementById('deepHeroImage').src = marker.image;
    document.getElementById('deepMission').innerText = intel ? (intel.mission || stripHtml(marker.content)) : stripHtml(marker.content);

    const focusMetrics = (intel?.focusMetrics && intel.focusMetrics.length)
        ? intel.focusMetrics
        : Object.entries(marker.stats || {}).map(([label, value]) => ({ label, value }));

    const deepMetrics = document.getElementById('deepMetrics');
    deepMetrics.innerHTML = '';
    focusMetrics.forEach(metric => {
        const chip = document.createElement('div');
        chip.className = 'metric-chip';
        chip.innerHTML = `
            <span class="metric-label">${metric.label}</span>
            <span class="metric-value">${metric.value}</span>
            <span class="metric-trend">${metric.trend || ''}</span>
        `;
        deepMetrics.appendChild(chip);
    });

    const deepMatrix = document.getElementById('deepMatrix');
    if (deepMatrix) {
        const matrixItems = [];
        focusMetrics.slice(0, 5).forEach(item => {
            matrixItems.push({ label: item.label, value: item.value, note: item.trend || 'Focus Metric' });
        });
        Object.entries(marker.stats || {}).forEach(([label, value]) => {
            if (matrixItems.length < 9) {
                matrixItems.push({ label, value, note: marker.data || '现场基线' });
            }
        });
        if (matrixItems.length < 9) {
            matrixItems.push({
                label: 'COORD',
                value: `${marker.lat.toFixed(2)} / ${marker.lng.toFixed(2)}`,
                note: '地理定位'
            });
        }
        deepMatrix.innerHTML = '';
        matrixItems.slice(0, 9).forEach(entry => {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            cell.innerHTML = `
                <small>${entry.label}</small>
                <strong>${entry.value}</strong>
                <span>${entry.note || '实时监测'}</span>
            `;
            deepMatrix.appendChild(cell);
        });
    }

    const dossierText = document.getElementById('dossierText');
    dossierText.innerHTML = marker.detailedContent + (intel ? `<p>${intel.actions?.[0]?.detail || ''}</p>` : '');

    const deepTimeline = document.getElementById('deepTimeline');
    deepTimeline.innerHTML = '';
    (intel?.timeline || []).forEach(item => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        div.innerHTML = `
            <small>${item.date}</small>
            <h4>${item.title}</h4>
            <p>${item.impact}</p>
        `;
        deepTimeline.appendChild(div);
    });

    const partners = document.getElementById('deepPartners');
    partners.innerHTML = '';
    (intel?.partners || []).forEach(p => {
        const span = document.createElement('span');
        span.innerText = p;
        partners.appendChild(span);
    });

    const statTable = document.getElementById('statTable');
    statTable.innerHTML = Object.entries(marker.stats || {}).map(([label, value]) => createRow(label, value, marker.data)).join('');

    renderList(document.getElementById('actionBoard'), intel?.actions || [], (action) => `
        <strong>${action.title}</strong>
        <p class="text-white/70">${action.detail}</p>
    `);

    renderList(document.getElementById('signalList'), intel?.news || [], (news) => `
        <small>${news.source} · ${news.date}</small>
        <strong>${news.title}</strong>
        <p class="text-white/70">${news.excerpt}</p>
        <a class="text-cyan-300 text-xs tracking-[0.3em]" href="${news.url}" target="_blank" rel="noopener" data-i18n-key="cta.openNews">
            ${(window.BlueI18n && window.BlueI18n.t) ? window.BlueI18n.t('cta.openNews') : '打开来源 ↗'}
        </a>
    `);

    const deepGallery = document.getElementById('deepGallery');
    if (deepGallery) {
        const gallerySources = [marker.image].concat(intel?.gallery || []).filter((url, idx, arr) => url && arr.indexOf(url) === idx);
        deepGallery.innerHTML = '';
        gallerySources.slice(0, 8).forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            deepGallery.appendChild(img);
        });
    }

    renderReferences(document.getElementById('referenceGrid'), intel?.resources || []);

    if (window.BlueI18n && typeof window.BlueI18n.applyDom === 'function') {
        window.BlueI18n.applyDom(document.querySelector('.page-shell'));
    }

    function applyLanguageLayer() {
        const label = getLevelLabel(marker.type);
        if (deepTaglineEl) {
            const text = (window.BlueI18n && typeof window.BlueI18n.t === 'function')
                ? window.BlueI18n.t('deep.taglineTemplate', { label })
                : `${label} · LEVEL-III`;
            deepTaglineEl.innerText = text;
        }
    }

    applyLanguageLayer();
    if (window.BlueI18n && typeof window.BlueI18n.subscribe === 'function') {
        window.BlueI18n.subscribe(applyLanguageLayer);
    }
});

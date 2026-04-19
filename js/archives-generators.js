// 档案生成器 — 基于模板填充 archiveIntel 缺失字段，并执行初始化
function slugHash(slug) {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
        hash = (hash << 5) - hash + slug.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function seededRand(slug, salt = 0) {
    const seed = slugHash(slug) + salt * 131;
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function numberRange(min, max, slug, salt = 0, decimals = 0) {
    const value = min + (max - min) * (seededRand(slug, salt) % 1);
    return Number(value).toFixed(decimals);
}

function fillTemplate(str, replacements) {
    return str.replace(/\{(\w+)\}/g, (_, key) => (replacements[key] !== undefined ? replacements[key] : ''));
}

function buildReplacements(marker) {
    return {
        region: marker.name,
        mission: marker.title,
        lat: typeof marker.lat === 'number' ? marker.lat.toFixed(2) : marker.lat,
        lon: typeof marker.lng === 'number' ? marker.lng.toFixed(2) : marker.lng
    };
}

function applyValueConfigs(replacements, configs, slug, saltBase = 0) {
    if (!Array.isArray(configs)) return;
    configs.forEach((cfg, idx) => {
        const key = cfg.key || `value${idx}`;
        const val = numberRange(cfg.min, cfg.max, slug, saltBase + idx, cfg.decimals || 0);
        replacements[key] = cfg.suffix ? `${val}${cfg.suffix}` : val;
    });
}

function stripHtml(input) {
    return (input || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function ensureArray(target, key) {
    if (!Array.isArray(target[key])) {
        target[key] = [];
    }
    return target[key];
}

function buildIsoDate(slug, offset) {
    const year = 2024 + ((slugHash(slug) + offset) % 3);
    const month = ((offset + 1) % 12) + 1;
    const day = 5 + Math.floor(seededRand(slug, offset + 5) * 20);
    return `${year}-${String(month).padStart(2, '0')}-${String(Math.min(day, 28)).padStart(2, '0')}`;
}

function ensureFocusMetrics(intel, marker, slug, markerIndex) {
    const metrics = ensureArray(intel, 'focusMetrics');
    let cursor = 0;
    while (metrics.length < 6 && cursor < densityMetricTemplates.length * 2) {
        const template = densityMetricTemplates[(cursor + markerIndex) % densityMetricTemplates.length];
        metrics.push({
            label: template.label,
            value: `${numberRange(template.min, template.max, slug, cursor + markerIndex, template.decimals || 0)}${template.unit || ''}`,
            trend: template.trend
        });
        cursor++;
    }
}

function ensureNews(intel, marker, slug, markerIndex) {
    const newsList = ensureArray(intel, 'news');
    let cursor = 0;
    while (newsList.length < 5 && cursor < densityNewsTemplates.length * 2) {
        const template = densityNewsTemplates[(newsList.length + cursor + markerIndex) % densityNewsTemplates.length];
        const replacements = buildReplacements(marker);
        applyValueConfigs(replacements, template.values, slug, newsList.length + cursor + markerIndex);
        newsList.push({
            title: fillTemplate(template.title, replacements),
            source: template.source,
            date: buildIsoDate(slug, newsList.length + cursor),
            url: `${template.url}?node=${slug}&n=${newsList.length}`,
            excerpt: fillTemplate(template.excerpt, replacements)
        });
        cursor++;
    }
}

function ensureResources(intel, slug, markerIndex) {
    const resources = ensureArray(intel, 'resources');
    let cursor = 0;
    while (resources.length < 5 && cursor < densityResourceTemplates.length * 2) {
        const template = densityResourceTemplates[(resources.length + cursor + markerIndex) % densityResourceTemplates.length];
        resources.push({
            label: template.label,
            type: template.type,
            url: `${template.url}?ref=${slug}`
        });
        cursor++;
    }
}

function ensureTimeline(intel, marker, slug, markerIndex) {
    const timeline = ensureArray(intel, 'timeline');
    let cursor = 0;
    while (timeline.length < 5 && cursor < densityTimelineTemplates.length * 2) {
        const template = densityTimelineTemplates[(timeline.length + cursor + markerIndex) % densityTimelineTemplates.length];
        const replacements = buildReplacements(marker);
        applyValueConfigs(replacements, template.values, slug, timeline.length + cursor);
        timeline.push({
            date: buildIsoDate(slug, timeline.length + cursor).slice(0, 7),
            title: template.title,
            impact: fillTemplate(template.impact, replacements)
        });
        cursor++;
    }
}

function ensureActions(intel, marker, slug, markerIndex) {
    const actions = ensureArray(intel, 'actions');
    let cursor = 0;
    while (actions.length < 5 && cursor < densityActionTemplates.length * 2) {
        const template = densityActionTemplates[(actions.length + cursor + markerIndex) % densityActionTemplates.length];
        const replacements = buildReplacements(marker);
        applyValueConfigs(replacements, template.values, slug, actions.length + cursor);
        actions.push({
            title: template.title,
            detail: fillTemplate(template.detail, replacements)
        });
        cursor++;
    }
}

function ensureGallery(intel, slug, markerIndex) {
    const gallery = ensureArray(intel, 'gallery');
    let cursor = 0;
    while (gallery.length < 6 && cursor < densityGallerySeeds.length * 2) {
        const base = densityGallerySeeds[(gallery.length + cursor + markerIndex) % densityGallerySeeds.length];
        const candidate = `${base}?auto=format&fit=crop&w=900&q=80&sat=-12&sig=${slug}-${gallery.length}`;
        if (!gallery.includes(candidate)) {
            gallery.push(candidate);
        }
        cursor++;
    }
}

function ensureBriefing(intel, marker, slug, markerIndex) {
    const briefing = ensureArray(intel, 'briefing');
    let cursor = 0;
    while (briefing.length < 4 && cursor < densityBriefingTemplates.length * 2) {
        const template = densityBriefingTemplates[(briefing.length + cursor + markerIndex) % densityBriefingTemplates.length];
        const replacements = buildReplacements(marker);
        applyValueConfigs(replacements, template.values, slug, briefing.length + cursor);
        if (template.stat) {
            const statValue = numberRange(template.stat.min, template.stat.max, slug, briefing.length + cursor + 20, template.stat.decimals || 0);
            replacements[template.stat.key || 'stat'] = template.stat.suffix ? `${statValue}${template.stat.suffix}` : statValue;
        }
        briefing.push({
            tag: template.tag,
            title: fillTemplate(template.title, replacements),
            detail: fillTemplate(template.detail, replacements),
            stat: template.stat ? fillTemplate(template.stat.template || '{stat}', replacements) : undefined
        });
        cursor++;
    }
}

function ensurePartners(intel, markerIndex) {
    const partners = ensureArray(intel, 'partners');
    let cursor = 0;
    while (partners.length < 3 && cursor < densityPartnerPool.length * 2) {
        const candidate = densityPartnerPool[(partners.length + cursor + markerIndex) % densityPartnerPool.length];
        if (!partners.includes(candidate)) {
            partners.push(candidate);
        }
        cursor++;
    }
}

if (typeof markersData !== 'undefined' && Array.isArray(markersData)) {
    markersData.forEach((marker, markerIndex) => {
        if (!marker || !marker.slug) return;
        const slug = marker.slug;
        const intel = archiveIntel[slug] || {
            subtitle: '',
            mission: '',
            focusMetrics: [],
            news: [],
            resources: [],
            gallery: [],
            partners: [],
            timeline: [],
            actions: []
        };
        const subtitleMap = { good: '复苏指挥单元', warn: '危机压制节点', demo: '实验示范站' };
        if (!intel.subtitle) {
            intel.subtitle = `${marker.name} ${subtitleMap[marker.type] || '情报节点'}`;
        }
        if (!intel.mission) {
            const fallbackMission = stripHtml(marker.detailedContent || marker.content || '');
            intel.mission = fallbackMission || `${marker.title} 实时监测任务已激活。`;
        }
        ensureFocusMetrics(intel, marker, slug, markerIndex);
        ensureNews(intel, marker, slug, markerIndex);
        ensureResources(intel, slug, markerIndex);
        ensureTimeline(intel, marker, slug, markerIndex);
        ensureActions(intel, marker, slug, markerIndex);
        ensureGallery(intel, slug, markerIndex);
        ensureBriefing(intel, marker, slug, markerIndex);
        ensurePartners(intel, markerIndex);
        archiveIntel[slug] = intel;
    });
}

window.archiveIntel = archiveIntel;

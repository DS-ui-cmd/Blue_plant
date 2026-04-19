(function () {
    const dictionaries = {
        zh: {
            'title.index': '蔚蓝守护 - 海洋环境保护科幻交互网页',
            'title.detail': '蔚蓝守护 · 二级档案',
            'title.deep': '蔚蓝守护 · 三级深度档案',
            'global.langToggle': '中文 / EN',
            'buttons.langToggleAria': '切换中英文',
            'errors.coreMissing': '系统异常：核心渲染模块未成功加载。',
            'status.online': '● 神经链路在线',
            'index.heading': '蔚蓝守护（BLUE AEGIS）',
            'nav.mission': '深海生态智能监控与气象预警中枢',
            'nav.console': '控制终端',
            'nav.archive': '数据档案',
            'hud.left.section1.title': '实时威胁播报',
            'hud.left.loss': '经济损失（美元）',
            'hud.left.families': '受影响家庭数',
            'hud.left.fatality': '伤亡指数',
            'hud.left.section2.title': '全球生态指数',
            'hud.left.microplastics': '微塑料浓度',
            'hud.left.co2': '二氧化碳吸收率',
            'hud.left.acid': '海水酸化',
            'hud.left.section3.title': '截获通讯',
            'hud.right.section1.title': '极端气象网',
            'hud.right.tide': '潮位变化',
            'hud.right.wave': '浪高',
            'hud.right.wind': '风速',
            'hud.right.dir': '洋流方向',
            'hud.right.section2.title': '流量监控节点',
            'hud.right.queries': '每秒查询',
            'hud.right.active': '活跃终端',
            'hud.right.audience': '全球受众',
            'hud.right.section3.title': '遥测波形',
            'hud.right.orbital': '轨道速度',
            'hud.right.sonar': '声呐射程',
            'hud.right.slogan': '"系统：全球海洋监控已激活"',
            'tip.instructions': '[ 拖拽: 旋转视角 • 滚轮: 缩放 • 点击: 获取情报 ]',
            'buttons.viewDetail': '进入高层级数据档案',
            'buttons.prevMarker': '← 上一个监测点',
            'buttons.nextMarker': '下一个监测点 →',
            'detailOverlay.statsTitle': '卫星遥测分析数据',
            'detailOverlay.close': '返回全球轨道监控',
            'footer.text': '全球海洋守护倡议 · 数据协议 v4.0.2',
            'window.subTemplate': '[ {type} ] {title}',
            'detailOverlay.coordsTemplate': '纬度 {lat} ｜ 经度 {lon}',
            'detail.hero.coordsTemplate': '纬度 {lat} · 经度 {lon}',
            'detail.hero.subtitleTemplate': '{label} · 二级情报',
            'deep.taglineTemplate': '{label} · 三级档案',
            'buttons.backToGlobal': '← 返回全球主控',
            'buttons.toLevel3': '进入第三级档案',
            'buttons.backToLevel2': '← 返回二级档案',
            'cta.openSource': '打开情报源 →',
            'cta.visitLink': '访问链接 →',
            'cta.openNews': '打开来源 ↗',
            'detail.badge.level': '蔚蓝守护 · 二级档案',
            'deep.badge.level': '蔚蓝守护 · 三级深度档案',
            'detail.section.spectral': '频谱雷达 · 2D',
            'detail.section.layer': '三维分层栈',
            'detail.section.mission': '任务简报',
            'detail.section.telemetry': '实时遥测',
            'detail.section.matrix': '关键指标矩阵',
            'detail.section.news': '资讯与信号',
            'detail.section.resources': '资源与链接',
            'detail.section.actions': '行动指令',
            'detail.section.media': '媒体枢纽',
            'detail.section.signal': '信号脉冲',
            'detail.section.timeline': '作战时间线',
            'detail.media.watchVideo': '观看外部视频',
            'detail.media.viewNews': '查看新闻源',
            'deep.section.holo': '全息快照',
            'deep.section.narrative': '叙事档案',
            'deep.section.timeline': '时间线情报',
            'deep.section.matrix': '系统矩阵',
            'deep.section.stakeholders': '关键协作方',
            'deep.section.reference': '参考栈',
            'deep.section.actions': '行动指令',
            'deep.section.signal': '信号监控',
            'deep.section.media': '媒体策展',
            'detail.spectralNote': '基于 {count} 项关键指标生成的二维频谱雷达 · 色彩映射：{region}',
            'detail.telemetryNote': '同步源：{source} · 更新时间 {time}',
            'types.good.short': '护卫区',
            'types.warn.short': '警戒区',
            'types.demo.short': '示范区',
            'types.good.hero': '生态护盾',
            'types.warn.hero': '危机压制单元',
            'types.demo.hero': '示范实验区',
            'types.good.overlay': '安全数据库',
            'types.warn.overlay': '危机数据库',
            'types.demo.overlay': '示范档案',
            'ticker.placeholder': '暂无资讯'
        },
        en: {
            'title.index': 'Blue Aegis - Immersive Ocean Conservation Dashboard',
            'title.detail': 'Blue Aegis · Level-II Archive',
            'title.deep': 'Blue Aegis · Level-III Dossier',
            'global.langToggle': 'EN / 中文',
            'buttons.langToggleAria': 'Switch language',
            'errors.coreMissing': 'System Error: Core modules not loaded.',
            'status.online': '● Neural Link Online',
            'index.heading': 'BLUE AEGIS · Ocean Sentinel',
            'nav.mission': 'Deep-sea eco intelligence & weather command',
            'nav.console': 'Control Console',
            'nav.archive': 'Data Archives',
            'hud.left.section1.title': 'Real-time Threat',
            'hud.left.loss': 'Economic Loss (USD)',
            'hud.left.families': 'Impacted Families',
            'hud.left.fatality': 'Fatality Index',
            'hud.left.section2.title': 'Global Eco-Index',
            'hud.left.microplastics': 'Microplastics',
            'hud.left.co2': 'CO₂ Absorption',
            'hud.left.acid': 'Acidification',
            'hud.left.section3.title': 'Intercepted Comms',
            'hud.right.section1.title': 'Meteorological Grid',
            'hud.right.tide': 'Tide Level',
            'hud.right.wave': 'Wave Height',
            'hud.right.wind': 'Wind Speed',
            'hud.right.dir': 'Current Dir',
            'hud.right.section2.title': 'Network Traffic Nodes',
            'hud.right.queries': 'Queries/s',
            'hud.right.active': 'Active Ops',
            'hud.right.audience': 'Global Audience',
            'hud.right.section3.title': 'Telemetry Waveform',
            'hud.right.orbital': 'Orbital Velocity',
            'hud.right.sonar': 'Sonar Range',
            'hud.right.slogan': '"SYSTEM: GLOBAL OCEAN MONITORING ACTIVE"',
            'tip.instructions': '[ Drag: Rotate • Scroll: Zoom • Click: Inspect ]',
            'buttons.viewDetail': 'Enter Advanced Archive',
            'buttons.prevMarker': '← Previous Node',
            'buttons.nextMarker': 'Next Node →',
            'detailOverlay.statsTitle': 'Satellite Telemetry Metrics',
            'detailOverlay.close': 'Back to Global Monitor',
            'footer.text': 'Global Marine Protection Initiative • Data Protocol v4.0.2',
            'window.subTemplate': '[ {type} ] {title}',
            'detailOverlay.coordsTemplate': 'LAT: {lat} | LON: {lon}',
            'detail.hero.coordsTemplate': 'LAT {lat} · LON {lon}',
            'detail.hero.subtitleTemplate': '{label} · Level-II',
            'deep.taglineTemplate': '{label} · Level-III',
            'buttons.backToGlobal': '← Back to Global Command',
            'buttons.toLevel3': 'Enter Level-III Dossier',
            'buttons.backToLevel2': '← Back to Level-II',
            'cta.openSource': 'Open Source →',
            'cta.visitLink': 'Visit Link →',
            'cta.openNews': 'Open Source ↗',
            'detail.badge.level': 'Blue Aegis · Level-II Archive',
            'deep.badge.level': 'Blue Aegis · Level-III Dossier',
            'detail.section.spectral': 'Spectral Radar · 2D',
            'detail.section.layer': '3D Layer Stack',
            'detail.section.mission': 'Mission Briefing',
            'detail.section.telemetry': 'Live Telemetry',
            'detail.section.matrix': 'Vital Metrics Matrix',
            'detail.section.news': 'News & Signals',
            'detail.section.resources': 'Resources & Links',
            'detail.section.actions': 'Operational Actions',
            'detail.section.media': 'Media Hub',
            'detail.section.signal': 'Signal Pulse',
            'detail.section.timeline': 'Operational Timeline',
            'detail.media.watchVideo': 'Watch External Video',
            'detail.media.viewNews': 'View News Feed',
            'deep.section.holo': 'Holo Snapshot',
            'deep.section.narrative': 'Narrative',
            'deep.section.timeline': 'Timeline Intelligence',
            'deep.section.matrix': 'Systems Matrix',
            'deep.section.stakeholders': 'Key Stakeholders',
            'deep.section.reference': 'Reference Stack',
            'deep.section.actions': 'Operational Actions',
            'deep.section.signal': 'Signal Monitor',
            'deep.section.media': 'Media Curation',
            'detail.spectralNote': '2D spectral radar built from {count} key metrics · Palette: {region}',
            'detail.telemetryNote': 'Source: {source} · Updated {time}',
            'types.good.short': 'Protected Zone',
            'types.warn.short': 'Warning Zone',
            'types.demo.short': 'Demo Zone',
            'types.good.hero': 'Secure Bio-Dome',
            'types.warn.hero': 'Critical Warning',
            'types.demo.hero': 'Demonstration Zone',
            'types.good.overlay': 'Secure Databank',
            'types.warn.overlay': 'Critical Databank',
            'types.demo.overlay': 'Demo Archive',
            'ticker.placeholder': 'No transmissions yet'
        }
    };

    const typeLabelKeys = {
        short: { good: 'types.good.short', warn: 'types.warn.short', demo: 'types.demo.short' },
        hero: { good: 'types.good.hero', warn: 'types.warn.hero', demo: 'types.demo.hero' },
        overlay: { good: 'types.good.overlay', warn: 'types.warn.overlay', demo: 'types.demo.overlay' }
    };

    const typeLabelFallbacks = {
        short: { good: '护卫区', warn: '警戒区', demo: '示范区' },
        hero: { good: '生态护盾', warn: '危机压制单元', demo: '示范实验区' },
        overlay: { good: '安全数据库', warn: '危机数据库', demo: '示范档案' }
    };

    const subscribers = [];
    const storageKey = 'blue-aegis-lang';
    const fallbackLang = 'zh';

    function readStoredLang() {
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored && dictionaries[stored]) return stored;
        } catch (err) {
            // ignore
        }
        return fallbackLang;
    }

    let currentLang = readStoredLang();

    function format(template, replacements) {
        if (!template || typeof template !== 'string') return template;
        if (!replacements) return template;
        return template.replace(/\{(\w+)\}/g, (_, key) => {
            return replacements[key] !== undefined ? replacements[key] : `{${key}}`;
        });
    }

    function translate(key, replacements) {
        const dict = dictionaries[currentLang] || {};
        let value = dict[key];
        if (value === undefined) {
            const fallback = dictionaries[fallbackLang] || {};
            value = fallback[key];
        }
        if (Array.isArray(value)) {
            return value.map(item => (typeof item === 'string' ? format(item, replacements) : item));
        }
        return format(value || '', replacements);
    }

    function resolveTypeLabel(type = 'good', variant = 'short') {
        const key = typeLabelKeys[variant]?.[type] || typeLabelKeys.short.good;
        const fallback = typeLabelFallbacks[variant]?.[type] || typeLabelFallbacks.short.good;
        if (!key) return fallback;
        const value = translate(key);
        return value || fallback;
    }

    function applyDom(root = document) {
        if (!root.querySelectorAll) return;
        const targets = root.querySelectorAll('[data-i18n-key]');
        targets.forEach(el => {
            const key = el.getAttribute('data-i18n-key');
            if (!key) return;
            const target = el.getAttribute('data-i18n-target') || 'text';
            let params;
            const paramsAttr = el.getAttribute('data-i18n-params');
            if (paramsAttr) {
                try {
                    params = JSON.parse(paramsAttr);
                } catch (err) {
                    params = undefined;
                }
            }
            const value = translate(key, params);
            if (value === undefined || value === null) return;
            if (target === 'html') {
                el.innerHTML = value;
            } else if (target.startsWith('attr:')) {
                const attrName = target.split(':')[1];
                if (attrName) el.setAttribute(attrName, value);
            } else {
                el.textContent = value;
            }
        });
    }

    function setLang(lang) {
        if (!dictionaries[lang]) lang = fallbackLang;
        if (lang === currentLang) return;
        currentLang = lang;
        try {
            localStorage.setItem(storageKey, currentLang);
        } catch (err) {
            // ignore storage failures
        }
        document.documentElement.setAttribute('lang', currentLang === 'zh' ? 'zh-CN' : 'en');
        document.documentElement.setAttribute('data-lang', currentLang);
        applyDom();
        subscribers.forEach(fn => {
            try {
                fn(currentLang);
            } catch (err) {
                // ignore subscriber errors
            }
        });
    }

    function toggleLang() {
        setLang(currentLang === 'zh' ? 'en' : 'zh');
    }

    function subscribe(fn) {
        if (typeof fn === 'function') {
            subscribers.push(fn);
        }
    }

    document.documentElement.setAttribute('lang', currentLang === 'zh' ? 'zh-CN' : 'en');
    document.documentElement.setAttribute('data-lang', currentLang);

    document.addEventListener('DOMContentLoaded', () => {
        applyDom();
        document.querySelectorAll('.lang-toggle').forEach(btn => {
            btn.setAttribute('aria-label', translate('buttons.langToggleAria'));
            btn.addEventListener('click', () => toggleLang());
        });
    });

    window.BlueI18n = {
        t: translate,
        applyDom,
        setLang,
        toggle: toggleLang,
        getLang: () => currentLang,
        subscribe,
        resolveTypeLabel
    };
})();

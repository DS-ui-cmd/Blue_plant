(() => {
    /* ===== 静态数据 ===== */
    const summaryStats = [
        { label: '沿海监测站', value: '612 站' },
        { label: '预报中心', value: '11 座' },
        { label: '蓝碳工程', value: '48 个' },
        { label: '灾害演练', value: '26 次/年' }
    ];

    const sectionPresets = {
        coastal: {
            slug: 'yellow-sea-ecoshield',
            region: '中国北方海域 · 黄海',
            name: '黄海绿潮防线',
            summary: '覆盖山东半岛至长江口的 3D 荧光阵列，提前 72 小时锁定绿潮飘移路径，为青岛、连云港、上海等 6 座沿海城市提供联合调度能力。',
            level: '黄色',
            code: 'YH-07',
            stats: [
                { label: '漂移速度', value: '0.6 m/s' },
                { label: '清理船队', value: '180 艘' },
                { label: '叶绿素峰值', value: '3.4 mg/m³' }
            ],
            /* 雷达图各轴数值 (0–1)，对应：近岸/防灾/蓝碳/资源/航运 */
            radar: [0.92, 0.45, 0.58, 0.30, 0.55]
        },
        disaster: {
            slug: 'bohai-energy-guardian',
            region: '环渤海 · 渤海湾',
            name: '渤海能源守护网',
            summary: '全天候微波雷达圈 + SAR 星座联合识别平台溢油，指导天津、秦皇岛、葫芦岛等关键油气枢纽执行 8 小时内处置方案。',
            level: '橙色',
            code: 'BH-02',
            stats: [
                { label: '可疑油膜', value: '↓35%' },
                { label: '围控执行', value: '27 次' },
                { label: '冰压预警', value: '6 次' }
            ],
            radar: [0.50, 0.95, 0.40, 0.60, 0.72]
        },
        bluecarbon: {
            slug: 'yangtze-estuary-carbon-corridor',
            region: '长江口 · 江苏/上海',
            name: '长江口碳通量走廊',
            summary: '600+ 碳通量塔与水文剖面网格联动，量化潮滩、湿地、近岸水体的蓝碳贡献，支撑长三角产业园碳抵消策略。',
            level: '绿色',
            code: 'YZ-11',
            stats: [
                { label: '蓝碳潜力', value: '3.1 Mt/年' },
                { label: '植被覆被', value: '82%' },
                { label: '碳信用', value: '试点中' }
            ],
            radar: [0.55, 0.38, 0.90, 0.65, 0.48]
        },
        resource: {
            slug: 'dianchi-regenerative-grid',
            region: '西南高原 · 滇池',
            name: '滇池再生水网格',
            summary: '再生水廊道 + 湿地微生物反应器闭环净化体系，保障昆明主城区饮用水调度与入湖总磷削减 18%。',
            level: '蓝色',
            code: 'YN-04',
            stats: [
                { label: '再生水回用', value: '5.2 亿 m³' },
                { label: '湿地面积', value: '26 km²' },
                { label: '透明度提升', value: '↑35 cm' }
            ],
            radar: [0.42, 0.50, 0.70, 0.95, 0.40]
        },
        transport: {
            slug: 'pearl-river-saline-guard',
            region: '华南沿海 · 珠江口',
            name: '珠江口咸潮护盾',
            summary: '多闸群、取水口与淡化厂协同调度，抵御枯水季咸潮倒灌，保障粤港澳大湾区 9 座取水口实时水质安全。',
            level: '蓝色',
            code: 'PRD-05',
            stats: [
                { label: '取水保障率', value: '99.3%' },
                { label: '淡化日供', value: '75 万 m³' },
                { label: '闸门协同', value: '12 座' }
            ],
            radar: [0.60, 0.55, 0.45, 0.72, 0.92]
        }
    };

    const forecastEntries = [
        { filters: ['coastal'], title: '连云港—舟山浪高', meta: '06h · 近岸波浪', value: '1.2 m', badge: '平稳' },
        { filters: ['coastal'], title: '青岛表层水温', meta: '24h · SST', value: '19.4 ℃', badge: '+0.6 ℃' },
        { filters: ['coastal'], title: '黄海潮位', meta: '12h · 天文潮', value: '+148 cm', badge: '警戒线下' },
        { filters: ['disaster'], title: '渤海油膜识别', meta: '实时 · SAR', value: '0.3 km²', badge: '下降趋势' },
        { filters: ['disaster'], title: '莱州湾风速', meta: '03h · 台风外流', value: '21 m/s', badge: '阵风 9 级' },
        { filters: ['bluecarbon'], title: '崇明潮滩碳通量', meta: '每日 · Eddy Cov.', value: '5.8 gC/m²', badge: '高产' },
        { filters: ['resource'], title: '滇池 TN/TP', meta: '24h · 实时水质', value: '1.52/0.05', badge: '达标' },
        { filters: ['transport'], title: '西江盐度', meta: '06h · 取水口', value: '112 mg/L', badge: '安全' },
        { filters: ['transport'], title: '深圳港航道浪高', meta: '03h · 航运保障', value: '0.8 m', badge: '开放' }
    ];

    const newsEntries = [
        {
            filters: ['coastal', 'resource'],
            type: '海洋预报',
            title: '国家海洋预报台发布黄海南部绿潮会商结果',
            meta: '2026-04-14 · 08:30 CST',
            link: 'detail.html?slug=yellow-sea-ecoshield'
        },
        {
            filters: ['disaster', 'transport'],
            type: '应急预警',
            title: '渤海湾夜间寒潮触发近岸冰情黄色预警',
            meta: '2026-04-14 · 05:00 CST',
            link: 'detail.html?slug=bohai-energy-guardian'
        },
        {
            filters: ['bluecarbon'],
            type: '蓝碳工程',
            title: '长江口碳通量走廊完成第 640 个节点校准',
            meta: '2026-04-13 · 20:15 CST',
            link: 'detail.html?slug=yangtze-estuary-carbon-corridor'
        },
        {
            filters: ['resource', 'transport'],
            type: '航运气象',
            title: '珠江口枯水期联合调度结果发布（第 11 期）',
            meta: '2026-04-12 · 19:40 CST',
            link: 'detail.html?slug=pearl-river-saline-guard'
        }
    ];

    const deepdiveEntries = [
        {
            filters: ['bluecarbon', 'resource'],
            label: '蓝碳',
            title: '长江口碳通量走廊',
            desc: '潮滩—湿地—海域的碳耦合实验矩阵，实时回传 3.1Mt CO₂e/年的动态曲线。',
            chip: 'Suzhou · Shanghai',
            link: 'deep-archive.html?slug=yangtze-estuary-carbon-corridor'
        },
        {
            filters: ['coastal', 'disaster'],
            label: '防灾',
            title: '黄海绿潮防线',
            desc: '3D 荧光阵列 + AI 轨迹推演，72 小时前锁定漂移带并联动 180 艘清理船队。',
            chip: 'Yellow Sea',
            link: 'detail.html?slug=yellow-sea-ecoshield'
        },
        {
            filters: ['transport'],
            label: '航运',
            title: '珠江口咸潮护盾',
            desc: '多闸群、取水口、淡化厂数据打通，分钟级推送取水调度和航道水质预警。',
            chip: 'Pearl River Delta',
            link: 'detail.html?slug=pearl-river-saline-guard'
        },
        {
            filters: ['resource'],
            label: '水网',
            title: '滇池再生水网格',
            desc: '再生水廊道 + 湿地微生物反应器闭环净化，入湖总磷同比下降 18%。',
            chip: 'Kunming · Dianchi',
            link: 'detail.html?slug=dianchi-regenerative-grid'
        }
    ];

    /* ===== 雷达图 canvas ===== */
    function createPortalRadar(canvas, values, accent) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const labels = ['近岸', '防灾', '蓝碳', '资源', '航运'];
        const n = labels.length;

        let animFrame = null;
        let pulse = 0;

        const draw = () => {
            const dpr = window.devicePixelRatio || 1;
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if (w <= 0 || h <= 0) return;
            canvas.width  = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);

            const cx = w / 2;
            const cy = h / 2;
            const maxR = Math.min(w, h) / 2 - 28;
            if (maxR <= 0) return;

            /* Grid rings */
            const rings = 4;
            for (let i = 1; i <= rings; i++) {
                const r = maxR * (i / rings);
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = i === rings
                    ? 'rgba(79,195,247,0.25)'
                    : 'rgba(79,195,247,0.08)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            /* Axis lines + labels */
            const step = (Math.PI * 2) / n;
            for (let i = 0; i < n; i++) {
                const angle = step * i - Math.PI / 2;
                const ex = cx + Math.cos(angle) * maxR;
                const ey = cy + Math.sin(angle) * maxR;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(ex, ey);
                ctx.strokeStyle = 'rgba(79,195,247,0.15)';
                ctx.lineWidth = 1;
                ctx.stroke();

                /* Tick dots on each axis at each ring */
                for (let r = 1; r <= rings; r++) {
                    const tr = maxR * (r / rings);
                    const tx = cx + Math.cos(angle) * tr;
                    const ty = cy + Math.sin(angle) * tr;
                    ctx.beginPath();
                    ctx.arc(tx, ty, 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(79,195,247,0.3)';
                    ctx.fill();
                }

                /* Label */
                const lx = cx + Math.cos(angle) * (maxR + 14);
                const ly = cy + Math.sin(angle) * (maxR + 14);
                ctx.fillStyle = 'rgba(255,255,255,0.55)';
                ctx.font = `${9 * dpr / dpr}px monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(labels[i], lx, ly);
            }

            /* Data polygon */
            ctx.beginPath();
            values.forEach((val, idx) => {
                const angle = step * idx - Math.PI / 2;
                const r = Math.max(0, val) * maxR;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;
                if (idx === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.closePath();

            const grad = ctx.createLinearGradient(cx - maxR, cy - maxR, cx + maxR, cy + maxR);
            grad.addColorStop(0, accent || '#4FC3F7');
            grad.addColorStop(1, '#00DFC0');

            ctx.globalAlpha = 0.22 + Math.sin(pulse) * 0.05;
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.globalAlpha = 1;

            ctx.strokeStyle = accent || '#4FC3F7';
            ctx.lineWidth = 1.8;
            ctx.shadowColor = accent || '#4FC3F7';
            ctx.shadowBlur = 6;
            ctx.stroke();
            ctx.shadowBlur = 0;

            /* Vertex dots */
            values.forEach((val, idx) => {
                const angle = step * idx - Math.PI / 2;
                const r = Math.max(0, val) * maxR;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;
                ctx.beginPath();
                ctx.arc(x, y, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.shadowColor = accent || '#4FC3F7';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            /* Center dot */
            ctx.beginPath();
            ctx.arc(cx, cy, 3, 0, Math.PI * 2);
            ctx.fillStyle = accent || '#4FC3F7';
            ctx.shadowColor = accent || '#4FC3F7';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        };

        const animate = () => {
            pulse += 0.04;
            draw();
            animFrame = requestAnimationFrame(animate);
        };

        if (animFrame) cancelAnimationFrame(animFrame);

        /* Wait for layout */
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                draw();
                animate();
            });
        });

        /* Expose update function */
        canvas._updateRadar = (newValues, newAccent) => {
            values = newValues;
            accent = newAccent;
        };

        window.addEventListener('resize', draw);
    }

    /* ===== 遥测波形 canvas ===== */
    function createPortalTelemetry(canvas) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let t = 0;

        const resize = () => {
            canvas.width  = canvas.clientWidth  * dpr;
            canvas.height = canvas.clientHeight * dpr;
        };

        window.addEventListener('resize', resize);

        const draw = () => {
            requestAnimationFrame(draw);
            const w = canvas.width;
            const h = canvas.height;
            if (w <= 0 || h <= 0) return;

            ctx.clearRect(0, 0, w, h);

            /* Wave 1 – cyan */
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(79,195,247,0.85)';
            ctx.lineWidth = 1.5 * dpr;
            for (let x = 0; x < w; x += 2) {
                const y = h / 2
                    + Math.sin((x / w) * Math.PI * 6 + t * 0.08) * h * 0.28
                    + Math.sin((x / w) * Math.PI * 2 + t * 0.04) * h * 0.10;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            /* Wave 2 – green (overlay) */
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0,223,192,0.45)';
            ctx.lineWidth = 1 * dpr;
            for (let x = 0; x < w; x += 2) {
                const y = h / 2
                    + Math.sin((x / w) * Math.PI * 10 + t * 0.12) * h * 0.18
                    + Math.cos((x / w) * Math.PI * 3 + t * 0.06) * h * 0.08;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            /* Horizon line */
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(79,195,247,0.12)';
            ctx.lineWidth = 1 * dpr;
            ctx.moveTo(0, h / 2);
            ctx.lineTo(w, h / 2);
            ctx.stroke();

            t++;
        };

        requestAnimationFrame(() => {
            resize();
            draw();
        });
    }

    /* ===== 系统时钟 ===== */
    function startSystemClock() {
        const el = document.getElementById('portalSystemTime');
        if (!el) return;
        const tick = () => {
            const now = new Date();
            const hh = String(now.getHours()).padStart(2, '0');
            const mm = String(now.getMinutes()).padStart(2, '0');
            const ss = String(now.getSeconds()).padStart(2, '0');
            el.textContent = `${hh}:${mm}:${ss}`;
        };
        tick();
        setInterval(tick, 1000);
    }

    /* ===== Portal Controller ===== */
    class PortalLayerController {
        constructor() {
            this.body = document.body;
            this.layer = document.getElementById('portalLayer');
            this.toggleBtn = document.getElementById('portalToggleBtn');
            this.navItems = Array.from(document.querySelectorAll('.portal-nav__item'));
            this.summaryContainer = document.getElementById('portalHeadlineStats');
            this.heroRefs = {
                region: document.getElementById('portalHeroRegion'),
                name:   document.getElementById('portalHeroName'),
                summary:document.getElementById('portalHeroSummary'),
                stats:  document.getElementById('portalHeroStats'),
                image:  document.getElementById('portalHeroImage'),
                level:  document.getElementById('portalHeroLevel'),
                code:   document.getElementById('portalHeroCode'),
                detail: document.getElementById('portalHeroDetail'),
                focus:  document.getElementById('portalHeroFocus')
            };
            this.forecastContainer  = document.getElementById('forecastList');
            this.newsContainer      = document.getElementById('portalNewsList');
            this.deepdiveContainer  = document.getElementById('portalDeepdiveList');
            this.syncBtn            = document.getElementById('portalSyncForecast');
            this.radarCanvas        = document.getElementById('portalRadarCanvas');
            this.telemetryCanvas    = document.getElementById('portalTelemetryCanvas');
            this.currentFilter      = 'coastal';
            this.markers            = window.markersData || [];
            this.radarInitialized   = false;
            this.init();
        }

        init() {
            if (!this.layer || !this.toggleBtn) return;
            this.renderSummaryStats();
            this.bindEvents();
            this.applyFilter(this.currentFilter);
            startSystemClock();
            /* Init telemetry immediately; radar waits for first open */
            createPortalTelemetry(this.telemetryCanvas);
        }

        bindEvents() {
            /* Main toggle button in nav */
            this.toggleBtn.addEventListener('click', () => this.toggle());

            /* Close button inside portal */
            const innerClose = this.layer.querySelector('.portal-v2__close-btn');
            innerClose?.addEventListener('click', () => this.toggle(false));

            /* Backdrop click */
            const backdrop = this.layer.querySelector('.portal-backdrop');
            backdrop?.addEventListener('click', () => this.toggle(false));

            /* Escape key */
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.body.classList.contains('portal-active')) {
                    this.toggle(false);
                }
            });

            /* Tab nav */
            this.navItems.forEach((btn) => {
                btn.addEventListener('click', () => this.applyFilter(btn.dataset.filter));
            });

            /* Hero focus */
            this.heroRefs.focus?.addEventListener('click', () => this.focusHeroMarker());
            this.syncBtn?.addEventListener('click', () => this.focusHeroMarker());
        }

        toggle(forceState) {
            const shouldOpen = typeof forceState === 'boolean'
                ? forceState
                : !this.body.classList.contains('portal-active');

            this.body.classList.toggle('portal-active', shouldOpen);
            this.layer.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
            this.toggleBtn.setAttribute('aria-pressed', shouldOpen ? 'true' : 'false');

            if (shouldOpen && !this.radarInitialized) {
                /* Delay radar init until portal is visible so clientWidth/Height are correct */
                setTimeout(() => {
                    const preset = sectionPresets[this.currentFilter];
                    createPortalRadar(
                        this.radarCanvas,
                        preset ? preset.radar : [0.5, 0.5, 0.5, 0.5, 0.5],
                        '#4FC3F7'
                    );
                    this.radarInitialized = true;
                }, 120);
            }

            if (!shouldOpen) {
                this.layer.scrollTop = 0;
            }
        }

        applyFilter(filter) {
            if (!sectionPresets[filter]) return;
            this.currentFilter = filter;

            this.navItems.forEach((btn) => {
                btn.classList.toggle('portal-nav__item--active', btn.dataset.filter === filter);
                btn.setAttribute('aria-pressed', btn.dataset.filter === filter ? 'true' : 'false');
            });

            this.updateHero();
            this.renderForecast();
            this.renderNews();
            this.renderDeepdive();

            /* Update radar values on tab change */
            const preset = sectionPresets[filter];
            if (preset && this.radarCanvas && this.radarCanvas._updateRadar) {
                this.radarCanvas._updateRadar(preset.radar, '#4FC3F7');
            }

            /* Update radar note */
            const noteEl = document.getElementById('portalRadarNote');
            if (noteEl && preset) {
                noteEl.textContent = `当前焦点：${preset.name} · 5 海域实时频谱映射`;
            }
        }

        renderSummaryStats() {
            if (!this.summaryContainer) return;
            this.summaryContainer.innerHTML = summaryStats.map((item) => `
                <div class="portal-stat-card">
                    <span>${item.label}</span>
                    <strong>${item.value}</strong>
                </div>
            `).join('');
        }

        updateHero() {
            const preset = sectionPresets[this.currentFilter];
            if (!preset) return;
            const marker = this.findMarker(preset.slug);
            const heroName   = preset.name   || marker?.name   || preset.slug;
            const summary    = preset.summary || marker?.content || '';
            const image      = preset.image  || marker?.image  ||
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80';
            const statsSource = Array.isArray(preset.stats)
                ? preset.stats
                : this.convertStats(marker?.stats);

            if (this.heroRefs.region)  this.heroRefs.region.textContent  = preset.region;
            if (this.heroRefs.name)    this.heroRefs.name.textContent    = heroName;
            if (this.heroRefs.summary) this.heroRefs.summary.textContent = summary.replace(/<[^>]+>/g, '');
            if (this.heroRefs.image)   this.heroRefs.image.src           = image;
            if (this.heroRefs.level)   this.heroRefs.level.textContent   = preset.level  || '—';
            if (this.heroRefs.code)    this.heroRefs.code.textContent    = preset.code   || '—';
            if (this.heroRefs.detail)  this.heroRefs.detail.href         = `detail.html?slug=${preset.slug}`;
            if (this.heroRefs.focus)   this.heroRefs.focus.dataset.slug  = preset.slug;

            if (this.heroRefs.stats) {
                this.heroRefs.stats.innerHTML = statsSource.map((stat) => `
                    <div class="stat">
                        <span>${stat.label}</span>
                        <strong>${stat.value}</strong>
                    </div>
                `).join('');
            }
        }

        renderForecast() {
            if (!this.forecastContainer) return;
            const rows = forecastEntries.filter((item) => item.filters.includes(this.currentFilter));
            this.forecastContainer.innerHTML = rows.map((item) => `
                <article class="forecast-card">
                    <div class="forecast-card__title">${item.title}</div>
                    <div class="forecast-card__meta">${item.meta}</div>
                    <div class="forecast-card__value">${item.value}</div>
                    <div class="forecast-card__meta">${item.badge}</div>
                </article>
            `).join('');
        }

        renderNews() {
            if (!this.newsContainer) return;
            const list = newsEntries.filter((item) => item.filters.includes(this.currentFilter));
            this.newsContainer.innerHTML = list.map((item) => `
                <article class="news-card">
                    <div class="news-card__type">${item.type}</div>
                    <h5 class="news-card__title">${item.title}</h5>
                    <div class="news-card__meta">${item.meta}</div>
                    <div class="news-card__actions">
                        <a href="${item.link}" target="_blank" rel="noopener">详情 →</a>
                        <button data-link="${item.link}" class="portal-mini-link portal-mini-link--inline" type="button">聚焦</button>
                    </div>
                </article>
            `).join('');

            this.newsContainer.querySelectorAll('button[data-link]').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const url  = new URL(btn.dataset.link, window.location.href);
                    const slug = url.searchParams.get('slug');
                    if (slug && this.focusMarker(slug)) this.toggle(false);
                });
            });
        }

        renderDeepdive() {
            if (!this.deepdiveContainer) return;
            const cards = deepdiveEntries.filter((item) => item.filters.includes(this.currentFilter));
            this.deepdiveContainer.innerHTML = cards.map((item) => `
                <article class="deepdive-card">
                    <span class="deepdive-card__label">${item.label}</span>
                    <h5 class="deepdive-card__title">${item.title}</h5>
                    <p class="deepdive-card__desc">${item.desc}</p>
                    <span class="deepdive-card__chip">${item.chip}</span>
                    <a class="portal-mini-link" href="${item.link}" target="_blank" rel="noopener">进入档案 →</a>
                </article>
            `).join('');
        }

        focusHeroMarker() {
            const slug = this.heroRefs.focus?.dataset.slug;
            if (!slug) return;
            if (this.focusMarker(slug)) {
                setTimeout(() => this.toggle(false), 600);
            }
        }

        focusMarker(slug) {
            if (!slug || !window.BlueAegis || !window.BlueAegis.interaction) return false;
            const focused = window.BlueAegis.interaction.focusMarkerBySlug(slug);
            if (focused) document.body.classList.remove('zoomed');
            return focused;
        }

        findMarker(slug) {
            return this.markers.find((item) => item.slug === slug);
        }

        convertStats(statsObj) {
            if (!statsObj) return [];
            return Object.entries(statsObj).slice(0, 3).map(([label, value]) => ({ label, value }));
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.BlueAegis = window.BlueAegis || {};
        window.BlueAegis.portal = new PortalLayerController();
    });
})();

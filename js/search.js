(function () {
    const TYPE_LABELS = {
        good: { text: '护卫区', color: '#4FC3F7' },
        warn: { text: '警戒区', color: '#FF9800' },
        demo: { text: '示范区', color: '#00DFC0' }
    };

    class MarkerSearchPanel {
        constructor() {
            this.apiBaseUrl = (window.__BLUE_AEGIS_API__ || 'http://localhost:8080').replace(/\/$/, '');
            this.elements = {
                trigger: document.getElementById('searchToggleBtn'),
                panel: document.getElementById('searchPanel'),
                close: document.getElementById('searchCloseBtn'),
                input: document.getElementById('searchInput'),
                results: document.getElementById('searchResults'),
                status: document.getElementById('searchStatus'),
                backdrop: document.getElementById('searchBackdrop')
            };
            this.limit = 8;
            this.debounceTimer = null;
            this.currentAbortController = null;

            if (!this.elements.panel) return;

            this.bindEvents();
        }

        bindEvents() {
            this.elements.trigger?.addEventListener('click', () => this.open());
            this.elements.close?.addEventListener('click', () => this.close());
            this.elements.backdrop?.addEventListener('click', () => this.close());

            document.addEventListener('keydown', (evt) => {
                if ((evt.ctrlKey || evt.metaKey) && evt.key.toLowerCase() === 'k') {
                    evt.preventDefault();
                    this.open();
                }
                if (evt.key === 'Escape' && this.isOpen()) {
                    this.close();
                }
            });

            this.elements.input?.addEventListener('input', (evt) => {
                const value = evt.target.value;
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => this.runSearch(value), 260);
            });

            this.elements.results?.addEventListener('click', (evt) => {
                const focusBtn = evt.target.closest('[data-focus-slug]');
                if (focusBtn) {
                    const slug = focusBtn.getAttribute('data-focus-slug');
                    this.focusOnGlobe(slug);
                    this.close();
                    return;
                }
            });
        }

        isOpen() {
            return this.elements.panel?.classList.contains('is-open');
        }

        open() {
            if (!this.elements.panel) return;
            this.elements.panel.classList.remove('hidden');
            requestAnimationFrame(() => this.elements.panel.classList.add('is-open'));
            this.elements.panel.setAttribute('aria-hidden', 'false');
            setTimeout(() => this.elements.input?.focus(), 80);
            const initialTerm = this.elements.input?.value || '';
            this.runSearch(initialTerm);
        }

        close() {
            if (!this.elements.panel) return;
            this.elements.panel.classList.remove('is-open');
            this.elements.panel.setAttribute('aria-hidden', 'true');
            setTimeout(() => this.elements.panel.classList.add('hidden'), 200);
        }

        setStatus(message) {
            if (this.elements.status) {
                this.elements.status.textContent = message;
            }
        }

        async runSearch(term = '') {
            if (!this.elements.results) return;
            if (!this.apiBaseUrl) {
                this.setStatus('未配置 API 基地址');
                return;
            }

            if (this.currentAbortController) {
                this.currentAbortController.abort();
            }
            this.currentAbortController = new AbortController();

            const url = new URL('/api/markers/search', this.apiBaseUrl);
            if (term && term.trim()) {
                url.searchParams.set('q', term.trim());
            }
            url.searchParams.set('limit', this.limit);

            this.setStatus(term ? `正在检索 “${term}”...` : '载入推荐监测点...');

            try {
                const response = await fetch(url.toString(), {
                    signal: this.currentAbortController.signal
                });
                if (!response.ok) throw new Error(`请求失败: ${response.status}`);
                const payload = await response.json();
                const results = Array.isArray(payload.data) ? payload.data : [];
                this.renderResults(results);
                this.setStatus(
                    results.length
                        ? `检索到 ${results.length} 条监测点`
                        : '没有匹配的监测点'
                );
                this.currentAbortController = null;
            } catch (error) {
                if (error.name === 'AbortError') return;
                console.warn('[SearchPanel] 无法获取数据：', error);
                this.renderResults([]);
                this.setStatus('无法连接后端，请确认 API 已启动。');
                this.currentAbortController = null;
            }
        }

        renderResults(results) {
            if (!this.elements.results) return;
            if (!results.length) {
                this.elements.results.innerHTML = `
                    <div class="search-result">
                        <p class="search-result__desc">暂无数据显示。请确认 Postgres 种子数据已导入并且服务器正在运行。</p>
                    </div>
                `;
                return;
            }

            this.elements.results.innerHTML = results
                .map((marker) => this.buildResultItem(marker))
                .join('');
        }

        buildResultItem(marker) {
            const typeInfo = TYPE_LABELS[marker.type] || { text: '海域', color: '#4FC3F7' };
            const cleanedContent = this.stripHtml(marker.content || marker.detailedContent || '');
            const summary = cleanedContent.length > 180 ? `${cleanedContent.slice(0, 180)}...` : cleanedContent;
            const coords = `LAT ${marker.lat?.toFixed ? marker.lat.toFixed(2) : marker.lat}, LON ${marker.lng?.toFixed ? marker.lng.toFixed(2) : marker.lng}`;
            return `
                <div class="search-result search-result--${marker.type || 'good'}">
                    <div class="search-result__meta">
                        <span class="search-result__type" style="color:${typeInfo.color}">${typeInfo.text}</span>
                        <span>${coords}</span>
                    </div>
                    <div class="search-result__name">${marker.name || marker.title}</div>
                    <p class="search-result__desc">${summary || '暂无简介'}</p>
                    <div class="search-result__actions">
                        <button type="button" data-focus-slug="${marker.slug}">聚焦地球</button>
                        <a href="./detail.html?slug=${marker.slug}" target="_blank" rel="noopener">打开二级档案</a>
                    </div>
                </div>
            `;
        }

        stripHtml(html = '') {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            return temp.textContent || temp.innerText || '';
        }

        focusOnGlobe(slug) {
            if (!slug) return;
            if (window.BlueAegis && window.BlueAegis.interaction) {
                const focused = window.BlueAegis.interaction.focusMarkerBySlug(slug);
                if (!focused) {
                    alert('该监测点尚未载入地图，可尝试刷新页面。');
                }
            } else {
                alert('地球交互尚未就绪，请稍后重试。');
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        new MarkerSearchPanel();
    });
})();

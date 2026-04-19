// 交互逻辑与UI联动模块
const TYPE_LABEL_FALLBACK = {
    short: { good: '护卫区', warn: '警戒区', demo: '示范区' },
    overlay: { good: '安全数据库', warn: '危机数据库', demo: '示范档案' }
};

function getTypeLabelByVariant(type = 'good', variant = 'short') {
    if (window.BlueI18n && typeof window.BlueI18n.resolveTypeLabel === 'function') {
        return window.BlueI18n.resolveTypeLabel(type, variant);
    }
    return (TYPE_LABEL_FALLBACK[variant] && TYPE_LABEL_FALLBACK[variant][type]) || TYPE_LABEL_FALLBACK.short.good;
}

class EarthInteraction {
    constructor(earthInstance, markersData) {
        this.earth = earthInstance;
        this.data = markersData;
        this.rotationTarget = this.earth.rotationTarget || this.earth.earthGroup || this.earth.earthMesh;
        
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };

        this.autoRotateSpeed = 0.001;
        this.isAutoRotating = true;
        this.idleTimer = null;

        this.currentMarkerIndex = -1;
        this.currentMarkerData = null; // 保存当前选中的标记数据
        this.isHoveringChina = false;  // 中国区域悬停标志
        
        this.initEvents();
        this.initUIEvents();
        this.startIdleTimer();
        
        // 把动画注入到渲染循环中
        const originalAnimate = this.earth.animate.bind(this.earth);
        this.earth.animate = () => {
            if (this.isAutoRotating && !this.isDragging && this.rotationTarget) {
                this.rotationTarget.rotation.y += this.autoRotateSpeed;
                const rotEl = document.getElementById('sys-rot');
                if (rotEl) rotEl.innerText = this.autoRotateSpeed.toFixed(4) + ' rad/s';
            } else {
                const rotEl = document.getElementById('sys-rot');
                if (rotEl) rotEl.innerText = '0.0000 rad/s';
            }
            originalAnimate();
        };

        if (window.BlueI18n && typeof window.BlueI18n.subscribe === 'function') {
            window.BlueI18n.subscribe(() => this.handleLanguageRefresh());
        }
    }

    initEvents() {
        const canvas = this.earth.canvas;

        if (!canvas) {
            console.error('Canvas not found!');
            return;
        }

        canvas.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.isAutoRotating = false;
            this.clearIdleTimer();
            this.previousMousePosition = { x: e.offsetX, y: e.offsetY };
            document.body.style.cursor = 'grabbing';
        });

        canvas.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const deltaMove = {
                    x: e.offsetX - this.previousMousePosition.x,
                    y: e.offsetY - this.previousMousePosition.y
                };

                if (this.rotationTarget) {
                    this.rotationTarget.rotation.y += deltaMove.x * 0.005;
                    this.rotationTarget.rotation.x += deltaMove.y * 0.005;
                    this.rotationTarget.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.rotationTarget.rotation.x));
                }

                this.previousMousePosition = { x: e.offsetX, y: e.offsetY };
            } else {
                // 悬停检测
                this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
                this.raycaster.setFromCamera(this.mouse, this.earth.camera);

                const markerHits = this.raycaster.intersectObjects(this.earth.markers, true);
                if (markerHits.length > 0) {
                    document.body.style.cursor = 'pointer';
                    this._clearChinaHover();
                } else {
                    // 检测是否悬停在中国区域
                    const earthHits = this.earth.earthMesh
                        ? this.raycaster.intersectObject(this.earth.earthMesh, false)
                        : [];
                    if (earthHits.length > 0) {
                        const latLon = this._worldToLatLon(earthHits[0].point);
                        if (latLon && (
                                this._pointInPolygon(latLon.lat, latLon.lon, this.earth.chinaBorderCoords) ||
                                this._pointInPolygon(latLon.lat, latLon.lon, this.earth.chinaIslandCoords || []))) {
                            document.body.style.cursor = 'pointer';
                            if (!this.isHoveringChina) {
                                this.isHoveringChina = true;
                                this.earth.chinaHovered = true;
                            }
                        } else {
                            document.body.style.cursor = 'default';
                            this._clearChinaHover();
                        }
                    } else {
                        document.body.style.cursor = 'default';
                        this._clearChinaHover();
                    }
                }
            }
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
            document.body.style.cursor = 'default';
            this.startIdleTimer();
        });

        canvas.addEventListener('wheel', (e) => {
            this.isAutoRotating = false;
            this.clearIdleTimer();
            
            const zoomSpeed = 0.01;
            this.earth.camera.position.z += e.deltaY * zoomSpeed;
            this.earth.camera.position.z = Math.max(8, Math.min(30, this.earth.camera.position.z));
            
            this.startIdleTimer();
        });

        canvas.addEventListener('click', (e) => {
            if (this.isDragging) return;

            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouse, this.earth.camera);

            // 优先检测监测点标记
            const markerHits = this.raycaster.intersectObjects(this.earth.markers, true);

            if (markerHits.length > 0) {
                let markerObj = markerHits[0].object;
                while (markerObj && !markerObj.userData.fullData && markerObj.parent) {
                    markerObj = markerObj.parent;
                }
                if (markerObj && markerObj.userData.fullData) {
                    this.handleMarkerClick(markerObj.userData.fullData);
                }
                return;
            }

            // 次级检测：点击中国大陆区域
            this.raycaster.setFromCamera(this.mouse, this.earth.camera);

            const earthHits = this.earth.earthMesh
                ? this.raycaster.intersectObject(this.earth.earthMesh, false)
                : [];
            if (earthHits.length > 0) {
                const latLon = this._worldToLatLon(earthHits[0].point);
                if (latLon && (
                        this._pointInPolygon(latLon.lat, latLon.lon, this.earth.chinaBorderCoords) ||
                        this._pointInPolygon(latLon.lat, latLon.lon, this.earth.chinaIslandCoords || []))) {
                    this.openChinaPortal();
                }
            }
        });
    }
    
    startIdleTimer() {
        this.clearIdleTimer();
        this.idleTimer = setTimeout(() => {
            this.isAutoRotating = true;
            
            const tipBox = document.getElementById('tipBox');
            if(tipBox && !tipBox.classList.contains('fade-out')) {
                tipBox.classList.add('fade-out');
            }
        }, 5000);
    }
    
    clearIdleTimer() {
        if (this.idleTimer) {
            clearTimeout(this.idleTimer);
            this.idleTimer = null;
        }
    }

    handleMarkerClick(markerData) {
        // 处理外链标记：直接打开链接
        if (markerData.type === 'external' && markerData.link) {
            window.open(markerData.link, '_blank', 'noopener,noreferrer');
            return;
        }

        this.isAutoRotating = false;
        this.clearIdleTimer();

        document.body.classList.add('zoomed');

        this.currentMarkerIndex = this.data.findIndex(m => m.id === markerData.id);
        this.currentMarkerData = markerData;

        const targetPos = this.earth.latLonToVector3(markerData.lat, markerData.lng, 1);

        const targetRotationX = Math.asin(-targetPos.y);
        const targetRotationY = Math.atan2(targetPos.z, -targetPos.x);
        
        if (this.rotationTarget) {
            gsap.to(this.rotationTarget.rotation, {
                x: targetRotationX,
                y: targetRotationY,
                duration: 1.5,
                ease: "power2.inOut"
            });
        }
        
        gsap.to(this.earth.camera.position, {
            z: 11,
            duration: 1.5,
            ease: "power2.inOut"
        });

        this.showFloatWindow(markerData);
    }

    initUIEvents() {
        document.getElementById('closeBtn').addEventListener('click', () => {
            this.hideFloatWindow();
            this.startIdleTimer();
            document.body.classList.remove('zoomed');

            const chinaCenter = this.earth.latLonToVector3(35, 105, 1);
            const initialRotationX = Math.asin(-chinaCenter.y);
            const initialRotationY = Math.atan2(chinaCenter.z, -chinaCenter.x);

            if (this.rotationTarget) {
                gsap.to(this.rotationTarget.rotation, {
                    x: initialRotationX,
                    y: initialRotationY + Math.PI * 2,
                    duration: 1.5,
                    ease: "power2.inOut"
                });
            }

            gsap.to(this.earth.camera.position, {
                z: 20,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: () => {
                    setTimeout(() => {
                        this.isAutoRotating = true;
                    }, 1000);
                }
            });
        });

        document.getElementById('prevBtn').addEventListener('click', () => {
            if (this.currentMarkerIndex > 0) {
                this.handleMarkerClick(this.data[this.currentMarkerIndex - 1]);
            } else {
                this.handleMarkerClick(this.data[this.data.length - 1]);
            }
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            if (this.currentMarkerIndex < this.data.length - 1) {
                this.handleMarkerClick(this.data[this.currentMarkerIndex + 1]);
            } else {
                this.handleMarkerClick(this.data[0]);
            }
        });
        
        // 浮窗轻微漂浮
        gsap.to("#floatWindow", {
            y: "-=8",
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        // 绑定详情页开启按钮
        document.getElementById('viewDetailsBtn').addEventListener('click', () => {
            if(this.currentMarkerData) {
                const slug = this.currentMarkerData.slug || this.currentMarkerData.id;
                window.location.href = `./detail.html?slug=${slug}`;
            }
        });

        // 绑定详情页关闭按钮
        document.getElementById('closeDetailBtn').addEventListener('click', () => {
            this.hideDetailOverlay();
        });
    }

    updateFloatWindowContent(data) {
        if (!data) return;
        const typeLabel = getTypeLabelByVariant(data.type, 'short');
        const windowSub = document.getElementById('windowSub');
        if (windowSub) {
            windowSub.innerHTML = `<span style="color:${data.color}">[ ${typeLabel} ]</span> ${data.title}`;
        }
        const windowTitle = document.getElementById('windowTitle');
        if (windowTitle) {
            windowTitle.innerText = data.name;
            windowTitle.style.textShadow = `0 0 10px ${data.color}80`;
        }
        const windowImage = document.getElementById('windowImage');
        if (windowImage) windowImage.src = data.image;
        const windowContent = document.getElementById('windowContent');
        if (windowContent) {
            windowContent.innerHTML = `
                <div class="border-l-2 pl-3 leading-relaxed" style="border-color: ${data.color}50;">
                    ${data.content}
                </div>
            `;
        }
    }

    showFloatWindow(data) {
        if (!data) return;
        this.updateFloatWindowContent(data);
        const floatWindow = document.getElementById('floatWindow');
        if (!floatWindow) return;
        floatWindow.classList.remove('hidden');
        gsap.fromTo(floatWindow,
            { opacity: 0, scale: 0.95, y: "-40%" },
            { opacity: 1, scale: 1, y: "-50%", duration: 0.6, ease: "back.out(1.2)" }
        );
    }

    hideFloatWindow() {
        const floatWindow = document.getElementById('floatWindow');
        gsap.to(floatWindow, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            onComplete: () => {
                floatWindow.classList.add('hidden');
            }
        });
    }

    updateDetailOverlayContent(data) {
        if (!data) return;
        const typeLabel = getTypeLabelByVariant(data.type, 'overlay');
        const typeEl = document.getElementById('detailTypeStr');
        if (typeEl) {
            typeEl.innerText = typeLabel;
            typeEl.style.color = data.color;
        }
        const titleEl = document.getElementById('detailTitle');
        if (titleEl) {
            titleEl.innerText = data.name;
            titleEl.style.textShadow = `0 0 15px ${data.color}80`;
        }
        const imageEl = document.getElementById('detailImage');
        if (imageEl) imageEl.src = data.image;
        const coordsEl = document.getElementById('detailCoords');
        if (coordsEl) {
            const coordsText = (window.BlueI18n && typeof window.BlueI18n.t === 'function')
                ? window.BlueI18n.t('detailOverlay.coordsTemplate', {
                    lat: data.lat.toFixed(4),
                    lon: data.lng.toFixed(4)
                })
                : `LAT: ${data.lat.toFixed(4)} | LON: ${data.lng.toFixed(4)}`;
            coordsEl.innerText = coordsText;
        }

        let statsHtml = '';
        if (data.stats) {
            for (const [key, value] of Object.entries(data.stats)) {
                statsHtml += `
                    <div class="flex flex-col border-b border-white/10 pb-1">
                        <span class="text-[10px] text-white/40 uppercase tracking-widest">${key}</span>
                        <span style="color:${data.color}">${value}</span>
                    </div>
                `;
            }
        }
        const detailStats = document.getElementById('detailStats');
        if (detailStats) detailStats.innerHTML = statsHtml;
        const detailDescription = document.getElementById('detailDescription');
        if (detailDescription) detailDescription.innerHTML = data.detailedContent;
    }

    // 显示全屏详情覆盖层
    showDetailOverlay(data) {
        if (!data) return;
        const overlay = document.getElementById('detailOverlay');
        if (!overlay) return;

        this.updateDetailOverlayContent(data);

        // 隐藏浮窗
        this.hideFloatWindow();

        // 相机推近产生失焦感 (这里只推近位置，利用全屏div遮盖)
        gsap.to(this.earth.camera.position, {
            z: 6,
            duration: 1.5,
            ease: "power3.inOut"
        });

        // 展现大面板
        overlay.classList.remove('hidden');
        overlay.classList.add('pointer-events-auto');
        gsap.fromTo(overlay, 
            { opacity: 0, backdropFilter: "blur(0px)" }, 
            { opacity: 1, backdropFilter: "blur(24px)", duration: 0.8, ease: "power2.out" }
        );
    }

    // 隐藏全屏详情覆盖层
    hideDetailOverlay() {
        const overlay = document.getElementById('detailOverlay');
        
        gsap.to(overlay, {
            opacity: 0,
            backdropFilter: "blur(0px)",
            duration: 0.6,
            ease: "power2.in",
            onComplete: () => {
                overlay.classList.add('hidden');
                overlay.classList.remove('pointer-events-auto');
                
                // 恢复悬浮窗与相机
                this.showFloatWindow(this.currentMarkerData);
                gsap.to(this.earth.camera.position, {
                    z: 11,
                    duration: 1.5,
                    ease: "power3.out"
                });
            }
        });
    }

    focusMarkerBySlug(slug) {
        if (!slug) return false;
        const marker = this.data.find((item) => item.slug === slug);
        if (!marker) return false;
        this.handleMarkerClick(marker);
        return true;
    }

    handleLanguageRefresh() {
        if (!this.currentMarkerData) return;
        const overlay = document.getElementById('detailOverlay');
        if (overlay && !overlay.classList.contains('hidden')) {
            this.updateDetailOverlayContent(this.currentMarkerData);
        } else {
            const floatWindow = document.getElementById('floatWindow');
            if (floatWindow && !floatWindow.classList.contains('hidden')) {
                this.updateFloatWindowContent(this.currentMarkerData);
            }
        }
    }

    /* ─────────── 中国区域交互 ─────────── */

    openChinaPortal() {
        this.isAutoRotating = false;
        this.clearIdleTimer();

        // 旋转视角朝向中国（约 35°N 105°E）
        const chinaCenter = this.earth.latLonToVector3(35, 105, 1);
        if (this.rotationTarget) {
            gsap.to(this.rotationTarget.rotation, {
                x: Math.asin(-chinaCenter.y),
                y: Math.atan2(chinaCenter.x, chinaCenter.z),
                duration: 0.9,
                ease: 'power2.inOut'
            });
        }

        // 相机轻微推近
        gsap.to(this.earth.camera.position, {
            z: 13,
            duration: 0.9,
            ease: 'power2.inOut'
        });

        // 边界闪光 → 打开中国地形地图弹窗
        this._flashChinaBorder(() => {
            if (window.BlueAegis && window.BlueAegis.chinaMap) {
                window.BlueAegis.chinaMap.open();
            }
        });
    }

    _flashChinaBorder(onComplete) {
        // 用 chinaHovered 驱动动画层提亮，并延迟回调
        this.earth.chinaHovered = true;
        setTimeout(() => {
            this.earth.chinaHovered = false;
            onComplete && onComplete();
        }, 420);
    }

    _clearChinaHover() {
        if (this.isHoveringChina) {
            this.isHoveringChina = false;
            this.earth.chinaHovered = false;
        }
    }

    /* 将世界坐标转换为经纬度（需考虑地球组旋转） */
    _worldToLatLon(worldPoint) {
        if (!this.earth || !this.earth.earthGroup) return null;
        const local = worldPoint.clone();
        this.earth.earthGroup.worldToLocal(local);
        return this.earth.vector3ToLatLon(local);
    }

    /* 射线法判断点是否在多边形内 [lat, lon][] */
    _pointInPolygon(lat, lon, polygon) {
        if (!polygon || polygon.length < 3) return false;
        let inside = false;
        const n = polygon.length;
        let j = n - 1;
        for (let i = 0; i < n; i++) {
            const [yi, xi] = polygon[i];
            const [yj, xj] = polygon[j];
            if (((yi > lat) !== (yj > lat)) &&
                (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) {
                inside = !inside;
            }
            j = i;
        }
        return inside;
    }
}

window.EarthInteraction = EarthInteraction;

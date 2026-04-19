// 3D 地球核心模块
class EarthScene {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        this.renderer.setClearColor(0x000000, 0);

        this.earthGroup = new THREE.Group();
        this.overlayGroup = new THREE.Group();
        this.overlayGroup.renderOrder = 5;
        this.earthGroup.add(this.overlayGroup);
        this.scene.add(this.earthGroup);
        this.rotationTarget = this.earthGroup;

        this.earthRadius = 5;
        this.earthMesh = null;
        this.cloudsMesh = null;
        this.markers = []; // 存储所有的标记点网格
        this.markerTexture = this.createMarkerTexture();
        this.flows = [];
        this.flowDefinitions = this.getFlowDefinitions();

        this.chinaBorderCoords = [];
        this.chinaIslandCoords = [];
        this.chinaBorderMat = null;
        this.chinaCenterMat = null;
        this.chinaCenterSprite = null;
        this.chinaHovered = false; // 供 interaction.js 设置
        this.taiwanBorderMat = null;
        this.taiwanHaloMat = null;
        this.taiwanCenterMat = null;
        this.taiwanCenterSprite = null;
        this._arrowUpVec = new THREE.Vector3(0, 1, 0);

        this.init();
    }

    init() {
        // 设置渲染器 - 使用window尺寸
        this.renderer.setSize(window.innerWidth, window.innerHeight, true);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // 响应式相机距离：根据屏幕宽度调整，使地球在各设备上合理显示
        this.adjustCameraDistance();
        this.camera.updateProjectionMatrix();

        // 科幻风光照：微弱的全局环境光 + 强烈的侧边冷色光源
        const ambientLight = new THREE.AmbientLight(0x0a192f, 1.5);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0x4FC3F7, 1.2);
        dirLight.position.set(5, 3, 5);
        this.scene.add(dirLight);

        const backLight = new THREE.DirectionalLight(0x7B61FF, 0.8);
        backLight.position.set(-5, -3, -5);
        this.scene.add(backLight);

        // 创建地球
        this.createEarth();

        // 创建大气层发光效果
        this.createAtmosphere();
        this.createFlowLines();
        this.createChinaOverlay();
        this.createSurroundingData();

        // 监听缩放
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    createEarth() {
        const geometry = new THREE.SphereGeometry(this.earthRadius, 64, 64);
        const textureLoader = new THREE.TextureLoader();
        
        // 高级科幻质感材质
        const material = new THREE.MeshStandardMaterial({
            color: 0x111111,
            roughness: 0.6,
            metalness: 0.1
        });

        const mapUrl = './assets/earth_map.jpg';
        const specularUrl = './assets/earth_specular.jpg';
        const normalUrl = './assets/earth_normal.jpg';
        
        textureLoader.load(mapUrl, (texture) => { 
            material.map = texture; 
            material.color.setHex(0xffffff);
            material.needsUpdate = true; 
        });
        textureLoader.load(specularUrl, (texture) => { 
            // 将高光图用作金属度贴图的近似
            material.roughnessMap = texture; 
            material.needsUpdate = true; 
        });
        textureLoader.load(normalUrl, (texture) => { 
            material.normalMap = texture; 
            material.needsUpdate = true; 
        });

        this.earthMesh = new THREE.Mesh(geometry, material);
        this.earthGroup.add(this.earthMesh);
        
        // 云层
        const cloudGeo = new THREE.SphereGeometry(this.earthRadius + 0.05, 64, 64);
        const cloudMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.3, // 更加通透的云层
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        
        const cloudUrl = './assets/earth_clouds.png';
        textureLoader.load(cloudUrl, (texture) => { 
            cloudMat.map = texture; 
            cloudMat.needsUpdate = true; 
        });

        this.cloudsMesh = new THREE.Mesh(cloudGeo, cloudMat);
        this.earthMesh.add(this.cloudsMesh);
    }

    createAtmosphere() {
        const atmosphereGeo = new THREE.SphereGeometry(this.earthRadius + 0.3, 64, 64);
        const atmosphereMat = new THREE.MeshBasicMaterial({
            color: 0x4FC3F7,
            transparent: true,
            opacity: 0.08,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });
        const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
        this.earthGroup.add(atmosphereMesh);
    }

    createSurroundingData() {
        if (this.surroundingDataGroup) return;

        this.surroundingDataGroup = new THREE.Group();
        this.surroundingDataGroup.renderOrder = 1;
        this.scene.add(this.surroundingDataGroup);

        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                vec3 transformed = position;
                transformed.z += sin(uv.x * 20.0) * 0.05;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
            }
        `;
        const fragmentShader = `
            uniform float uTime;
            uniform float uZoomFade;
            varying vec2 vUv;
            void main() {
                float wave = sin(vUv.x * 25.0 + uTime * 2.5) * 0.5 + 0.5;
                float radial = smoothstep(0.0, 0.15, vUv.y) * (1.0 - smoothstep(0.85, 1.0, vUv.y));
                float alpha = (0.2 + wave * 0.5) * radial;
                alpha *= 0.35 + uZoomFade * 0.65;
                vec3 innerColor = vec3(0.03, 0.47, 0.86);
                vec3 outerColor = vec3(0.52, 0.24, 0.92);
                vec3 finalColor = mix(innerColor, outerColor, vUv.x);
                gl_FragColor = vec4(finalColor, alpha);
            }
        `;

        this.surroundingMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uZoomFade: { value: 0 }
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
        });

        const haloGeometry = new THREE.RingGeometry(this.earthRadius + 0.7, this.earthRadius + 1.5, 256, 4);
        const haloMesh = new THREE.Mesh(haloGeometry, this.surroundingMaterial);
        haloMesh.rotation.x = Math.PI / 2;
        this.surroundingDataGroup.add(haloMesh);

        const orbitCount = 5;
        for (let i = 0; i < orbitCount; i++) {
            const orbitGeometry = new THREE.RingGeometry(
                this.earthRadius + 0.9 + i * 0.18,
                this.earthRadius + 0.92 + i * 0.18,
                128,
                1
            );
            const orbitMaterial = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x4FC3F7 : 0x7B61FF,
                transparent: true,
                opacity: 0.12,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide
            });
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbit.rotation.x = Math.PI / 2;
            orbit.rotation.z = i * (Math.PI / orbitCount);
            this.surroundingDataGroup.add(orbit);
        }

        const scatterCount = 900;
        const positions = new Float32Array(scatterCount * 3);
        for (let i = 0; i < scatterCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = this.earthRadius + 0.8 + Math.random() * 1.4;
            const height = (Math.random() - 0.5) * 0.8;
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = height;
            positions[i * 3 + 2] = Math.sin(angle) * radius;
        }
        const scatterGeometry = new THREE.BufferGeometry();
        scatterGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const scatterMaterial = new THREE.PointsMaterial({
            color: new THREE.Color('#4FC3F7'),
            size: 0.06,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true
        });
        const scatter = new THREE.Points(scatterGeometry, scatterMaterial);
        this.surroundingDataGroup.add(scatter);
    }

    getFlowDefinitions() {
        return [
            {
                name: 'kuroshio-current',
                color: '#4FC3F7',
                speed: 0.018,
                path: [
                    [10, 135],
                    [20, 140],
                    [30, 150],
                    [40, 160]
                ]
            },
            {
                name: 'gulf-stream',
                color: '#7B61FF',
                speed: 0.02,
                path: [
                    [20, -80],
                    [30, -70],
                    [40, -60],
                    [50, -40]
                ]
            },
            {
                name: 'antarctic-circumpolar',
                color: '#00DFC0',
                speed: 0.01,
                closed: true,
                path: [
                    [-60, -160],
                    [-58, -60],
                    [-60, 40],
                    [-58, 140],
                    [-60, -160]
                ]
            },
            {
                name: 'yangtze-river',
                color: '#FF9800',
                speed: 0.012,
                path: [
                    [31.0, 104.0],
                    [31.2, 112.0],
                    [31.1, 118.0],
                    [31.2, 121.5]
                ]
            },
            {
                name: 'amazon-river',
                color: '#FF9800',
                speed: 0.011,
                path: [
                    [-3.5, -70],
                    [-2.0, -62],
                    [-1.0, -54],
                    [0.0, -49]
                ]
            },
            {
                name: 'nile-river',
                color: '#FF5252',
                speed: 0.013,
                path: [
                    [10.0, 30.0],
                    [18.0, 31.5],
                    [25.0, 31.2],
                    [30.0, 31.0]
                ]
            },
            {
                name: 'indonesian-throughflow',
                color: '#4FC3F7',
                speed: 0.017,
                path: [
                    [-5, 115],
                    [-6, 125],
                    [-10, 135],
                    [-15, 145]
                ]
            }
        ];
    }

    createFlowLines() {
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;
        const fragmentShader = `
            uniform vec3 uColor;
            uniform float uTime;
            uniform float uSpeed;
            varying vec2 vUv;
            void main() {
                float dashCount = 60.0;
                float timeOffset = uTime * uSpeed * dashCount * 2.5;
                float dashPattern = fract(vUv.x * dashCount - timeOffset);
                float dashAlpha = smoothstep(0.3, 0.4, dashPattern) * (1.0 - smoothstep(0.8, 0.9, dashPattern));
                
                // Base line alpha
                float baseAlpha = 0.30;

                float edgeFade = pow(sin(vUv.y * 3.14159), 2.0);
                float endFade = smoothstep(0.0, 0.05, vUv.x) * (1.0 - smoothstep(0.95, 1.0, vUv.x));

                float finalAlpha = (baseAlpha + dashAlpha) * edgeFade * endFade * 1.1;
                vec3 color = uColor * (0.6 + dashAlpha * 0.8);
                
                gl_FragColor = vec4(color, finalAlpha);
            }
        `;

        this.flowDefinitions.forEach(def => {
            const points = this.buildFlowPoints(def);
            if (points.length < 2) return;
            const curveType = def.curveType || 'centripetal';
            const tension = typeof def.tension === 'number' ? def.tension : 0.5;
            const curve = new THREE.CatmullRomCurve3(points, def.closed || false, curveType, tension);
            const tubularSegments = Math.max(320, points.length * 4);
            const geometry = new THREE.TubeGeometry(
                curve,
                tubularSegments,
                def.width || 0.025,
                12,
                def.closed || false
            );
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    uColor: { value: new THREE.Color(def.color) },
                    uTime: { value: 0 },
                    uSpeed: { value: def.speed || 0.01 }
                },
                vertexShader,
                fragmentShader,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.renderOrder = 2;
            const parentObject = this.overlayGroup || this.earthGroup;
            parentObject.add(mesh);

            // 轻量移动光点 — 沿线滑行的小精灵
            const spriteMaterial = new THREE.SpriteMaterial({
                map: this.markerTexture,
                color: new THREE.Color(def.color),
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(0.28, 0.28, 0.28);
            parentObject.add(sprite);

            // 端点小圆点 — 仅标记起点/终点，不带文字
            if (!def.closed) {
                const flowAltitude = this.earthRadius + (def.offset || 0.08);
                [
                    { pt: points[0],                   opacity: 0.45 },
                    { pt: points[points.length - 1],   opacity: 0.60 }
                ].forEach(({ pt, opacity }) => {
                    const dotGeo = new THREE.SphereGeometry(0.016, 8, 8);
                    const dotMat = new THREE.MeshBasicMaterial({
                        color: new THREE.Color(def.color),
                        transparent: true,
                        opacity,
                        blending: THREE.AdditiveBlending,
                        depthWrite: false
                    });
                    const dot = new THREE.Mesh(dotGeo, dotMat);
                    dot.position.copy(pt.clone().setLength(flowAltitude + 0.06));
                    parentObject.add(dot);
                });
            }

            // 方向箭头锥体：沿流线等间距分布，指向流动方向
            const arrowCones = [];
            const coneCount = def.closed ? 5 : 3;
            for (let ci = 0; ci < coneCount; ci++) {
                const coneGeo = new THREE.ConeGeometry(0.035, 0.14, 8);
                const coneMat = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(def.color),
                    transparent: true,
                    opacity: 0.80,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                });
                const coneArrow = new THREE.Mesh(coneGeo, coneMat);
                coneArrow.userData.phaseOffset = ci / coneCount;
                parentObject.add(coneArrow);
                arrowCones.push(coneArrow);
            }

            this.flows.push({
                curve,
                sprite,
                speed: def.speed || 0.01,
                material,
                closed: !!def.closed,
                arrowCones
            });
        });
    }

    createMarkerTexture() {
        const size = 128;
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(size / 2, size / 2, size * 0.05, size / 2, size / 2, size * 0.5);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    /* ─────────── China border overlay ─────────── */

    getChinaBorderPoints() {
        // 简化的中国大陆边界坐标 [lat, lon]，顺时针
        return [
            [53.5, 122.0],  // 漠河（东北角）
            [52.0, 128.0],
            [48.4, 134.7],  // 抚远（最东点）
            [42.0, 130.6],  // 图们（朝鲜边界）
            [40.2, 124.9],  // 丹东
            [38.9, 121.6],  // 大连
            [37.8, 121.0],  // 山东沿岸
            [36.1, 120.3],  // 青岛
            [32.0, 121.6],  // 长三角
            [28.2, 121.4],  // 温州
            [24.5, 118.1],  // 厦门
            [23.5, 116.7],  // 汕头
            [22.8, 114.6],  // 深圳湾
            [22.3, 114.2],  // 深圳/港澳
            [21.5, 110.3],  // 湛江
            [20.1, 110.0],  // 琼州海峡（大陆侧）
            [21.8, 108.2],  // 广西沿岸
            [22.5, 106.8],  // 中越边界
            [23.0, 105.0],  // 云南/越南
            [22.5, 102.9],  // 云南/老挝
            [22.4, 100.2],  // 云南/缅甸
            [25.2,  97.7],  // 云南/缅甸北
            [27.5,  97.4],  // 藏东/缅甸
            [28.0,  95.3],
            [28.0,  91.5],  // 西藏/不丹
            [28.5,  88.8],  // 锡金
            [30.5,  81.0],  // 尼泊尔西
            [32.5,  79.8],  // 中印边界
            [35.5,  77.8],  // 克什米尔
            [37.5,  74.5],  // 塔吉克斯坦
            [40.2,  73.7],  // 吉尔吉斯斯坦
            [44.0,  80.3],  // 哈萨克斯坦东
            [47.0,  87.5],  // 蒙古边界
            [49.0,  87.0],  // 中俄/蒙古
            [50.0,  97.0],  // 蒙古北
            [48.3, 115.0],  // 蒙古东
            [47.9, 119.7],  // 内蒙古
            [49.0, 119.8],  // 中俄边界
            [50.4, 127.0],  // 黑龙江/俄
            [52.5, 122.5],  // 中俄北
            [53.5, 122.0],  // 闭合回漠河
        ];
    }

    getTaiwanBorderPoints() {
        // 台湾省本岛边界坐标 [lat, lon]，顺时针闭合（精化版，21个控制点）
        return [
            [25.30, 121.55],  // 富贵角（最北点）
            [25.20, 121.85],  // 鼻头角（东北）
            [25.02, 121.98],  // 三貂角（最东北角）
            [24.72, 121.95],  // 苏澳
            [24.26, 121.84],  // 花莲北
            [23.97, 121.79],  // 花莲南
            [23.48, 121.52],  // 成功（东部中段）
            [22.98, 121.24],  // 台东
            [22.56, 121.01],  // 大武
            [22.22, 120.86],  // 鹅鼻头
            [21.90, 120.78],  // 鹅銮鼻（最南端）
            [22.10, 120.47],  // 枋寮（西南角）
            [22.63, 120.27],  // 高雄
            [23.14, 120.06],  // 台南
            [23.60, 120.17],  // 台中
            [24.06, 120.38],  // 苗栗
            [24.47, 120.65],  // 新竹
            [24.80, 121.00],  // 桃园
            [25.10, 121.28],  // 淡水
            [25.24, 121.47],  // 石门
            [25.30, 121.55],  // 闭合回富贵角
        ];
    }

    getPenghuBorderPoints() {
        // 澎湖列岛主岛群轮廓 [lat, lon]，顺时针闭合
        return [
            [23.79, 119.57],  // 澎湖北岛（白沙北）
            [23.74, 119.72],  // 澎湖东北
            [23.57, 119.71],  // 澎湖东（马公东）
            [23.46, 119.62],  // 澎湖东南
            [23.34, 119.51],  // 澎湖南
            [23.42, 119.34],  // 澎湖西南
            [23.58, 119.29],  // 澎湖西（望安西）
            [23.71, 119.39],  // 澎湖西北
            [23.79, 119.57],  // 闭合回起点
        ];
    }

    getHainanBorderPoints() {
        // 海南岛轮廓 [lat, lon]，顺时针闭合
        return [
            [20.05, 110.33], // 海口 (北)
            [19.61, 111.00], // 文昌 (东)
            [19.24, 110.46], // 琼海
            [18.80, 110.32], // 万宁
            [18.22, 109.50], // 三亚 (南)
            [18.50, 108.80], // 乐东
            [19.10, 108.62], // 东方 (西)
            [19.70, 109.20], // 儋州
            [19.90, 109.68], // 临高
            [20.05, 110.33], // 闭合回海口
        ];
    }

    createChinaOverlay() {
        const group = new THREE.Group();
        group.renderOrder = 10; // 确保在地球表面之上渲染
        this.earthGroup.add(group);

        const coords = this.getChinaBorderPoints();
        this.chinaBorderCoords = coords;

        /* ── 在经纬度空间密集插值，保证每个点都贴着球面 ── */
        const alt = this.earthRadius + 0.06;  // 稍高于球面，避免 z-fighting
        const SUB = 18; // 每两个控制点之间插入的中间点数
        const positions = [];

        for (let i = 0; i < coords.length - 1; i++) {
            const [lat0, lon0] = coords[i];
            const [lat1, lon1] = coords[i + 1];
            for (let s = 0; s < SUB; s++) {
                const t = s / SUB;
                const v = this.latLonToVector3(
                    lat0 + (lat1 - lat0) * t,
                    lon0 + (lon1 - lon0) * t,
                    alt
                );
                positions.push(v.x, v.y, v.z);
            }
        }
        // 闭合终点
        const last = this.latLonToVector3(coords[coords.length - 1][0], coords[coords.length - 1][1], alt);
        positions.push(last.x, last.y, last.z);

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(positions), 3));

        /* ── 主边界线 ── */
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x4FC3F7,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending,
            depthTest:  true,    // 使用深度测试，背面自动隐藏，防止漂移
            depthWrite: false
        });
        group.add(new THREE.Line(geo, lineMat));
        this.chinaBorderMat = lineMat;

        /* ── 外发光层（克隆同一 geometry，颜色更淡） ── */
        const glowMat = new THREE.LineBasicMaterial({
            color: 0x00DFC0,
            transparent: true,
            opacity: 0.30,
            blending: THREE.AdditiveBlending,
            depthTest:  true,
            depthWrite: false
        });
        group.add(new THREE.Line(geo.clone(), glowMat));
        this.chinaHaloMat = glowMat;

        /* ── 台湾省轮廓线 ── */
        const twAlt = this.earthRadius + 0.06; // 与大陆线同高
        const twCoords = this.getTaiwanBorderPoints();
        this.chinaIslandCoords = twCoords;
        const twPositions = [];
        for (let i = 0; i < twCoords.length - 1; i++) {
            const [lat0, lon0] = twCoords[i];
            const [lat1, lon1] = twCoords[i + 1];
            for (let s = 0; s < SUB; s++) {
                const t = s / SUB;
                const v = this.latLonToVector3(
                    lat0 + (lat1 - lat0) * t,
                    lon0 + (lon1 - lon0) * t,
                    twAlt
                );
                twPositions.push(v.x, v.y, v.z);
            }
        }
        const twLast = this.latLonToVector3(twCoords[twCoords.length - 1][0], twCoords[twCoords.length - 1][1], twAlt);
        twPositions.push(twLast.x, twLast.y, twLast.z);
        const twGeo = new THREE.BufferGeometry();
        twGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(twPositions), 3));

        const twLine = new THREE.Line(twGeo, lineMat);
        group.add(twLine);
        const twGlowLine = new THREE.Line(twGeo.clone(), glowMat);
        group.add(twGlowLine);

        /* ── 澎湖列岛轮廓线 ── */
        const phCoords = this.getPenghuBorderPoints();
        const phPositions = [];
        for (let i = 0; i < phCoords.length - 1; i++) {
            const [lat0, lon0] = phCoords[i];
            const [lat1, lon1] = phCoords[i + 1];
            for (let s = 0; s < SUB; s++) {
                const t = s / SUB;
                const v = this.latLonToVector3(
                    lat0 + (lat1 - lat0) * t,
                    lon0 + (lon1 - lon0) * t,
                    twAlt
                );
                phPositions.push(v.x, v.y, v.z);
            }
        }
        const phLast = this.latLonToVector3(phCoords[phCoords.length - 1][0], phCoords[phCoords.length - 1][1], twAlt);
        phPositions.push(phLast.x, phLast.y, phLast.z);
        const phGeo = new THREE.BufferGeometry();
        phGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(phPositions), 3));

        const phLine = new THREE.Line(phGeo, lineMat);
        group.add(phLine);
        const phGlowLine = new THREE.Line(phGeo.clone(), glowMat);
        group.add(phGlowLine);

        /* ── 海南岛轮廓线 ── */
        const hnCoords = this.getHainanBorderPoints();
        const hnPositions = [];
        for (let i = 0; i < hnCoords.length - 1; i++) {
            const [lat0, lon0] = hnCoords[i];
            const [lat1, lon1] = hnCoords[i + 1];
            for (let s = 0; s < SUB; s++) {
                const t = s / SUB;
                const v = this.latLonToVector3(
                    lat0 + (lat1 - lat0) * t,
                    lon0 + (lon1 - lon0) * t,
                    twAlt
                );
                hnPositions.push(v.x, v.y, v.z);
            }
        }
        const hnLast = this.latLonToVector3(hnCoords[hnCoords.length - 1][0], hnCoords[hnCoords.length - 1][1], twAlt);
        hnPositions.push(hnLast.x, hnLast.y, hnLast.z);
        const hnGeo = new THREE.BufferGeometry();
        hnGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(hnPositions), 3));

        const hnLine = new THREE.Line(hnGeo, lineMat);
        group.add(hnLine);
        const hnGlowLine = new THREE.Line(hnGeo.clone(), glowMat);
        group.add(hnGlowLine);

        /* ── 南海十段线 (South China Sea Border) ── */
        const scsCoords = [
            [21.0, 108.5], [20.0, 108.0], // 1
            [18.0, 108.0], [17.0, 109.0], // 2
            [15.0, 110.0], [13.0, 111.0], // 3
            [11.0, 110.0], [9.0, 109.5],  // 4
            [7.0, 109.5], [5.0, 109.5],   // 5
            [4.0, 112.0], [4.5, 114.0],   // 6
            [6.0, 116.0], [8.0, 116.5],   // 7
            [10.0, 117.5], [12.0, 118.0], // 8
            [15.0, 118.0], [18.0, 119.0], // 9
            [20.0, 121.0], [21.5, 122.5]  // 10
        ];
        const scsPositions = [];
        for (let i = 0; i < scsCoords.length; i += 2) {
            const [lat0, lon0] = scsCoords[i];
            const [lat1, lon1] = scsCoords[i + 1];
            for (let s = 0; s <= SUB; s++) {
                const t = s / SUB;
                const v = this.latLonToVector3(
                    lat0 + (lat1 - lat0) * t,
                    lon0 + (lon1 - lon0) * t,
                    twAlt
                );
                scsPositions.push(v.x, v.y, v.z);
            }
        }
        // Since it's a dashed line made of segments, we can just use LineSegments
        const scsGeo = new THREE.BufferGeometry();
        scsGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(scsPositions), 3));
        const scsLine = new THREE.LineSegments(scsGeo, lineMat);
        group.add(scsLine);
        const scsGlowLine = new THREE.LineSegments(scsGeo.clone(), glowMat);
        group.add(scsGlowLine);

        /* ── 台湾中心脉冲光点（约 23.5°N 121.0°E） ── */
        const twCenterPos = this.latLonToVector3(23.5, 121.0, this.earthRadius + 0.20);
        this.taiwanCenterMat = new THREE.SpriteMaterial({
            map: this.markerTexture,
            color: new THREE.Color(0x4FC3F7),
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            depthWrite: false
        });
        this.taiwanCenterSprite = new THREE.Sprite(this.taiwanCenterMat);
        this.taiwanCenterSprite.scale.set(0.30, 0.30, 0.30);
        this.taiwanCenterSprite.position.copy(twCenterPos);
        this.taiwanCenterSprite.renderOrder = 15;
        group.add(this.taiwanCenterSprite);

        /* ── 中心脉冲光点（约 35°N 105°E） ── */
        const centerPos = this.latLonToVector3(35, 105, this.earthRadius + 0.15);

        const coreMat = new THREE.SpriteMaterial({
            map: this.markerTexture,
            color: new THREE.Color(0x4FC3F7),
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            depthTest:  true,
            depthWrite: false
        });
        const coreSprite = new THREE.Sprite(coreMat);
        coreSprite.scale.set(0.42, 0.42, 0.42);
        coreSprite.position.copy(centerPos);
        group.add(coreSprite);
        this.chinaCenterSprite = coreSprite;
        this.chinaCenterMat = coreMat;

        /* ── 外环光晕 ── */
        const haloMat = new THREE.SpriteMaterial({
            map: this.markerTexture,
            color: new THREE.Color(0x4FC3F7),
            transparent: true,
            opacity: 0.22,
            blending: THREE.AdditiveBlending,
            depthTest:  true,
            depthWrite: false
        });
        const haloSprite = new THREE.Sprite(haloMat);
        haloSprite.scale.set(0.85, 0.85, 0.85);
        haloSprite.position.copy(centerPos);
        group.add(haloSprite);
        // haloMat 复用 chinaHaloMat slot（线条发光层已占用），单独保存
        this._chinaCoreBigHalo = haloMat;
    }

    /* ─────────── 公共工具方法 ─────────── */

    vector3ToLatLon(v3) {
        // 将地球局部坐标转回经纬度（latLonToVector3 的逆运算）
        const r = v3.length();
        if (r < 0.001) return null;
        const phi   = Math.acos(Math.max(-1, Math.min(1, v3.y / r)));
        // atan2 返回 [-π, π]，东半球 lon>0 时 theta 为负数，需归一化到 [0, 2π]
        let theta = Math.atan2(v3.z, -v3.x);
        if (theta < 0) theta += 2 * Math.PI;
        const lat = 90 - phi   * (180 / Math.PI);
        const lon = theta      * (180 / Math.PI) - 180;
        return { lat, lon };
    }

    pulseMarker(marker, time, scaleDelta = 0.02) {
        if (!marker) return;
        const target = (marker.userData && marker.userData.pulseTarget) || marker;
        const baseScale = (target.userData && target.userData.baseScale) || target.scale.x;
        const phase = (target.userData && target.userData.phase) || 0;
        const scale = baseScale + Math.sin(time * 1.5 + phase) * scaleDelta;
        target.scale.set(scale, scale, scale);
        const material = target.material;
        if (material) {
            const baseOpacity = (target.userData && target.userData.baseOpacity) || material.opacity || 0.6;
            material.opacity = baseOpacity * (0.75 + 0.25 * (Math.sin(time * 2.1 + phase) * 0.5 + 0.5));
        }
    }

    buildFlowPoints(def) {
        const latLng = this.interpolateLatLonPath(def.path || [], def.closed || false, def.subdivisions || 16);
        const altitude = this.earthRadius + (def.offset || 0.08);
        return latLng.map(([lat, lng]) => this.latLonToVector3(lat, lng, altitude));
    }

    interpolateLatLonPath(path = [], closed = false, subdivisions = 8) {
        if (!path.length) return [];
        if (path.length === 1) return [path[0]];

        const result = [];
        const legs = closed ? path.length : path.length - 1;
        for (let i = 0; i < legs; i++) {
            const current = path[i];
            const next = path[(i + 1) % path.length];
            if (i === 0) result.push(current);
            for (let s = 1; s <= subdivisions; s++) {
                const t = s / (subdivisions + 1);
                result.push([
                    THREE.MathUtils.lerp(current[0], next[0], t),
                    THREE.MathUtils.lerp(current[1], next[1], t)
                ]);
            }
            result.push(next);
        }
        if (closed) result.pop();
        return result;
    }

    latLonToVector3(lat, lon, radius) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);

        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const z = (radius * Math.sin(phi) * Math.sin(theta));
        const y = (radius * Math.cos(phi));

        return new THREE.Vector3(x, y, z);
    }

    renderMarkers(data) {
        this.markers.forEach(m => this.overlayGroup.remove(m));
        this.markers = [];

        data.forEach((item) => {
            const pos = this.latLonToVector3(item.lat, item.lng, this.earthRadius + 0.06);

            const markerGroup = new THREE.Group();
            markerGroup.position.copy(pos);
            markerGroup.lookAt(new THREE.Vector3(0, 0, 0));

            // 判断是否为外链标记
            const isExternal = item.type === 'external';

            const rippleMaterial = new THREE.SpriteMaterial({
                map: this.markerTexture,
                color: new THREE.Color(item.color),
                transparent: true,
                opacity: isExternal ? 0.6 : 0.5,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const ripple1 = new THREE.Sprite(rippleMaterial.clone());
            ripple1.scale.set(isExternal ? 0.18 : 0.15, isExternal ? 0.18 : 0.15, isExternal ? 0.18 : 0.15);
            const ripple2 = new THREE.Sprite(rippleMaterial.clone());
            ripple2.scale.set(isExternal ? 0.25 : 0.2, isExternal ? 0.25 : 0.2, isExternal ? 0.25 : 0.2);

            const coreMaterial = new THREE.SpriteMaterial({
                map: this.markerTexture,
                color: new THREE.Color(item.color),
                transparent: true,
                opacity: isExternal ? 0.95 : 0.9,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const coreSprite = new THREE.Sprite(coreMaterial);
            coreSprite.scale.set(isExternal ? 0.22 : 0.12, isExternal ? 0.22 : 0.12, isExternal ? 0.22 : 0.12);

            // Always add core and ripples
            markerGroup.add(coreSprite);
            markerGroup.add(ripple1);
            markerGroup.add(ripple2);

            // 为外链标记添加 3D 旋转锥体（四棱锥）
            if (isExternal) {
                // 四棱锥几何体：减小尺寸，降低亮度
                const pyramidGeo = new THREE.ConeGeometry(0.025, 0.1, 4);
                const pyramidMat = new THREE.MeshPhongMaterial({
                    color: new THREE.Color(item.color),
                    emissive: new THREE.Color(item.color),
                    emissiveIntensity: 0.15,
                    transparent: true,
                    opacity: 0.35,
                    shininess: 60,
                    side: THREE.DoubleSide,
                    wireframe: false
                });
                const pyramidMesh = new THREE.Mesh(pyramidGeo, pyramidMat);
                // 使锥尖指向地球球心
                pyramidMesh.rotation.x = Math.PI / 2;
                // 向外平移一些，使其悬浮在核心点上方
                pyramidMesh.position.z = 0.28;
                markerGroup.add(pyramidMesh);
                markerGroup.userData.pyramid = pyramidMesh;

                // 添加原点标记（一个小球指示器）
                const originGeo = new THREE.SphereGeometry(0.04, 8, 8);
                const originMat = new THREE.MeshPhongMaterial({
                    color: new THREE.Color(item.color),
                    emissive: new THREE.Color(item.color),
                    emissiveIntensity: 1.2,
                    transparent: true,
                    opacity: 1.0,
                    shininess: 100
                });
                const originMesh = new THREE.Mesh(originGeo, originMat);
                originMesh.position.z = 0;
                originMesh.userData.isOriginMarker = true;
                markerGroup.add(originMesh);
                markerGroup.userData.originMarker = originMesh;

                // 标记为外部类型
                markerGroup.userData.isExternal = true;

                // 添加底部光晕精灵（增大尺寸）
                const haloMat = coreMaterial.clone();
                haloMat.opacity = 0.5;
                const haloSprite = new THREE.Sprite(haloMat);
                haloSprite.scale.set(0.55, 0.55, 0.55);
                markerGroup.add(haloSprite);
            }

            markerGroup.userData.core = coreSprite;
            markerGroup.userData.ripples = [ripple1, ripple2];
            markerGroup.userData.rippleOffsets = [0, 0.35];
            markerGroup.userData.markerType = item.type;

            markerGroup.userData.id = item.id;
            markerGroup.userData.fullData = item;

            this.overlayGroup.add(markerGroup);
            this.markers.push(markerGroup);
        });
    }

    /**
     * 保持统一的相机距离
     * 移动端和PC端显示相同大小的地球
     */
    adjustCameraDistance() {
        // 始终使用固定的相机距离，保证地球大小一致
        this.camera.position.z = 20;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;

        // 同时调整相机距离以适应屏幕尺寸变化
        this.adjustCameraDistance();

        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        if (this.earthMesh) {
            this.cloudsMesh.rotation.y += 0.0003;
        }

        const time = Date.now() * 0.0015;
        
        if (this.surroundingMaterial) {
            this.surroundingMaterial.uniforms.uTime.value = time * 0.5;
            this.surroundingDataGroup.rotation.y = time * 0.05;
            this.surroundingDataGroup.rotation.x = Math.sin(time * 0.02) * 0.1;
            
            // Calculate zoom fade based on camera Z (20 is far, 11 is close/zoomed)
            let zoomLevel = (20.0 - this.camera.position.z) / 9.0;
            zoomLevel = Math.max(0, Math.min(1, zoomLevel));
            // smooth out
            this.surroundingMaterial.uniforms.uZoomFade.value += (zoomLevel - this.surroundingMaterial.uniforms.uZoomFade.value) * 0.1;
        }

        this.markers.forEach((markerGroup, index) => {
            const core = markerGroup.userData.core;
            const ripples = markerGroup.userData.ripples || [];
            const rippleOffsets = markerGroup.userData.rippleOffsets || [];
            const isExternal = markerGroup.userData.isExternal;
            const pyramid = markerGroup.userData.pyramid;
            const originMarker = markerGroup.userData.originMarker;

            if (pyramid) {
                pyramid.rotation.y += 0.05;
                const pulse = 0.95 + Math.sin(time * 2.5 + index) * 0.15;
                pyramid.scale.set(pulse, pulse, pulse);
            }

            // 原点标记动画
            if (originMarker) {
                originMarker.rotation.x += 0.02;
                originMarker.rotation.y += 0.03;
                const originPulse = 1 + Math.sin(time * 2.0 + index) * 0.25;
                originMarker.scale.set(originPulse, originPulse, originPulse);
            }

            if (core) {
                if (isExternal) {
                    // 外链标记：更快的脉冲，更明亮
                    const pulse = 0.08 + Math.sin(time * 2.2 + index) * 0.025;
                    core.scale.set(0.18 + pulse, 0.18 + pulse, 0.18 + pulse);
                    core.material.opacity = 0.8 + Math.sin(time * 2.5 + index) * 0.15;
                } else {
                    // 普通标记：原有动画
                    const pulse = 0.1 + Math.sin(time * 1.5 + index) * 0.015;
                    core.scale.set(0.12 + pulse, 0.12 + pulse, 0.12 + pulse);
                    core.material.opacity = 0.75 + Math.sin(time * 1.8 + index) * 0.1;
                }
            }

            ripples.forEach((sprite, idx) => {
                const offset = rippleOffsets[idx] || 0;
                if (isExternal) {
                    // 外链标记：更快的涟漪
                    const progress = (time * 0.6 + offset) % 1;
                    const scale = THREE.MathUtils.lerp(0.25, 0.85, progress);
                    sprite.scale.set(scale, scale, scale);
                    sprite.material.opacity = 0.55 * (1 - progress);
                } else {
                    // 普通标记：原有动画
                    const progress = (time * 0.4 + offset) % 1;
                    const scale = THREE.MathUtils.lerp(0.18, 0.7, progress);
                    sprite.scale.set(scale, scale, scale);
                    sprite.material.opacity = 0.45 * (1 - progress);
                }
            });
        });

        this.flows.forEach(flow => {
            if (flow.material && flow.material.uniforms.uTime) {
                flow.material.uniforms.uTime.value = time * 0.1;
            }
            if (flow.curve && flow.sprite) {
                const progress = (time * flow.speed) % 1;
                const spritePoint = flow.curve.getPoint(progress);
                flow.sprite.position.copy(spritePoint);
                flow.sprite.material.opacity = 0.55 + Math.sin(progress * Math.PI * 2) * 0.30;
            }
            // 更新方向箭头锥体
            if (flow.arrowCones && flow.curve) {
                flow.arrowCones.forEach(cone => {
                    const p = ((time * flow.speed) + cone.userData.phaseOffset) % 1;
                    const pt = flow.curve.getPoint(p);
                    const tangent = flow.curve.getTangent(p).normalize();
                    cone.position.copy(pt);
                    cone.quaternion.setFromUnitVectors(this._arrowUpVec, tangent);
                    cone.material.opacity = 0.55 + Math.sin(p * Math.PI * 2) * 0.25;
                });
            }
        });

        // 中国边界脉冲动画（悬停时提亮）
        if (this.chinaBorderMat) {
            const baseOp = this.chinaHovered ? 0.80 : 0.45;
            this.chinaBorderMat.opacity = baseOp + Math.sin(time * 1.8) * 0.12;
        }
        if (this.chinaHaloMat) {
            this.chinaHaloMat.opacity = (this.chinaHovered ? 0.38 : 0.18) + Math.sin(time * 1.3) * 0.06;
        }
        if (this.chinaCenterSprite && this.chinaCenterMat) {
            const baseScale = this.chinaHovered ? 0.55 : 0.40;
            const cs = baseScale + Math.sin(time * 1.4) * 0.07;
            this.chinaCenterSprite.scale.set(cs, cs, cs);
            this.chinaCenterMat.opacity = 0.60 + Math.sin(time * 2.2) * 0.20;
        }
        if (this._chinaCoreBigHalo) {
            this._chinaCoreBigHalo.opacity = (this.chinaHovered ? 0.35 : 0.18) + Math.sin(time * 1.0) * 0.06;
        }

        // 台湾省边界脉冲动画（与大陆同步节律，相位偏移 π 形成呼应感）
        if (this.taiwanBorderMat) {
            this.taiwanBorderMat.opacity = 0.75 + Math.sin(time * 1.8 + Math.PI) * 0.18;
        }
        if (this.taiwanHaloMat) {
            this.taiwanHaloMat.opacity = 0.35 + Math.sin(time * 1.3 + Math.PI) * 0.12;
        }
        if (this.taiwanCenterSprite && this.taiwanCenterMat) {
            const ts = 0.28 + Math.sin(time * 2.0 + Math.PI * 0.5) * 0.06;
            this.taiwanCenterSprite.scale.set(ts, ts, ts);
            this.taiwanCenterMat.opacity = 0.70 + Math.sin(time * 2.5) * 0.20;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

if (typeof window !== 'undefined') {
    window.EarthScene = EarthScene;
}

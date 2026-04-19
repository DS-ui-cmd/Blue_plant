// 项目初始化与统筹入口
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined' || typeof gsap === 'undefined') {
        const fallbackMessage = window.BlueI18n ? window.BlueI18n.t('errors.coreMissing') : 'System Error: Core modules not loaded.';
        document.body.innerHTML = `<div style="color:white;text-align:center;margin-top:20vh;font-family:sans-serif;">${fallbackMessage}</div>`;
        return;
    }

    // 初始化背景与全局特效
    new OceanCurrentCanvas('oceanCurrentCanvas');
    new Starfield('stars-container');
    new BackgroundHUDCanvas('bgDataCanvas');
    
    // 初始化密集数据面板模块
    new EnvironmentalCounter(); // 左侧：损害计数器
    new WeatherDynamics();      // 右侧：气象与潮汐指数
    new MiniChart('miniChartCanvas'); // 右侧：卫星遥测折线图
    new InformationTicker('news-ticker'); // 左侧：全球截获资讯
    new SloganRotator('slogan-text');    // 右下角：标语

    // 初始化 3D 地球场景
    const earthScene = new EarthScene('earthCanvas');
    if (window.markersData) earthScene.renderMarkers(window.markersData);

    // 初始化地球朝向：让中国（35°N 105°E）正对镜头，不再需要等待自转对准
    {
        const chinaCenter = earthScene.latLonToVector3(35, 105, 1);
        earthScene.earthGroup.rotation.x = Math.asin(-chinaCenter.y);
        earthScene.earthGroup.rotation.y = Math.atan2(chinaCenter.x, chinaCenter.z);
    }

    // 绑定交互逻辑
    const interaction = new EarthInteraction(earthScene, window.markersData);
    window.BlueAegis = window.BlueAegis || {};
    window.BlueAegis.earth = earthScene;
    window.BlueAegis.interaction = interaction;

    // 强制Canvas接收鼠标事件
    earthScene.canvas.style.pointerEvents = 'auto';
    earthScene.canvas.style.zIndex = '5';

    // 验证设置
    setTimeout(() => {
        const computed = getComputedStyle(earthScene.canvas);
        console.log('=== Canvas Config ===');
        console.log('pointer-events:', computed.pointerEvents);
        console.log('z-index:', computed.zIndex);
        if (computed.pointerEvents !== 'auto') {
            console.warn('⚠ Forcing pointer-events again...');
            earthScene.canvas.style.cssText += '; pointer-events: auto !important;';
        }
    }, 100);

    // 启动渲染循环
    earthScene.animate();

    // 更新系统状态参数
    const altEl = document.getElementById('sys-alt');
    setInterval(() => {
        if (earthScene.camera && altEl) {
            altEl.innerText = earthScene.camera.position.z.toFixed(3) + ' km';
        }
    }, 100);

    // 页面入场动效
    gsap.fromTo(".nav-box", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" });
    gsap.fromTo(".hud-frame", { scale: 0.98, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: "power2.out" });
    gsap.fromTo("aside", 
        { opacity: 0 }, 
        { 
            opacity: 1, 
            duration: 1, 
            delay: 0.8, 
            stagger: 0.2,
            onComplete: () => {
                document.querySelectorAll("aside.fui-panel").forEach(el => el.classList.add('ready-for-transition'));
            }
        }
    );
    
    setTimeout(() => {
        const tipBox = document.getElementById('tipBox');
        if (tipBox) tipBox.classList.remove('fade-out');
    }, 3000);
});

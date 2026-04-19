/**
 * 响应式增强脚本（简化版）
 * 仅处理设备检测和方向变化，布局由CSS控制
 */

class ResponsiveHelper {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        this.isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        this.isDesktop = window.innerWidth >= 1024;
        this.currentOrientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.ensureEarthVisible();
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('orientationchange', () => this.handleOrientationChange());
    }

    handleResize() {
        const prevMobile = this.isMobile;
        const prevTablet = this.isTablet;

        this.isMobile = window.innerWidth < 768;
        this.isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        this.isDesktop = window.innerWidth >= 1024;

        if (prevMobile !== this.isMobile || prevTablet !== this.isTablet) {
            this.ensureEarthVisible();
        }
    }

    handleOrientationChange() {
        const newOrientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

        if (this.currentOrientation !== newOrientation) {
            this.currentOrientation = newOrientation;
            setTimeout(() => {
                this.ensureEarthVisible();
                window.dispatchEvent(new Event('resize'));
            }, 100);
        }
    }

    /**
     * ✅ 确保地球始终可见 - 这是关键
     */
    ensureEarthVisible() {
        const earthCanvas = document.getElementById('earthCanvas');

        if (earthCanvas) {
            // 强制显示地球
            earthCanvas.style.display = 'block';
            earthCanvas.style.width = '100%';
            earthCanvas.style.height = '100%';
        }
    }

    // 公开API
    static getInstance() {
        if (!window.__responsiveHelper) {
            window.__responsiveHelper = new ResponsiveHelper();
        }
        return window.__responsiveHelper;
    }

    static getDeviceType() {
        const instance = ResponsiveHelper.getInstance();
        if (instance.isMobile) return 'mobile';
        if (instance.isTablet) return 'tablet';
        return 'desktop';
    }

    static getOrientation() {
        const instance = ResponsiveHelper.getInstance();
        return instance.currentOrientation;
    }
}

// 自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        ResponsiveHelper.getInstance();
    });
} else {
    ResponsiveHelper.getInstance();
}

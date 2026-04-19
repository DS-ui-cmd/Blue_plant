// 实时环境损害计数器及虚假数据流量监控
class EnvironmentalCounter {
    constructor() {
        this.economy = 4280192;
        this.families = 812;
        this.lives = 43;

        // 虚假展示数据
        this.queries = 1482903;
        this.users = 452110;
        this.audience = 8930221;

        this.els = {
            economy: document.getElementById('stat-economy'),
            families: document.getElementById('stat-families'),
            lives: document.getElementById('stat-lives'),
            queries: document.getElementById('stat-queries'),
            users: document.getElementById('stat-users'),
            audience: document.getElementById('stat-audience')
        };

        this.start();
    }

    start() {
        setInterval(() => {
            // 每秒动态增加
            this.economy += Math.random() * 1500 + 500;
            this.families += Math.random() < 0.3 ? 1 : 0;
            this.lives += Math.random() < 0.1 ? 1 : 0;

            // 虚假数据动态增长
            this.queries += Math.floor(Math.random() * 50 + 10);
            this.users += Math.floor(Math.random() * 5 - 2);
            this.audience += Math.floor(Math.random() * 150 + 20);

            this.updateUI();
        }, 1000);
    }

    updateUI() {
        if(this.els.economy) this.els.economy.innerText = this.economy.toLocaleString(undefined, {minimumFractionDigits: 0});
        if(this.els.families) this.els.families.innerText = this.families.toLocaleString();
        if(this.els.lives) this.els.lives.innerText = this.lives.toLocaleString();

        if(this.els.queries) this.els.queries.innerText = this.queries.toLocaleString();
        if(this.els.users) this.els.users.innerText = this.users.toLocaleString();
        if(this.els.audience) this.els.audience.innerText = this.audience.toLocaleString();
    }
}

window.EnvironmentalCounter = EnvironmentalCounter;

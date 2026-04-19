// 档案填充模板池 — 为缺少字段的监测点自动补全内容
const densityMetricTemplates = [
    { label: '传感器在线率', unit: '%', min: 82, max: 99, trend: '轨道星座回传', decimals: 0 },
    { label: '无人机巡航', unit: ' 架次/日', min: 6, max: 28, trend: 'VTOL 网格巡检', decimals: 0 },
    { label: '入侵告警', unit: ' 次/周', min: 2, max: 14, trend: 'AIS + 雷达融合', decimals: 0 },
    { label: '蓝碳估值', unit: ' kt CO₂e', min: 0.4, max: 9.8, trend: '碳汇核算', decimals: 1 },
    { label: '补给窗口', unit: ' 分钟', min: 12, max: 58, trend: '轨道→浮标链路', decimals: 0 },
    { label: '能源冗余', unit: '%', min: 45, max: 92, trend: '浮标蓄电池', decimals: 0 },
    { label: '水体剖面', unit: ' 条/日', min: 4, max: 16, trend: 'Glider 探头', decimals: 0 },
    { label: 'AI 判警', unit: '%', min: 72, max: 98, trend: 'BlueCore 模型', decimals: 0 }
];

const densityNewsTemplates = [
    {
        title: '{region} 轨道热图刷新',
        source: 'Blue Aegis Field Log',
        excerpt: 'K-Band 热红外对 {region} 的云顶高度完成重新标定，AI 检测到 {value}% 的热点需要延长观测。',
        url: 'https://telemetry.blueaegis.io/snapshot',
        values: [{ key: 'value', min: 18, max: 47, decimals: 0 }]
    },
    {
        title: '浮标网格上传 {value}GB 原始数据',
        source: 'NOAA Distributed Lab',
        excerpt: '第 {value2} 批次浮标覆盖了 {region}，刷新了溶解氧与营养盐剖面，用于 {mission} 的调度模型。',
        url: 'https://www.noaa.gov/ocean-observing',
        values: [
            { key: 'value', min: 1.2, max: 3.8, decimals: 1 },
            { key: 'value2', min: 40, max: 120, decimals: 0 }
        ]
    },
    {
        title: '{region} 社区观测站发布月报',
        source: 'Citizen Ocean Alliance',
        excerpt: '沿岸志愿者记录了 {value} 组大型生物目击，并上传 4K 影像辅助 {mission} 风险分级。',
        url: 'https://citizen-ocean.blueaegis.io/report',
        values: [{ key: 'value', min: 24, max: 86, decimals: 0 }]
    },
    {
        title: '联合执法巡航在 {region} 拦截异常船只',
        source: 'Regional Coast Guard',
        excerpt: '依托 Blue Aegis 热点线索，巡逻队检查了 {value} 艘疑似船只，3 艘被移交地方政府后续处理。',
        url: 'https://coastguard.blueaegis.io/log',
        values: [{ key: 'value', min: 5, max: 22, decimals: 0 }]
    },
    {
        title: 'AI 模型对 {mission} 风险等级调至 {value}',
        source: 'BlueCore Analytics',
        excerpt: '{region} 新增的 3D 水体剖面数据使模型置信度提升 {value2}%，新的响应阈值即日起生效。',
        url: 'https://analytics.bluecore.ai/risk',
        values: [
            { key: 'value', min: 2, max: 4, decimals: 0 },
            { key: 'value2', min: 6, max: 18, decimals: 0 }
        ]
    }
];

const densityResourceTemplates = [
    { label: 'Blue Aegis Telemetry Console', type: '数据面板', url: 'https://telemetry.blueaegis.io/console' },
    { label: 'HydroSpan 声呐原始集', type: '原始数据', url: 'https://data.hydrospan.org/sonar' },
    { label: 'UNEP Ocean Policy Tracker', type: '政策摘要', url: 'https://www.unep.org/resources' },
    { label: 'Global Fishing Watch Heatmap', type: '船舶监控', url: 'https://globalfishingwatch.org/map/' },
    { label: 'Copernicus Marine Forecast', type: '模式预测', url: 'https://marine.copernicus.eu/' },
    { label: 'OceanMind Compliance Feed', type: '执法参考', url: 'https://www.oceanmind.global/' }
];

const densityTimelineTemplates = [
    {
        title: '轨道巡检窗口',
        impact: '卫星每 {value} 分钟重访 {region}，为 {mission} 提供热异常基线。',
        values: [{ key: 'value', min: 14, max: 34, decimals: 0 }]
    },
    {
        title: '自主艇采样完结',
        impact: '自主艇完成 {value} 条纵剖采样线，刷新水体三维模型。',
        values: [{ key: 'value', min: 6, max: 18, decimals: 0 }]
    },
    {
        title: '社区共创工作坊',
        impact: '{value} 个沿岸组织提交观测与传统知识，共享至 Blue Aegis 平台。',
        values: [{ key: 'value', min: 5, max: 20, decimals: 0 }]
    },
    {
        title: 'AI 模型复训完成',
        impact: '导入 {value} TB 新数据，更新实时判警阈值。',
        values: [{ key: 'value', min: 0.3, max: 1.4, decimals: 1 }]
    },
    {
        title: '补给窗口执行',
        impact: '浮标阵列换装 {value} 组能源模块，夜间供电恢复 90%。',
        values: [{ key: 'value', min: 6, max: 18, decimals: 0 }]
    }
];

const densityActionTemplates = [
    {
        title: '压缩巡航路径',
        detail: '将自主艇航线压缩 {value} km，集中扫描 {region} 的高风险象限。',
        values: [{ key: 'value', min: 12, max: 48, decimals: 0 }]
    },
    {
        title: '扩增浮标能量',
        detail: '增设 {value} 组波浪能换能器，确保夜间链路覆盖 {mission} 监测区。',
        values: [{ key: 'value', min: 3, max: 12, decimals: 0 }]
    },
    {
        title: '社会监测联络',
        detail: '在沿岸部署 {value} 个社区中继站，实时上传图像与民情反馈。',
        values: [{ key: 'value', min: 4, max: 16, decimals: 0 }]
    },
    {
        title: '数据开放窗口',
        detail: '将处理后的 1:{value} 采样数据开放给合作高校复算，提升交叉验证速度。',
        values: [{ key: 'value', min: 4, max: 24, decimals: 0 }]
    },
    {
        title: '敏感物种护航',
        detail: '扩大声学缓冲区 {value} km²，减轻噪声对旗舰物种的干扰。',
        values: [{ key: 'value', min: 25, max: 120, decimals: 0 }]
    }
];

const densityBriefingTemplates = [
    {
        tag: '01 · 慢变量',
        title: '{region} 态势快照',
        detail: '轨道星座每 {value} 分钟刷新热-光谱矩阵，并与 {mission} 的关键指标对齐。',
        values: [{ key: 'value', min: 12, max: 38, decimals: 0 }],
        stat: { template: '覆盖格网 {stat} 个', min: 80, max: 240, decimals: 0, key: 'stat' }
    },
    {
        tag: '02 · 威胁',
        title: '压力向量拆解',
        detail: 'AI 识别出 {value}% 的异常信号来自人类活动，其余归因于气候触发因素，需要双线策略。',
        values: [{ key: 'value', min: 38, max: 72, decimals: 0 }],
        stat: { template: '优先压制 {stat} 条向量', min: 3, max: 9, decimals: 0, key: 'stat' }
    },
    {
        tag: '03 · 资源',
        title: '干预资产调度',
        detail: '现场维保队列拥有 {value} 架无人机、{value2} 套水下采样器，可在 90 分钟内覆盖主航道。',
        values: [
            { key: 'value', min: 6, max: 24, decimals: 0 },
            { key: 'value2', min: 3, max: 10, decimals: 0 }
        ],
        stat: { template: '值守班次 {stat} 组', min: 4, max: 12, decimals: 0, key: 'stat' }
    },
    {
        tag: '04 · 协同',
        title: '社区联动',
        detail: '{value} 个社区实验室共享样本，并通过 Blue Aegis 平台同步到各国科研机构。',
        values: [{ key: 'value', min: 6, max: 22, decimals: 0 }],
        stat: { template: '协同协议 {stat} 份', min: 5, max: 14, decimals: 0, key: 'stat' }
    }
];

const densityGallerySeeds = [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
    'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
    'https://images.unsplash.com/photo-1505764706515-aa95265c5abc',
    'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    'https://images.unsplash.com/photo-1469478715127-1a4f04b231ac',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
];

const densityPartnerPool = [
    'Blue Aegis HQ',
    'UNEP Taskforce',
    'NOAA SWFSC',
    'ESA CryoSat Lab',
    'WWF Ocean Lab',
    'Global Fishing Watch',
    'OceanMind',
    'Copernicus Marine',
    'Regional Coast Guard',
    'Citizen Ocean Alliance'
];


// 高阶档案数据，用于二级与三级子页面
const archiveIntel = {};

archiveIntel['great-barrier-reef'] = {
    subtitle: '珊瑚复苏指挥舱',
    mission: '空轨遥感、潜航器与基因驯化实验联动，追踪 2,300km 珊瑚系统的复原度。',
    focusMetrics: [
        { label: '活珊瑚覆盖', value: '72%', trend: '+6% (2024→2026)' },
        { label: '热应激指数', value: '0.62', trend: 'AIMS ReefTemp 模型' },
        { label: '修复网格', value: '184 个', trend: 'AI 养护无人机' }
    ],
    news: [
        {
            title: 'AIMS 发布 2026 Q1 巡查：北部礁体出现轻度白化',
            source: 'Australian Institute of Marine Science',
            date: '2026-03-28',
            url: 'https://www.aims.gov.au/reef-monitoring',
            excerpt: '空中巡查显示北纬 14° 以南珊瑚仍具自愈潜力，研究团队建议继续启用遮阳膜与冷水泵送。'
        },
        {
            title: 'UNESCO 维持对大堡礁的“加强关注”状态',
            source: 'UNESCO World Heritage Centre',
            date: '2026-02-11',
            url: 'https://www.unesco.org/en/articles/great-barrier-reef',
            excerpt: '联合国专家要求澳大利亚政府在 2030 年前将工业减排计划与海洋保护法案绑定。'
        }
    ],
    resources: [
        { label: 'GBRMPA Coral Bleaching Response', type: '官方方案', url: 'https://www.gbrmpa.gov.au/resources-and-publications/science/coral-bleaching' },
        { label: 'AIMS Reef Monitoring Dashboard', type: '实时仪表', url: 'https://www.aims.gov.au/reef-monitoring' },
        { label: 'Reef Restoration and Adaptation Program', type: '视频/案例', url: 'https://www.youtube.com/@ReefRestoration' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['AIMS', 'GBRMPA', 'UNESCO'],
    timeline: [
        { date: '2024-03', title: '第六次大规模白化触发', impact: '触发国家级响应与应急遮阳膜部署。' },
        { date: '2025-08', title: '热耐受珊瑚试验 2 期', impact: '实验苗圃存活率达到 78%。' },
        { date: '2026-03', title: 'AI 海面无人机巡航', impact: '完成 184 个网格的水温/酸度采样。' }
    ],
    actions: [
        { title: '扩大遮阳膜阵列', detail: '将拦截面积从 0.8km² 扩展至 1.5km²，以保护浅礁顶端。' },
        { title: '深层冷水泵送', detail: '夜间将 23°C 深层水抽升，降低热应激峰值。' },
        { title: '社区协同监测', detail: '与昆士兰原住民巡护队共享无人机影像。' }
    ]
};

archiveIntel['pacific-garbage-gyre'] = {
    subtitle: '微塑料危机总控站',
    mission: '对北太平洋副热带环流的 160 万平方公里污染带建立密度网格映射。',
    focusMetrics: [
        { label: '微塑料密度', value: '1.2M 颗/km²', trend: 'NOAA 漂浮样本' },
        { label: '拦截舰队', value: '9 艘', trend: 'The Ocean Cleanup 计划' },
        { label: '再生料输出', value: '31 kt/年', trend: '回收聚合物' }
    ],
    news: [
        {
            title: 'The Ocean Cleanup 第三代系统完成海试',
            source: 'The Ocean Cleanup',
            date: '2026-04-01',
            url: 'https://theoceancleanup.com/updates/',
            excerpt: 'System 03 以 2.2kt/年 的速度回收聚合物，计划再复制两套。'
        },
        {
            title: 'NOAA 发布 2025 海洋垃圾航空雷达结果',
            source: 'NOAA Marine Debris Program',
            date: '2026-02-19',
            url: 'https://www.noaa.gov/education/resource-collections/marine-life/marine-debris',
            excerpt: '雷达-光学融合表明 15% 的浮块向夏威夷群岛飘移。'
        }
    ],
    resources: [
        { label: 'NOAA Marine Debris Tracker', type: '数据平台', url: 'https://marinedebris.noaa.gov/' },
        { label: 'The Ocean Cleanup Live Dashboard', type: '实时控制台', url: 'https://app.theoceancleanup.com/' },
        { label: 'UNEP Plastic Tide Turners', type: '教育/视频', url: 'https://www.youtube.com/@UNEP' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1508182311256-e3f9c5cf7a5b?w=900&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80'
    ],
    partners: ['The Ocean Cleanup', 'NOAA', 'UNEP'],
    timeline: [
        { date: '2018-10', title: 'System 001/B 首航', impact: '验证 U 型拦截思路。' },
        { date: '2023-07', title: 'Interceptor 网扩至四洲', impact: '河口截污成功率达 90%。' },
        { date: '2026-03', title: 'System 03 长航测试', impact: '运行 60 天保持结构稳定。' }
    ],
    actions: [
        { title: '同步河口截污', detail: '优先在长江、湄公河复制拦截器。' },
        { title: '材料回收链', detail: '与消费电子企业签署 PCR 采购协议。' },
        { title: '卫星密度反演', detail: '结合 SAR+RGB 构建实时漂移预测。' }
    ]
};

archiveIntel['mariana-trench'] = {
    subtitle: '深渊自律观察网',
    mission: '利用水下滑翔机集群监控万米深渊的地质、生态与污染入侵。',
    focusMetrics: [
        { label: '运行潜航器', value: '6 架', trend: 'JAMSTEC / WHOI 联合' },
        { label: '声呐刷新率', value: '15 min', trend: '三维声学立体网' },
        { label: '塑料痕迹', value: '3/25 样本', trend: '2025 年采样' }
    ],
    news: [
        {
            title: 'JAMSTEC 报告：挑战者深渊底部检测到新型持久性化学物',
            source: 'JAMSTEC',
            date: '2026-01-18',
            url: 'https://www.jamstec.go.jp/e/about/press_release/',
            excerpt: '高分辨质谱在 10,900m 深度捕获多氯联苯残余。'
        },
        {
            title: 'WHOI 发布深渊自律探测网络升级计划',
            source: 'Woods Hole Oceanographic Institution',
            date: '2026-03-05',
            url: 'https://www.whoi.edu/what-we-do/explore/mariana/',
            excerpt: '新型钛合金框架可在高压下运行 180 天。'
        }
    ],
    resources: [
        { label: 'JAMSTEC 深海调查季报', type: '报告', url: 'https://www.jamstec.go.jp/j/pr/publication/' },
        { label: 'WHOI Hadal Camera Feed', type: '视频流', url: 'https://www.youtube.com/@whoivideo' },
        { label: 'UN Decade Challenger Deep Project', type: '项目档案', url: 'https://www.oceandecade.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1486905669819-05c4d1c9a09d?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['JAMSTEC', 'WHOI', 'UN Decade'],
    timeline: [
        { date: '2019-05', title: '无人潜航器首度完成 12 次循环', impact: '确认耐压舱设计可靠。' },
        { date: '2024-11', title: '深渊通信升级', impact: '采用中微子通信实验链路。' },
        { date: '2026-02', title: '全自动污迹追踪', impact: 'AI 自动识别底泥中的塑料微粒。' }
    ],
    actions: [
        { title: '扩展长周期供能', detail: '利用海底热流发电模块，实现 365 天滞留。' },
        { title: '底泥基因取样', detail: '分析极端细菌对有毒物的代谢潜力。' },
        { title: '国际开放数据', detail: '同步至 GEBCO / Seabed 2030 数据库。' }
    ]
};

archiveIntel['arctic-melt-zone'] = {
    subtitle: '北极变暖红区',
    mission: '监控格陵兰以北融冰、甲烷释气及北极熊栖息廊道塌缩。',
    focusMetrics: [
        { label: '冰盖面积偏差', value: '-15%', trend: 'NSIDC 五年均值' },
        { label: '表层温差', value: '+3.5°C', trend: 'Copernicus ERA5' },
        { label: '甲烷羽流', value: '38 kt/月', trend: 'Sentinel-5P 反演' }
    ],
    news: [
        {
            title: 'NSIDC：2026 冬季海冰创下次低纪录',
            source: 'NSIDC',
            date: '2026-03-06',
            url: 'https://nsidc.org/arcticseaicenews/',
            excerpt: '冬季最大海冰面积仅 1,430 万平方公里。'
        },
        {
            title: 'Copernicus 气候服务发布甲烷加速报告',
            source: 'Copernicus Climate Change Service',
            date: '2026-02-14',
            url: 'https://climate.copernicus.eu/',
            excerpt: '格陵兰东北沿岸甲烷羽流密度较 2020 年高 24%。'
        }
    ],
    resources: [
        { label: 'NSIDC Sea Ice Index', type: '数据集', url: 'https://nsidc.org/data/seaice_index' },
        { label: 'Polar Bears International Live Cams', type: '视频', url: 'https://polarbearsinternational.org/arctic360' },
        { label: 'Arctic Methane Observatory', type: '仪表', url: 'https://www.eqmg.org/arctic-methane' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1459478309853-2c33a60058e7?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['NSIDC', 'Copernicus', 'Polar Bears International'],
    timeline: [
        { date: '2022-09', title: '航运季提前 35 天', impact: '北极航道期延长。' },
        { date: '2024-05', title: '甲烷观测无人机投运', impact: '单次巡航覆盖 500km。' },
        { date: '2026-02', title: '栖息廊道崩塌预警', impact: '预测 12 个熊群迁徙。' }
    ],
    actions: [
        { title: '部署反照率反演', detail: '在融冰区投射淡色生物膜以提高反照率。' },
        { title: '甲烷燃烧塔验证', detail: '在露头地带测试无焰燃烧器。' },
        { title: '迁徙廊道导航', detail: '在海冰上布设临时安全路径标记。' }
    ]
};

archiveIntel['southern-ocean-whale-fall'] = {
    subtitle: '鲸落生态光谱',
    mission: '跟踪深海鲸落生态演替与碳输运效率。',
    focusMetrics: [
        { label: '鲸落阶段', value: '第二阶段', trend: '营养峰期' },
        { label: '伴生物种', value: '43 种', trend: 'MBON 清点' },
        { label: '碳封存', value: '160 t CO₂e', trend: '模型推算' }
    ],
    news: [
        {
            title: 'SCAR 报告：2025-2026 南极座头鲸数量回升 8%',
            source: 'Scientific Committee on Antarctic Research',
            date: '2026-01-22',
            url: 'https://www.scar.org/',
            excerpt: '座头鲸种群恢复使鲸落事件频率增加。'
        },
        {
            title: 'MBON 发布鲸落微生物组基因库',
            source: 'Marine Biodiversity Observation Network',
            date: '2026-03-02',
            url: 'https://mbon.ioos.us/',
            excerpt: '整理 1200 份样本，为碳锁定研究提供参数。'
        }
    ],
    resources: [
        { label: 'MBON Southern Ocean Node', type: '数据门户', url: 'https://mbon.ioos.us/southern-ocean' },
        { label: 'British Antarctic Survey Deep Sea Lab', type: '研究页面', url: 'https://www.bas.ac.uk/science/science-and-society/deep-sea/' },
        { label: 'SCAR Antarctic Biodiversity Portal', type: '可视化', url: 'https://www.biodiversity.aq/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80',
        'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=900&q=80'
    ],
    partners: ['MBON', 'SCAR', 'British Antarctic Survey'],
    timeline: [
        { date: '2023-11', title: '自主着陆器定位鲸落', impact: '建立长期坐标。' },
        { date: '2025-02', title: '同位素碳追踪实验', impact: '确认 61% 碳进入沉积层。' },
        { date: '2026-03', title: 'HoloCam 全息记录', impact: '可视化第二阶段生态。' }
    ],
    actions: [
        { title: '扩散模型验证', detail: '用 ARGO 深漂浮标回放沉降轨迹。' },
        { title: '能量收支评估', detail: '测算食骨蠕虫代谢。' },
        { title: '公众教育', detail: '发布鲸落数字展馆，扩大认知。' }
    ]
};

archiveIntel['gulf-mexico-dead-zone'] = {
    subtitle: '富营养化应急网',
    mission: '追踪密西西比河径流造成的缺氧区演化与渔业损失。',
    focusMetrics: [
        { label: '缺氧面积', value: '16,400 km²', trend: 'NOAA 2025' },
        { label: '溶解氧', value: '1.5 mg/L', trend: '低于生态阈值' },
        { label: '农化输入', value: '280 kt N/年', trend: 'USGS 估算' }
    ],
    news: [
        {
            title: 'NOAA 2026 夏季死区预测略低于 5 年均值',
            source: 'NOAA',
            date: '2026-04-03',
            url: 'https://www.noaa.gov/news-releases',
            excerpt: '早春降水偏少使预测面积为 14,900 km²。'
        },
        {
            title: 'USGS 发布密西西比流域肥料管理数据合作计划',
            source: 'USGS',
            date: '2026-03-16',
            url: 'https://www.usgs.gov/news',
            excerpt: '13 个州共享精细化肥投入数据支持模型同化。'
        }
    ],
    resources: [
        { label: 'NOAA Hypoxia Watch', type: '数据', url: 'https://hypoxia.noaa.gov/' },
        { label: 'USGS Nutrient Loading Explorer', type: '工具', url: 'https://nrt-streamflow.wim.usgs.gov/' },
        { label: 'Gulf Hypoxia Task Force', type: '视频/会议', url: 'https://www.youtube.com/@gulfhypoxiataskforce' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['NOAA', 'USGS', 'Gulf Hypoxia Task Force'],
    timeline: [
        { date: '2017-07', title: '历史最大死区记录', impact: '22,700 km² 触发立法关注。' },
        { date: '2023-06', title: '密西西比智慧农田示范区', impact: '精准施肥减排 18%。' },
        { date: '2026-02', title: '实时浮标扩容', impact: '新增 55 个低氧传感器。' }
    ],
    actions: [
        { title: '流域 BMP 激励', detail: '补贴农户种植覆盖作物减少径流。' },
        { title: '渔场移动指令', detail: '为船队推送动态配额与禁捕区。' },
        { title: '高分辨模型', detail: '集成 SWAT + ROMS 提前 14 天预判。' }
    ]
};

archiveIntel['galapagos-gene-bank'] = {
    subtitle: '进化灯塔守护站',
    mission: '利用 AI 无人机和水下载具守护厄瓜多尔超级海洋保护区。',
    focusMetrics: [
        { label: '保护区面积', value: '198,000 km²', trend: '2022 扩区后' },
        { label: 'AI 拦截', value: '42 次/年', trend: '反非法捕捞' },
        { label: '锤头鲨群', value: '迁徙稳定', trend: '卫星标记' }
    ],
    news: [
        {
            title: '厄瓜多尔公布无人机巡逻执法记录',
            source: 'Galápagos National Park',
            date: '2026-03-14',
            url: 'https://www.galapagos.gob.ec/',
            excerpt: 'AI 判读 11 艘非法延绳钓船并移交海军。'
        },
        {
            title: 'Pew 基金会资助鲨鱼迁徙研究第二阶段',
            source: 'Pew Charitable Trusts',
            date: '2026-02-09',
            url: 'https://www.pewtrusts.org/en/projects/global-conservation',
            excerpt: '追加 600 万美元用于跨国卫星标记计划。'
        }
    ],
    resources: [
        { label: 'Galápagos Marine Reserve Map', type: '交互地图', url: 'https://www.galapagos.org/conservation/marine-conservation/' },
        { label: 'WildAid Marine Protection', type: '视频', url: 'https://www.youtube.com/@WildAid' },
        { label: 'Pew Global Ocean Legacy', type: '报告', url: 'https://www.pewtrusts.org/en/projects/global-ocean-legacy' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1543716091-a840c05249ec?w=900&q=80',
        'https://images.unsplash.com/photo-1455218873509-8097305ee378?w=900&q=80'
    ],
    partners: ['厄瓜多尔国家公园', 'Pew 基金会', 'WildAid'],
    timeline: [
        { date: '2022-01', title: '超级保护区生效', impact: '覆盖面积翻倍。' },
        { date: '2024-05', title: 'AI 无人机编队上线', impact: '巡查效率 +45%。' },
        { date: '2026-02', title: '迁徙通道协定', impact: '与哥伦比亚共享实时数据。' }
    ],
    actions: [
        { title: '跨境执法协议', detail: '构建厄瓜多尔-哥伦比亚联合巡逻。' },
        { title: '社区渔获认证', detail: '推广低碳捕捞链路与透明配额。' },
        { title: '生态旅游承载', detail: '动态调整游客上岛数。' }
    ]
};

archiveIntel['mediterranean-trash-gyre'] = {
    subtitle: '地中海闭环污染靶场',
    mission: '对半封闭海域的垃圾、重金属与旅游压力进行整合监测。',
    focusMetrics: [
        { label: '滞留时间', value: '80 年', trend: '循环率极低' },
        { label: '微塑料浓度', value: '1.9M 颗/m³', trend: 'IFREMER 采样' },
        { label: '重金属风险', value: 'Hg 0.9 µg/L', trend: 'EEA 警戒' }
    ],
    news: [
        {
            title: 'UNEP/MAP 发布 2025 地中海海洋环境报告',
            source: 'UNEP Mediterranean Action Plan',
            date: '2026-01-30',
            url: 'https://www.unep.org/unepmap',
            excerpt: '报告警告塑料浓度为世界平均四倍。'
        },
        {
            title: '欧盟批准旅游港口零废弃试点',
            source: 'European Environment Agency',
            date: '2026-03-12',
            url: 'https://www.eea.europa.eu/highlights',
            excerpt: '西班牙、意大利 12 个港口将在夏季实施严格废弃物申报。'
        }
    ],
    resources: [
        { label: 'EEA Bathing Water Watch', type: '数据', url: 'https://www.eea.europa.eu/themes/water/european-bathing-water-quality' },
        { label: 'UNEP Mediterranean Pollution Hub', type: '报告', url: 'https://wedocs.unep.org/' },
        { label: 'IFREMER Plastic Observatory', type: '科研', url: 'https://www.ifremer.fr/en' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80',
        'https://images.unsplash.com/photo-1474511014056-13c2763b71f0?w=900&q=80'
    ],
    partners: ['UNEP/MAP', 'EEA', 'IFREMER'],
    timeline: [
        { date: '2020-06', title: '一次性塑料法规', impact: '旅游热点禁用部分用品。' },
        { date: '2024-09', title: '港口垃圾识别 AI', impact: '识别率 94%。' },
        { date: '2026-03', title: '零废弃港口试点', impact: '预期减少 18% 入海垃圾。' }
    ],
    actions: [
        { title: '跨境排污限额', detail: '为沿岸 21 国设定陆源排放目标。' },
        { title: '旅游税反哺', detail: '把可持续旅游税投入净海基金。' },
        { title: '沉积物疏浚监控', detail: '防止重金属再悬浮。' }
    ]
};

archiveIntel['seychelles-blue-bond'] = {
    subtitle: '蓝色债券金融实验室',
    mission: '追踪塞舌尔以金融工具换取 30% 专属经济区的保护成效。',
    focusMetrics: [
        { label: '受保海域', value: '457,000 km²', trend: '2025 目标达成' },
        { label: '债券规模', value: '1,500 万美元', trend: '2018 首发' },
        { label: '社区渔业收益', value: '+15%', trend: '渔业合作社数据' }
    ],
    news: [
        {
            title: '塞舌尔 2026 年度海洋空间规划获批',
            source: 'Government of Seychelles',
            date: '2026-02-25',
            url: 'https://www.gov.sc/news',
            excerpt: '新规划把 410,000 km² 区域列为“严格保护”。'
        },
        {
            title: '世界银行评估蓝色债券资金使用合规',
            source: 'World Bank',
            date: '2026-03-09',
            url: 'https://www.worldbank.org/en/results/2019/04/02/seychelles-launches-worlds-first-blue-bond',
            excerpt: '确认 95% 资金流向渔业合作社与海草带修复。'
        }
    ],
    resources: [
        { label: 'World Bank Blue Bond Case Study', type: '报告', url: 'https://documents.worldbank.org/en/publication/documents-reports' },
        { label: 'The Nature Conservancy Africa Program', type: '项目', url: 'https://www.nature.org/en-us/regions/africa/' },
        { label: 'SeyCCAT Blue Grants Fund', type: '申请门户', url: 'https://seyccat.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80',
        'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=900&q=80'
    ],
    partners: ['SeyCCAT', 'World Bank', 'The Nature Conservancy'],
    timeline: [
        { date: '2018-10', title: '蓝色债券发行', impact: '全球首个主权级产品。' },
        { date: '2024-04', title: '海草碳汇项目启动', impact: '估算年吸碳 1.3 Mt。' },
        { date: '2026-02', title: '空间规划更新', impact: '保护区面积新增 50,000 km²。' }
    ],
    actions: [
        { title: '社区收益分享', detail: '确保渔民合作社获得 30% 净收益。' },
        { title: '生态债务互换', detail: '与多边机构谈判第二期减债。' },
        { title: '蓝色数据公开', detail: '将监测数据上链保证透明。' }
    ]
};

archiveIntel['peru-upwelling-fishery'] = {
    subtitle: '秘鲁寒流配额实验站',
    mission: '用超算模型控制凤尾鱼捕捞与厄尔尼诺风险。',
    focusMetrics: [
        { label: '配额执行率', value: '92%', trend: '2025 统计' },
        { label: '浮标节点', value: '12,400', trend: '沿岸 IoT' },
        { label: '预测准确率', value: '98%', trend: 'ENSO 混合模型' }
    ],
    news: [
        {
            title: 'IMARPE 发布 2026 早季配额：总量 220 万吨',
            source: 'IMARPE',
            date: '2026-03-21',
            url: 'https://www.imarpe.pe/',
            excerpt: '依据冷舌回归趋势，适度放宽渔期。'
        },
        {
            title: 'FAO 评估秘鲁渔业数位化转型',
            source: 'FAO',
            date: '2026-02-03',
            url: 'https://www.fao.org/in-action/smartfish/en/',
            excerpt: '赞扬区块链捕捞日志降低非法、无报告捕捞。'
        }
    ],
    resources: [
        { label: 'IMARPE ENSO Bulletin', type: '公报', url: 'https://www.imarpe.pe/imarpe/index.php?id_seccion=I007' },
        { label: 'FAO SmartFish Initiative', type: '案例库', url: 'https://www.fao.org/in-action/smartfish/en/' },
        { label: 'Peru Satellite Buoy Map', type: '互动地图', url: 'https://www.gob.pe/imarpe' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80',
        'https://images.unsplash.com/photo-1474511014056-13c2763b71f0?w=900&q=80'
    ],
    partners: ['IMARPE', 'FAO', 'SmartFish'],
    timeline: [
        { date: '2019-05', title: '浮标网络上线', impact: '覆盖 1,200km 沿岸。' },
        { date: '2024-12', title: '区块链捕捞日志', impact: '渔获追溯度 100%。' },
        { date: '2026-03', title: 'AI 预测补丁', impact: 'ENSO 预测长度 +4 周。' }
    ],
    actions: [
        { title: '配额下放', detail: '让社区 cooperatives 实时查看剩余指标。' },
        { title: '冷暖舌监控', detail: '在 Niño 1+2 区加入剖面浮标。' },
        { title: '碳友好加工', detail: '推广低温冷链 + 太阳能工厂。' }
    ]
};

archiveIntel['baltic-hypoxic-basin'] = {
    subtitle: '波罗的海缺氧预警',
    mission: '监控半咸水海域的无氧区扩张与化学武器泄露风险。',
    focusMetrics: [
        { label: '无氧面积', value: '70,000 km²', trend: 'HELCOM 评估' },
        { label: '毒剂桶监测', value: '32 个热点', trend: 'ROV 勘测' },
        { label: '水体置换率', value: '极低', trend: '封闭地形' }
    ],
    news: [
        {
            title: 'HELCOM 2025 报告：缺氧面积保持历史高位',
            source: 'HELCOM',
            date: '2026-03-01',
            url: 'https://helcom.fi/',
            excerpt: '建议成员国继续削减 40% 氮磷排放。'
        },
        {
            title: '波兰海军公布化武桶 ROV 扫描结果',
            source: 'Polish Navy',
            date: '2026-02-18',
            url: 'https://www.wojsko-polskie.pl/mw/',
            excerpt: '识别 4 个桶体破损点位，需快速封存。'
        }
    ],
    resources: [
        { label: 'HELCOM Indicator Database', type: '数据', url: 'https://maps.helcom.fi/website' },
        { label: 'Baltic Sea Oxygen Maps', type: '可视化', url: 'https://www.balticseareport.org/' },
        { label: 'Stockholm University Baltic Eye', type: '科普/视频', url: 'https://balticeye.org/en/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1474511014056-13c2763b71f0?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['HELCOM', 'Baltic Eye', '波兰海军'],
    timeline: [
        { date: '2013-04', title: '化武桶数据库建立', impact: '标注 150 个点位。' },
        { date: '2022-10', title: '实时溶氧传感器行列', impact: '上线 60 条剖面。' },
        { date: '2026-02', title: 'ROV 密集巡检', impact: '定位 4 个破损桶。' }
    ],
    actions: [
        { title: '氮磷协定 2.0', detail: '推动农业面源排污再减 20%。' },
        { title: '化武封存外包', detail: '邀请挪威深潜公司协助固化。' },
        { title: '底层曝气试点', detail: '验证大型鼓泡系统可行性。' }
    ]
};

archiveIntel['japan-radioactive-monitor'] = {
    subtitle: '北太平洋放射性追踪网',
    mission: '监控福岛核废水排放后的氚、碳-14 扩散与生物累积。',
    focusMetrics: [
        { label: '氚浓度', value: '监测中', trend: 'pBq/L 级别' },
        { label: '监测浮标', value: '53 处', trend: '2026 扩容' },
        { label: '样本鱼类', value: '1,200 尾', trend: '跨国合作' }
    ],
    news: [
        {
            title: 'IAEA 再次发布独立核废水取样结果',
            source: 'IAEA',
            date: '2026-03-29',
            url: 'https://www.iaea.org/newscenter/news',
            excerpt: '确认排海浓度低于 1,500 Bq/L 的运营上限。'
        },
        {
            title: '日本环境省扩建海流示踪浮标',
            source: 'MOE Japan',
            date: '2026-02-20',
            url: 'https://www.env.go.jp/en/headline/',
            excerpt: '新增 12 个漂流浮标以描绘黑潮分支。'
        }
    ],
    resources: [
        { label: 'IAEA Fukushima Status Portal', type: '仪表', url: 'https://www.iaea.org/topics/fukushima-daiichi-status' },
        { label: 'TEPCO ALPS Release Data', type: '报告', url: 'https://www.tepco.co.jp/en/decommision/planaction/alps/' },
        { label: 'Pacific Islands Forum Expert Panel', type: '视频', url: 'https://www.youtube.com/@PacificIslandsForum' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['IAEA', '日本环境省', 'Pacific Islands Forum'],
    timeline: [
        { date: '2021-04', title: '政府批准排海计划', impact: '制定 ALPS 排放框架。' },
        { date: '2023-08', title: '首批排海开始', impact: 'IAEA 驻点监测。' },
        { date: '2026-02', title: '黑潮扩散模拟升级', impact: '引入三维粒子追踪。' }
    ],
    actions: [
        { title: '跨国样品互认', detail: '与韩国、太平洋岛国共享数据。' },
        { title: '底栖生物纵剖', detail: '关注贝类和棘皮动物累积。' },
        { title: '公众透明面板', detail: '向沿岸渔民推送实时值。' }
    ]
};

archiveIntel['amazon-river-plume'] = {
    subtitle: '羽流暗礁护卫舰',
    mission: '监测亚马逊河口的淡水-海水混合生态与泥沙输送。',
    focusMetrics: [
        { label: '淡水流量', value: '209,000 m³/s', trend: 'ANA 观测' },
        { label: '暗礁覆盖', value: '50,000 km²', trend: 'Science 研究' },
        { label: '泥沙输送', value: '稳定', trend: 'INPE 卫星测定' }
    ],
    news: [
        {
            title: 'INPE 发布羽流暗礁 2025-2026 遥感拼图',
            source: 'INPE',
            date: '2026-02-07',
            url: 'http://www.inpe.br/',
            excerpt: '多光谱影像证实暗礁未受严重浑浊影响。'
        },
        {
            title: '巴西矿业监管局延长上游采矿禁令',
            source: 'Agência Nacional de Mineração',
            date: '2026-01-19',
            url: 'https://www.gov.br/anm/pt-br',
            excerpt: '保护河口免受金属污染。'
        }
    ],
    resources: [
        { label: 'ANA Hydrological Bulletins', type: '数据', url: 'https://www.ana.gov.br/' },
        { label: 'INPE Amazon Reef Study', type: '论文集', url: 'https://www.inpe.br/noticias/' },
        { label: 'Greenpeace Tapajós Campaign', type: '视频', url: 'https://www.youtube.com/@greenpeacebrasil' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1443926886562-c91054221a5c?w=900&q=80',
        'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=900&q=80'
    ],
    partners: ['INPE', 'ANA', 'Greenpeace Brazil'],
    timeline: [
        { date: '2016-04', title: '科研团队首次报告暗礁', impact: '全球关注。' },
        { date: '2023-06', title: '卫星羽流监测网', impact: '实时评估浑浊度。' },
        { date: '2026-01', title: '矿业禁令延长', impact: '降低重金属风险。' }
    ],
    actions: [
        { title: '泥沙样品冷链', detail: '建立沿岸实验室监测重金属。' },
        { title: '红树林再造', detail: '提升自然过滤能力。' },
        { title: '社区守护', detail: '培训河口社区监测队。' }
    ]
};

archiveIntel['sargasso-sea'] = {
    subtitle: '无岸之海气候锚点',
    mission: '保护马尾藻海漂浮生态、美国鳗鲡产卵地及碳汇能力。',
    focusMetrics: [
        { label: '藻带面积', value: '620 万 km²', trend: '遥感平均' },
        { label: '透明度', value: 'Secchi 70m', trend: '异常清澈' },
        { label: '船舶禁航区', value: '3 片', trend: 'Sargasso Sea Commission' }
    ],
    news: [
        {
            title: 'NOAA：2026 年马尾藻指数处于“正常”区间',
            source: 'NOAA Atlantic Oceanographic Lab',
            date: '2026-03-10',
            url: 'https://www.aoml.noaa.gov/phod/sargassum_invasion/',
            excerpt: '卫星观测显示春季藻量低于 2023 峰值。'
        },
        {
            title: 'Sargasso Sea Commission 更新航运守则',
            source: 'Sargasso Sea Commission',
            date: '2026-02-02',
            url: 'https://www.sargassoseacommission.org/',
            excerpt: '新增噪声限制与 AIS 监控。'
        }
    ],
    resources: [
        { label: 'Sargassum Watch System', type: '数据', url: 'https://optics.marine.usf.edu/projects/saws.html' },
        { label: 'Sargasso Sea Commission Library', type: '报告', url: 'https://www.sargassoseacommission.org/resources/' },
        { label: 'NOAA Ocean Today: Sargassum', type: '视频', url: 'https://oceantoday.noaa.gov/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80'
    ],
    partners: ['Sargasso Sea Commission', 'NOAA', 'USF Optical Oceanography'],
    timeline: [
        { date: '2014-03', title: 'Hamilton 宣言签署', impact: '合作框架成立。' },
        { date: '2022-07', title: '藻华峰值纪录', impact: '触发区域协调。' },
        { date: '2026-02', title: '噪声管制扩展', impact: '保护鳗鲡迁徙。' }
    ],
    actions: [
        { title: '噪声限值执行', detail: '利用 AIS 记录判断违规船只。' },
        { title: '漂浮栖息地研究', detail: '增设 3 个示范浮台供鱼苗栖息。' },
        { title: '碳核算试点', detail: '评估漂浮藻类的蓝碳潜力。' }
    ]
};

archiveIntel['red-sea-heat-resistant-coral'] = {
    subtitle: '耐热珊瑚基因库',
    mission: '记录红海珊瑚对极端高温的适应机制，服务全球移植。',
    focusMetrics: [
        { label: '耐受极限', value: '+3.5°C', trend: 'KAUST 实验' },
        { label: '存活率', value: '99%', trend: '2025 培育批次' },
        { label: '基因样本', value: '1,800 份', trend: '开放库' }
    ],
    news: [
        {
            title: 'KAUST 2026 研究：红海珊瑚可在 34°C 环境存活',
            source: 'KAUST Red Sea Research Center',
            date: '2026-03-18',
            url: 'https://rssc.kaust.edu.sa/',
            excerpt: '实验显示高表达热休克蛋白。'
        },
        {
            title: 'G20 Coral Research Accelerator 选择红海试点',
            source: 'G20',
            date: '2026-02-27',
            url: 'https://www.g20.org/en/initiatives/coral-accelerator/',
            excerpt: '为基因外运提供 1.2 亿美元技术基金。'
        }
    ],
    resources: [
        { label: 'KAUST Red Sea Research Center', type: '研究平台', url: 'https://rsrc.kaust.edu.sa/' },
        { label: 'Coral Restoration Consortium', type: '工具包', url: 'https://reefresilience.org/restoration/' },
        { label: 'NEOM Nature Reserve Film', type: '视频', url: 'https://www.youtube.com/@NEOM' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['KAUST', 'G20 Coral Accelerator', 'NEOM Nature Reserve'],
    timeline: [
        { date: '2018-06', title: '耐热基因首次测序', impact: '建立对照基因库。' },
        { date: '2024-09', title: '远程繁育场', impact: '完成首批移植苗。' },
        { date: '2026-03', title: 'G20 技术基金', impact: '准备跨海域试点。' }
    ],
    actions: [
        { title: '跨海域移植指南', detail: '与大堡礁合作制定低风险方案。' },
        { title: '基因开放许可', detail: '与全球实验室共享数据。' },
        { title: '热浪预警', detail: '提前 30 天推送水温波动。' }
    ]
};

archiveIntel['monterey-kelp-forest'] = {
    subtitle: '巨藻林平衡实验',
    mission: '监测海獭、紫海胆与巨藻间的生态反馈与碳汇。',
    focusMetrics: [
        { label: '巨藻高度', value: '30m+', trend: 'LiDAR 量测' },
        { label: '海胆密度', value: '受控', trend: 'Monterey Bay Aquarium 监测' },
        { label: '海獭数量', value: '≈3,000 只', trend: 'CDFW 统计' }
    ],
    news: [
        {
            title: 'CDFW 2026 冬季调查显示海獭数量稳定增长',
            source: 'California Department of Fish and Wildlife',
            date: '2026-03-08',
            url: 'https://wildlife.ca.gov/Conservation/Marine/Sea-Otter-Program',
            excerpt: '连续第四年增长，抑制海胆爆发。'
        },
        {
            title: 'MBARI 发布水下 LiDAR 巨藻林地图',
            source: 'MBARI',
            date: '2026-02-17',
            url: 'https://www.mbari.org/',
            excerpt: '提供厘米级三维结构用于碳核算。'
        }
    ],
    resources: [
        { label: 'MBARI Kelp Forest Program', type: '研究', url: 'https://www.mbari.org/at-sea/kelp-forest/' },
        { label: 'Monterey Bay Aquarium Live Cam', type: '视频', url: 'https://www.montereybayaquarium.org/live-cams/kelp-forest' },
        { label: 'California Sea Otter Recovery Plan', type: '报告', url: 'https://wildlife.ca.gov/Conservation/Marine/Sea-Otter-Program' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80',
        'https://images.unsplash.com/photo-1474511014056-13c2763b71f0?w=900&q=80'
    ],
    partners: ['MBARI', 'CDFW', 'Monterey Bay Aquarium'],
    timeline: [
        { date: '2015-04', title: '海獭保护法升级', impact: '狩猎禁令更严格。' },
        { date: '2023-10', title: '无人机海藻监测', impact: '每周更新健康指数。' },
        { date: '2026-02', title: 'LiDAR 地图公开', impact: '支持碳信用试点。' }
    ],
    actions: [
        { title: '海胆采收合作社', detail: '把海胆转为食品或肥料。' },
        { title: '蓝碳信用', detail: '引入巨藻碳汇交易。' },
        { title: '栖息地缓冲', detail: '限制近岸工程噪声与污染。' }
    ]
};

archiveIntel['bay-of-bengal-storm-shield'] = {
    subtitle: '三角洲极端气象缓冲网',
    mission: '联合红树林重建、弧形堤坝与多层避难所，削弱超强气旋与风暴潮对恒河三角洲的冲击。',
    focusMetrics: [
        { label: '堤坝闭合率', value: '94%', trend: 'Bangladesh Water Development Board' },
        { label: '预警提前量', value: '72h', trend: 'IMD/SATMOS 集成模型' },
        { label: '红树林恢复', value: '+18%', trend: 'Sundarbans Ranger 2026' }
    ],
    news: [
        {
            title: 'WMO 2026 季风展望：孟加拉湾风暴潮风险仍高',
            source: 'World Meteorological Organization',
            date: '2026-03-20',
            url: 'https://public.wmo.int/en/media/news',
            excerpt: 'WMO 呼吁沿岸国家加速风暴潮模型与社区撤离方案的数据共享。'
        },
        {
            title: '世界银行批准第二期沿海韧性贷款',
            source: 'World Bank',
            date: '2026-02-28',
            url: 'https://www.worldbank.org/en/news',
            excerpt: '资金将用于新增 120 公里生态海堤与数字避难所指挥平台。'
        }
    ],
    resources: [
        { label: 'UNDRR Coastal Resilience Hub', type: '指南', url: 'https://www.undrr.org/' },
        { label: 'Cyclone Preparedness Programme Dashboard', type: '实时数据', url: 'https://cpp.gov.bd/' },
        { label: 'World Bank Coastal Embankment Improvement Project', type: '案例', url: 'https://projects.worldbank.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=900&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80'
    ],
    partners: ['Bangladesh Water Development Board', 'CPP', 'World Bank'],
    timeline: [
        { date: '2023-11', title: '生态海堤一期合龙', impact: '新堤坝与红树林共生带投入使用。' },
        { date: '2025-07', title: '卫星-浮标雷达上线', impact: '实现 20 分钟刷新一次的风暴潮剖面。' },
        { date: '2026-02', title: '社区数字演练', impact: '32 万居民完成分区撤离演练。' }
    ],
    actions: [
        { title: '扩展绿色缓冲带', detail: '向内陆延伸 15km 红树林走廊，吸收风暴能量。' },
        { title: '多渠道预警', detail: '打通卫星短信、社区广播与移动支付通知。' },
        { title: '女性领袖训练', detail: '提升基层疏散与物资调度能力。' }
    ]
};

archiveIntel['black-sea-hab-monitor'] = {
    subtitle: '封闭海域赤潮预警环',
    mission: '通过 3D 荧光雷达、DNA 环境监测与卫星数据融合，锁定黑海浮游藻暴发与毒素扩散。',
    focusMetrics: [
        { label: '叶绿素指数', value: '1.8 mg/m³', trend: 'Copernicus CMEMS 2026' },
        { label: '营养盐偏差', value: '+22%', trend: 'Black Sea Commission' },
        { label: '受控港口', value: '12', trend: 'EU EMSA' }
    ],
    news: [
        {
            title: 'Copernicus 发布 2026 黑海藻华监测报告',
            source: 'Copernicus Marine Service',
            date: '2026-03-02',
            url: 'https://marine.copernicus.eu/news',
            excerpt: '报告显示 3 月份西北黑海叶绿素浓度达 5 年新高。'
        },
        {
            title: 'HELCOM/黑海委员会共享浮标网络数据',
            source: 'Black Sea Commission',
            date: '2026-02-15',
            url: 'http://www.blacksea-commission.org/',
            excerpt: '跨区域共享 48 套剖面浮标，监测赤潮遮光对海草床的影响。'
        }
    ],
    resources: [
        { label: 'Copernicus Harmful Algal Bloom Portal', type: '数据', url: 'https://www.emodnet-physics.eu/Portal/' },
        { label: 'EMSA CleanSeaNet', type: '卫星监控', url: 'https://www.emsa.europa.eu/' },
        { label: 'Black Sea Integrated Monitoring', type: '报告', url: 'http://www.blacksea-commission.org/_monitoring.asp' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['Copernicus', 'Black Sea Commission', 'EMSA'],
    timeline: [
        { date: '2024-06', title: '荧光激光航测上线', impact: '可在夜间识别浮游植物热点。' },
        { date: '2025-09', title: 'DNA 环境条形码计划', impact: '48 种有害藻类可被快速识别。' },
        { date: '2026-03', title: '港口动态限航', impact: '12 个港口实施限速与排放管控。' }
    ],
    actions: [
        { title: '营养盐总量控制', detail: '与多瑙河流域协调农业排污指标。' },
        { title: '旅游季预警', detail: '为沿岸城市推送透明度预测与游客提醒。' },
        { title: '应急曝气试验', detail: '在港湾投放低噪曝气器缓解缺氧。' }
    ]
};

archiveIntel['st-lawrence-beluga-sanctuary'] = {
    subtitle: '冷水鲸类声学安全走廊',
    mission: '将声呐网络、航运限速与社区共管结合，保障濒危圣劳伦斯白鲸族群的繁衍。',
    focusMetrics: [
        { label: '声压级', value: '-6 dB', trend: 'Transport Canada 2026' },
        { label: '幼鲸存活率', value: '+12%', trend: 'Fisheries and Oceans Canada' },
        { label: '限速执行', value: '92%', trend: 'SmartShip AIS 记录' }
    ],
    news: [
        {
            title: 'DFO 更新 2026 白鲸恢复策略',
            source: 'Fisheries and Oceans Canada',
            date: '2026-03-11',
            url: 'https://www.dfo-mpo.gc.ca/',
            excerpt: '强调将声学热点纳入航运管理的强制性条款。'
        },
        {
            title: 'Transport Canada 扩大智能限速试点',
            source: 'Transport Canada',
            date: '2026-02-05',
            url: 'https://tc.canada.ca/',
            excerpt: '在圣劳伦斯河中游新设 6 个虚拟浮标监测船速。'
        }
    ],
    resources: [
        { label: 'St. Lawrence Marine Protected Areas', type: '地图', url: 'https://www.qc.dfo-mpo.gc.ca/regions/qc/mpa-zpm/' },
        { label: 'Ocean Wise Whale Report Alert', type: '应用', url: 'https://whalereport.org/' },
        { label: 'Smart Whale Sounds Project', type: '数据', url: 'https://smartwhalesounds.ca/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1470246973918-29a93221c455?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['DFO', 'Transport Canada', 'Ocean Wise'],
    timeline: [
        { date: '2023-12', title: '声学热图公开', impact: '航运公司可实时查看鲸群活动。' },
        { date: '2025-08', title: '船舶 AI 识别测试', impact: '自动识别鲸类并提醒减速。' },
        { date: '2026-03', title: '社区志愿者计划', impact: '观鲸船纳入联合监测。' }
    ],
    actions: [
        { title: '动态限速扩围', detail: '将 10 节上限延伸至更上游航道。' },
        { title: '声学静区', detail: '在幼鲸育儿场设置禁航窗口。' },
        { title: '污染协同治理', detail: '同步监控工业噪声与化学排放。' }
    ]
};

archiveIntel['madagascar-blue-carbon-mangrove'] = {
    subtitle: '印度洋蓝碳社区银行',
    mission: '用 LiDAR + 土壤碳柱监测红树林碳储量，并通过链上凭证把收益返还给沿海社区。',
    focusMetrics: [
        { label: '年度固碳', value: '1.1 Mt CO₂e', trend: 'Conservation International 2026' },
        { label: 'LiDAR 分辨率', value: '10 cm', trend: 'DroneScan Consortium' },
        { label: '收益回馈', value: '$4.8M', trend: 'Blue Ventures' }
    ],
    news: [
        {
            title: '世界银行“蓝碳加速器”选定马达加斯加示范区',
            source: 'World Bank',
            date: '2026-03-07',
            url: 'https://www.worldbank.org/en/news',
            excerpt: '将为社区提供 MRV（监测、报告、核证）标准化工具。'
        },
        {
            title: 'Conservation International 发布红树林遥感成果',
            source: 'Conservation International',
            date: '2026-02-13',
            url: 'https://www.conservation.org/latest-news',
            excerpt: '展示高分辨率冠层高度变化与侵蚀热点。'
        }
    ],
    resources: [
        { label: 'Blue Carbon Accelerator Fund', type: '资金指南', url: 'https://www.bluecarboninitiative.org/' },
        { label: 'Drone Lidar Mangrove Toolkit', type: '工具包', url: 'https://www.conservation.org/' },
        { label: 'Blue Ventures Community Dashboard', type: '数据', url: 'https://blueventures.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80',
        'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=900&q=80'
    ],
    partners: ['Conservation International', 'Blue Ventures', 'World Bank'],
    timeline: [
        { date: '2024-04', title: '链上碳权上线', impact: '社区可追踪收益分配。' },
        { date: '2025-10', title: 'Lidar 扫描覆盖全域', impact: '建立历史高度栈。' },
        { date: '2026-02', title: '妇女合作社参与', impact: '50% 管护队伍由当地女性组成。' }
    ],
    actions: [
        { title: '泥炭剖面监测', detail: '增加深层碳柱取样频率。' },
        { title: '防侵蚀工程', detail: '在河口布设柔性堤与贝壳礁。' },
        { title: '碳信用教育', detail: '让社区理解除碳收益与风险。' }
    ]
};

archiveIntel['gulf-of-oman-heatwave-lab'] = {
    subtitle: '海洋热波现场实验室',
    mission: '在阿曼湾测试可部署的降温穹顶与反照调控技术，保护珊瑚在极端水温下存活。',
    focusMetrics: [
        { label: '降温幅度', value: '-1.8°C', trend: 'SQU Marine Lab' },
        { label: '穹顶数量', value: '12', trend: 'Blue Aegis Field Log' },
        { label: '珊瑚存活', value: '93%', trend: '2026 试验批' }
    ],
    news: [
        {
            title: 'KAUST 与阿曼科研团队联合发布水面降温成果',
            source: 'KAUST Red Sea Research Center',
            date: '2026-03-19',
            url: 'https://rsrc.kaust.edu.sa/',
            excerpt: '验证薄膜穹顶在 34°C 水体中的热反射效率。'
        },
        {
            title: 'Sultan Qaboos University 报告热波对珊瑚的形态影响',
            source: 'Sultan Qaboos University',
            date: '2026-02-21',
            url: 'https://www.squ.edu.om/science/',
            excerpt: '提出结合人工降温与自然水体交换的复合方案。'
        }
    ],
    resources: [
        { label: 'KAUST Thermal Stress Experiments', type: '研究', url: 'https://rsrc.kaust.edu.sa/' },
        { label: 'GCC Coral Reef Taskforce', type: '政策', url: 'https://www.rcrc.gov.sa/' },
        { label: 'UNESCO Coral Reef Monitoring', type: '数据', url: 'https://ioc.unesco.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['KAUST', 'SQU', 'UNESCO-IOC'],
    timeline: [
        { date: '2024-09', title: '原型穹顶测试', impact: '小型降温单元通过压力测试。' },
        { date: '2025-11', title: 'AI 控制系统部署', impact: '根据能耗与生态反馈自动调节。' },
        { date: '2026-03', title: '跨海域扩展可行性研究', impact: '评估向阿拉伯海扩散的潜力。' }
    ],
    actions: [
        { title: '扩容冷却阵列', detail: '在外围新建 6 组浮动降温面板。' },
        { title: '协同自然降温', detail: '与深层冷水泵送系统同步。' },
        { title: '公众科普', detail: '打造可参观的“海面实验室”科普平台。' }
    ]
};

archiveIntel['bismarck-deep-mining-watch'] = {
    subtitle: '深海采矿透明监管节点',
    mission: '在俾斯麦海潜在采矿区布设声学、浊度与生态监测网，及时发现羽流与噪声侵扰。',
    focusMetrics: [
        { label: '羽流高度', value: '120 m', trend: 'GEOMAR 2026' },
        { label: '噪声警报', value: '145 dB', trend: 'PNG Ocean Office' },
        { label: '停工指令', value: '3 次', trend: 'Papua New Guinea CEPA' }
    ],
    news: [
        {
            title: '太平洋岛国论坛再次呼吁暂停深海采矿',
            source: 'Pacific Islands Forum',
            date: '2026-03-24',
            url: 'https://www.forumsec.org/latest-news/',
            excerpt: '要求在缺乏环境数据前实行暂停期。'
        },
        {
            title: 'PNG 环境保护署公布羽流监控数据',
            source: 'Conservation and Environment Protection Authority',
            date: '2026-02-08',
            url: 'https://www.cepa.gov.pg/',
            excerpt: '三次超过 NTU 阈值的记录均触发停工。'
        }
    ],
    resources: [
        { label: 'ISA Deep-Sea Mining Code', type: '法规', url: 'https://www.isa.org.jm/' },
        { label: 'GEOMAR Deep Sea Observatory', type: '数据', url: 'https://www.geomar.de/en' },
        { label: 'Pacific Deep Sea Watch', type: '实时地图', url: 'https://deepseaconservation.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['PNG CEPA', 'GEOMAR', 'Pacific Islands Forum'],
    timeline: [
        { date: '2024-05', title: '声学阵列安装', impact: '建立 48 台水下麦克风。' },
        { date: '2025-10', title: '公众仪表上线', impact: '实时展示羽流指数。' },
        { date: '2026-02', title: '首个停工令', impact: '采矿企业因噪声超标被迫暂停。' }
    ],
    actions: [
        { title: '扩大监测半径', detail: '与所罗门群岛共建跨界监测。' },
        { title: '生物基线扩充', detail: '采集更多底栖物种遗传信息。' },
        { title: '金融透明度', detail: '要求投资者使用公开 ESG 数据。' }
    ]
};

archiveIntel['arabian-seagrass-array'] = {
    subtitle: '高温海草实时碳汇阵列',
    mission: '布设光纤与水化学传感网络，监测波斯湾海草床在极端温度下的碳吸收效率。',
    focusMetrics: [
        { label: '传感节点', value: '620', trend: 'Seagrass Lab 2026' },
        { label: '蓝碳贡献', value: '2.4 t/ha·yr', trend: 'UNEP Blue Carbon' },
        { label: '数据延迟', value: '0.4 s', trend: 'FiberMesh Telemetry' }
    ],
    news: [
        {
            title: 'UNEP 发布波斯湾蓝碳白皮书',
            source: 'UNEP West Asia',
            date: '2026-03-15',
            url: 'https://www.unep.org/news-and-stories',
            excerpt: '肯定智能传感阵列对海草床保护的作用。'
        },
        {
            title: '阿布扎比环境署启动海草恢复一期',
            source: 'Environment Agency Abu Dhabi',
            date: '2026-02-06',
            url: 'https://www.ead.gov.ae/',
            excerpt: '将与蓝碳阵列共享数据，用于碳信用。'
        }
    ],
    resources: [
        { label: 'UNEP Blue Carbon Initiative', type: '知识库', url: 'https://www.thebluecarboninitiative.org/' },
        { label: 'EAD Seagrass Restoration', type: '项目页', url: 'https://www.ead.gov.ae/' },
        { label: 'GCC Marine Monitoring Network', type: '数据流', url: 'https://gccmaren.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80'
    ],
    partners: ['UNEP', 'EAD', 'GCC Marine Network'],
    timeline: [
        { date: '2024-08', title: '首批光纤布放', impact: '实现厘米级温度剖面。' },
        { date: '2025-12', title: 'AI 诊断模型', impact: '自动识别海草应激信号。' },
        { date: '2026-03', title: '碳信用挂钩', impact: '向开发商输出实时抵消指标。' }
    ],
    actions: [
        { title: '扩展沙漠沿海节点', detail: '覆盖阿布扎比至达曼 400km 海岸。' },
        { title: '海牛栖息地联动', detail: '用声学标签监控海牛与海草互动。' },
        { title: '产业对接', detail: '为新能源港口提供碳核算数据。' }
    ]
};

archiveIntel['patagonian-krill-observatory'] = {
    subtitle: '南大洋磷虾-鲸类联动雷达',
    mission: '整合声学幕墙、滑翔机与鲸类背负标签，绘制巴塔哥尼亚沿岸磷虾迁徙与鲸群觅食的同步图谱。',
    focusMetrics: [
        { label: '声学节点', value: '58', trend: 'CCAMLR 2026' },
        { label: '捕捞配额执行', value: '94%', trend: 'Argentina INIDEP' },
        { label: '海冰偏差', value: '-11%', trend: 'NSIDC' }
    ],
    news: [
        {
            title: 'CCAMLR 宣布 2026 年磷虾配额仍保持谨慎',
            source: 'Commission for the Conservation of Antarctic Marine Living Resources',
            date: '2026-03-29',
            url: 'https://www.ccamlr.org/en/news',
            excerpt: '强调实时观测对管理的重要性。'
        },
        {
            title: 'INIDEP 发布磷虾声学巡航报告',
            source: 'Instituto Nacional de Investigación y Desarrollo Pesquero',
            date: '2026-02-18',
            url: 'https://www.inidep.edu.ar/',
            excerpt: '指出南大洋北移海冰对孵化地的影响。'
        }
    ],
    resources: [
        { label: 'CCAMLR Krill Fishery Reports', type: '报告', url: 'https://www.ccamlr.org/' },
        { label: 'INIDEP Acoustic Survey Viewer', type: '数据', url: 'https://www.inidep.edu.ar/' },
        { label: 'NSIDC Antarctic Sea Ice', type: '数据集', url: 'https://nsidc.org/data/seaice_index' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1476611338391-6f395a0ebc8a?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['CCAMLR', 'INIDEP', 'NSIDC'],
    timeline: [
        { date: '2024-05', title: '滑翔机网络成型', impact: '覆盖 600km 海域。' },
        { date: '2025-09', title: '鲸类标签计划', impact: '20 头座头鲸加入定位实验。' },
        { date: '2026-02', title: '实时配额指令', impact: '捕捞船基于观测实时调整。' }
    ],
    actions: [
        { title: '强化数据公开', detail: '向公众发布周度磷虾密度图。' },
        { title: '跨国协同', detail: '与智利、英国共享巡航计划。' },
        { title: '气候适应策略', detail: '为磷虾加工产业提供多情景模拟。' }
    ]
};

archiveIntel['yellow-sea-ecoshield'] = {
    subtitle: '华东沿海绿潮前哨',
    mission: '通过 3D 荧光雷达、遥感卫星与无人机结合，提前 72 小时锁定黄海绿潮漂移路径并指导沿岸处置。',
    focusMetrics: [
        { label: '预测提前量', value: '72 h', trend: 'CMDS-IOCCG 模型' },
        { label: '覆盖海域', value: '260,000 km²', trend: '2026 扩容' },
        { label: '清理效率', value: '+38%', trend: '山东省海洋局' }
    ],
    news: [
        { title: '自然资源部发布 2026 黄海绿潮形势', source: '自然资源部北海局', date: '2026-03-22', url: 'https://www.mnr.gov.cn/', excerpt: '预计 2026 年绿潮总体强度中等，但在 6-7 月仍可能波动。' },
        { title: '中国海洋大学发布无人机-卫星融合算法', source: '中国海洋大学', date: '2026-02-10', url: 'https://www.ouc.edu.cn/', excerpt: '新算法可将漂移轨迹误差降至 5km 以内。' }
    ],
    resources: [
        { label: '黄海绿潮专题网站', type: '实时数据', url: 'http://greenalgae.mnr.gov.cn/' },
        { label: '中国海监 SAR 数据接口', type: '数据接口', url: 'http://www.nsoas.org.cn/' },
        { label: 'IOCCG 浮游生物遥感指南', type: '指南', url: 'https://ioccg.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80'
    ],
    partners: ['自然资源部北海局', '中国海洋大学', '山东省海洋局'],
    timeline: [
        { date: '2024-06', title: '机载激光雷达加入监测', impact: '夜间覆盖能力大幅提升。' },
        { date: '2025-08', title: '青岛漂移实验室上线', impact: '漂移模拟服务渔港调度。' },
        { date: '2026-03', title: '岸基无人机哨所建成', impact: '提供 30 分钟一次的局地图像。' }
    ],
    actions: [
        { title: '打捞窗口联动', detail: '根据模型输出给 6 大港口推送最佳打捞时段。' },
        { title: '旅游应急预案', detail: '与沿海城市共享可视化预警，指导沙滩开放。' },
        { title: '蓝碳利用', detail: '研究绿潮制生物炭的试点项目。' }
    ]
};

archiveIntel['bohai-energy-guardian'] = {
    subtitle: '渤海油气平台联防圈',
    mission: '构建 SAR 卫星、岸基雷达与无人机联合巡航体系，防范溢油、海冰与航道碰撞等复杂风险。',
    focusMetrics: [
        { label: '平台覆盖率', value: '211 座', trend: '2026 渤海湾统计' },
        { label: '溢油识别速度', value: '<30 分钟', trend: '北海分局' },
        { label: '冬季冰情预警', value: '6 次', trend: '2025-2026 冬季' }
    ],
    news: [
        { title: '国家海洋环境预报中心推送新一代溢油模型', source: '国家海洋环境预报中心', date: '2026-03-18', url: 'https://www.nmefc.cn/', excerpt: '模型可根据风浪预测溢油云团 48 小时后位置。' },
        { title: '天津港上线无人机海冰巡航', source: '天津港集团', date: '2026-01-25', url: 'https://www.ptacn.com/', excerpt: '实现航道实时冰厚监测。' }
    ],
    resources: [
        { label: '中国海事局 VTS 平台', type: '航运数据', url: 'https://www.msa.gov.cn/' },
        { label: '国家卫星海洋应用中心', type: 'SAR 数据', url: 'http://www.nsoas.org.cn/' },
        { label: 'IMO 溢油应急手册', type: '指南', url: 'https://www.imo.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80'
    ],
    partners: ['国家海事局', '天津港集团', '国家海洋预报中心'],
    timeline: [
        { date: '2024-12', title: '雷达-无人机协同演练', impact: '缩短溢油响应 40%。' },
        { date: '2025-07', title: '冬季海冰联合巡航', impact: '首次实现港口—平台一体化巡查。' },
        { date: '2026-02', title: '智能围油栏落地', impact: '自动封堵 3 起小规模溢油。' }
    ],
    actions: [
        { title: '能源基础设施体检', detail: '对 200+ 平台的阴极保护与管路进行 AI 分析。' },
        { title: '海冰应急联训', detail: '与北方港口共享破冰船资源。' },
        { title: '生态赔偿机制', detail: '将监测数据对接保险与政务平台。' }
    ]
};

archiveIntel['yangtze-estuary-carbon-corridor'] = {
    subtitle: '潮滩蓝碳实验枢纽',
    mission: '利用碳通量塔、泥滩剖面和水下滑翔机，描绘长江口泥滩—湿地—近岸海域的碳输运链路。',
    focusMetrics: [
        { label: '通量塔', value: '640 套', trend: '2026 数据' },
        { label: '蓝碳潜力', value: '3.1 Mt CO₂e/年', trend: '上海-江苏联合评估' },
        { label: '泥滩升沉', value: '±4 cm/季', trend: 'RTK 监测' }
    ],
    news: [
        { title: '上海发布《蓝碳交易试点方案》', source: '上海市生态环境局', date: '2026-03-05', url: 'https://sthj.sh.gov.cn/', excerpt: '将长江口潮滩纳入初步交易清单。' },
        { title: '自然通讯：泥滩碳存储模型', source: 'Nature Communications', date: '2026-01-30', url: 'https://www.nature.com/articles/', excerpt: '论文验证泥滩植被恢复可显著提升碳封存。' }
    ],
    resources: [
        { label: '长三角碳通量开放平台', type: '数据', url: 'https://carbon.yangtze.cn/' },
        { label: 'UNEP 蓝碳工具包', type: '指南', url: 'https://www.thebluecarboninitiative.org/' },
        { label: '东海海洋站泥滩监测报告', type: '报告', url: 'http://www.ecosystem.org.cn/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1496568816309-51d7c20e8748?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['上海市生态环境局', '江苏省自然资源厅', '同济大学'],
    timeline: [
        { date: '2024-09', title: '泥滩数字孪生上线', impact: '展示潮滩呼吸与碳通量。' },
        { date: '2025-12', title: '蓝碳信用实验', impact: '与企业签署抵消协议。' },
        { date: '2026-02', title: '多学科联合巡测', impact: '滑翔机+通量塔同步观测。' }
    ],
    actions: [
        { title: '潮滩植被恢复', detail: '在崇明东滩扩种海三棱藺。' },
        { title: '工业园碳抵消', detail: '将蓝碳指标对接临港区项目。' },
        { title: '公众教育', detail: '在南汇嘴公园构建蓝碳观测展厅。' }
    ]
};

archiveIntel['taihu-ai-basin'] = {
    subtitle: '长三角水安全中枢',
    mission: '通过 5 万个 IoT 节点、卫星遥感与数字孪生平台，预测与控制太湖蓝藻、保障饮用水源。',
    focusMetrics: [
        { label: '蓝藻预测准确率', value: '91%', trend: '2026 演练' },
        { label: 'IoT 节点', value: '50,000+', trend: '江苏省水利厅' },
        { label: '备用水源切换', value: '<30 分钟', trend: '无锡水务' }
    ],
    news: [
        { title: '江苏发布太湖数字孪生成果', source: '江苏省水利厅', date: '2026-03-28', url: 'http://jswater.jiangsu.gov.cn/', excerpt: '数字孪生平台支持蓝藻应急响应。' },
        { title: '无锡上线 AI 蓝藻预测 APP', source: '无锡市大数据局', date: '2026-02-18', url: 'http://bigdata.wuxi.gov.cn/', excerpt: '公众可查询各水厂实时水质。' }
    ],
    resources: [
        { label: '太湖蓝藻监测网', type: '实时地图', url: 'http://www.thhb.gov.cn/' },
        { label: '水利部数字孪生试点', type: '政策', url: 'https://www.mwr.gov.cn/' },
        { label: 'Copernicus 水色产品', type: '遥感数据', url: 'https://marine.copernicus.eu/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1470246973918-29a93221c455?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['江苏省水利厅', '无锡市水务集团', '中国科学院南京地理所'],
    timeline: [
        { date: '2024-05', title: '无人船巡检投入使用', impact: '实现无人化采样。' },
        { date: '2025-08', title: '湖区数字孪生 1.0', impact: '上线水量水质一体分析。' },
        { date: '2026-03', title: '供水应急演练', impact: '检验 30 分钟内切换水源能力。' }
    ],
    actions: [
        { title: '蓝藻拦截调度', detail: '依据预测自动布设围隔面。' },
        { title: '饮用水保障', detail: '推送取水口在线水质与风险等级。' },
        { title: '公众共治', detail: '开放 API 支撑社会组织参与监测。' }
    ]
};

archiveIntel['poyang-lake-flyway'] = {
    subtitle: '候鸟与水文协奏曲',
    mission: '联合迁徙数据与水位、泥滩、草甸状态，确保鄱阳湖越冬候鸟与补水调度双赢。',
    focusMetrics: [
        { label: '候鸟数量', value: '600,000', trend: '江西林业 2026' },
        { label: '智慧补水', value: '14 次/年', trend: '水利厅' },
        { label: '滩涂可用性', value: '+15%', trend: '观测结果' }
    ],
    news: [
        { title: '江西公布候鸟迁徙大数据', source: '江西省林业局', date: '2026-03-12', url: 'http://ly.jiangxi.gov.cn/', excerpt: '共享 800 只候鸟 GPS 数据。' },
        { title: '水利部批准鄱阳湖生态补水方案', source: '水利部', date: '2026-02-08', url: 'https://www.mwr.gov.cn/', excerpt: '正式纳入长江调水计划。' }
    ],
    resources: [
        { label: '鄱阳湖国家级自然保护区', type: '信息平台', url: 'http://www.poyang.org.cn/' },
        { label: 'CNGBird 迁徙数据库', type: '数据', url: 'https://www.cngbird.net/' },
        { label: 'Ramsar 湿地工具包', type: '指南', url: 'https://www.ramsar.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['江西省林业局', '水利部', '世界自然基金会'],
    timeline: [
        { date: '2024-11', title: '候鸟 GPS 计划扩容', impact: '覆盖 20 个物种。' },
        { date: '2025-09', title: '智慧补水首次实施', impact: '快速恢复栖息地。' },
        { date: '2026-01', title: '社区巡护 APP 上线', impact: '村民可上传盗猎线索。' }
    ],
    actions: [
        { title: '分区补水', detail: '在低水位季节精准调控滩涂水深。' },
        { title: '渔业协同', detail: '使用电子围栏保护鸟类觅食区。' },
        { title: '湿地恢复基金', detail: '吸引企业认领滩涂修复。' }
    ]
};

archiveIntel['dongting-flood-buffer'] = {
    subtitle: '洞庭—长江洪水数字孪生',
    mission: '利用 3D 地形、支流水位与雨量雷达，模拟洪水情景并联调蓄滞洪区、三峡出库及沿岸撤离。',
    focusMetrics: [
        { label: '洪峰削减', value: '30%', trend: '2025 实战演练' },
        { label: '情景库', value: '480 套', trend: '数字孪生 2.0' },
        { label: '蓄滞区联调', value: '16 处', trend: '湖南水利厅' }
    ],
    news: [
        { title: '湖南启动洞庭湖数字孪生 2.0', source: '湖南省水利厅', date: '2026-03-15', url: 'http://slt.hunan.gov.cn/', excerpt: '新增 AI 调度助手和人员撤离模块。' },
        { title: '三峡集团公布联调成果', source: '中国长江电力', date: '2026-01-26', url: 'https://www.ctg.com.cn/', excerpt: '与洞庭湖协同，成功削减中游洪峰。' }
    ],
    resources: [
        { label: '长江委水情发布', type: '数据', url: 'http://www.cjw.gov.cn/' },
        { label: 'FloodHub 洪灾开放平台', type: '可视化', url: 'https://www.floodhub.com/' },
        { label: 'UNDRR 洪水风险指南', type: '指南', url: 'https://www.undrr.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80',
        'https://images.unsplash.com/photo-1476611338391-6f395a0ebc8a?w=900&q=80'
    ],
    partners: ['长江水利委员会', '湖南省水利厅', '三峡集团'],
    timeline: [
        { date: '2024-07', title: '首场数字孪生演练', impact: '检验多部门协同。' },
        { date: '2025-06', title: '实时 3D 可视化上线', impact: '公众可查看洪水路径。' },
        { date: '2026-02', title: '社区撤离模拟', impact: '25 万居民参与演练。' }
    ],
    actions: [
        { title: '智能闸门', detail: '按照孪生输出自动调整闸门开度。' },
        { title: '生态补偿', detail: '对蓄滞区居民发放数字补偿。' },
        { title: '跨区域数据共享', detail: '与荆江河段、鄱阳湖互通水情。' }
    ]
};

archiveIntel['qinghai-lake-cryosphere'] = {
    subtitle: '青藏高原水气枢纽',
    mission: '监测青海湖水量、盐度、蒸发与冰雪融水，评估“亚洲水塔”补给能力。',
    focusMetrics: [
        { label: '蒸散塔', value: '42', trend: '“一江两河”项目' },
        { label: '湖面面积', value: '4,625 km²', trend: '2026 遥感' },
        { label: '冰期长度', value: '160 天', trend: '青海省气象局' }
    ],
    news: [
        { title: '中国气象局发布高原冰冻圈观测计划', source: '中国气象局', date: '2026-02-19', url: 'http://www.cma.gov.cn/', excerpt: '青海湖是重点站点。' },
        { title: '青海湖生态保护条例修订', source: '青海省人大', date: '2026-03-01', url: 'http://www.qhnews.com/', excerpt: '强化对旅游与渔业的生态红线。' }
    ],
    resources: [
        { label: '青海湖生态监测中心', type: '数据', url: 'http://www.qhh.gov.cn/' },
        { label: 'NASA High Mountain Asia', type: '遥感数据', url: 'https://appliedsciences.nasa.gov/' },
        { label: 'ICIMOD Cryosphere Portal', type: '数据集', url: 'https://www.icimod.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['青海省生态环境厅', '中国气象局', 'ICIMOD'],
    timeline: [
        { date: '2024-10', title: '蒸散塔网络建成', impact: '实现湖区全覆盖。' },
        { date: '2025-12', title: '冰雷达系统升级', impact: '冰厚数据分辨率提高。' },
        { date: '2026-01', title: '亚洲水塔联合发布', impact: '共同评估上游来水。' }
    ],
    actions: [
        { title: '生态水位红线', detail: '保持关键季节 3194m 以上水位。' },
        { title: '候鸟栖息保护', detail: '协调旅游与候鸟停歇需求。' },
        { title: '数据开放', detail: '与下游黄河省份共享实时数据。' }
    ]
};

archiveIntel['dianchi-regenerative-grid'] = {
    subtitle: '高原湖泊再生水实验',
    mission: '利用再生水廊道、人工湿地与浮动生物膜，构建滇池入湖污染物闭环控制体系。',
    focusMetrics: [
        { label: '再生水回用', value: '5.2 亿 m³/年', trend: '昆明市水务局' },
        { label: '总磷削减', value: '18%', trend: '2025-2026 数据' },
        { label: '湿地面积', value: '26 km²', trend: '昆明滇管局' }
    ],
    news: [
        { title: '昆明发布滇池再生水示范区', source: '昆明市人民政府', date: '2026-03-09', url: 'http://www.km.gov.cn/', excerpt: '首批 24 条再生水廊道运行。' },
        { title: '世界银行继续支持滇池治理', source: 'World Bank', date: '2026-01-17', url: 'https://www.worldbank.org/', excerpt: '新增 2 亿美元贷款用于湿地恢复。' }
    ],
    resources: [
        { label: '滇池管理局公开平台', type: '数据', url: 'http://www.dianchi.gov.cn/' },
        { label: '世界银行滇池流域项目', type: '报告', url: 'https://documents.worldbank.org/' },
        { label: 'UNEP 再生水实践', type: '案例', url: 'https://www.unep.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80',
        'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=900&q=80'
    ],
    partners: ['昆明市水务局', '滇池管理局', '世界银行'],
    timeline: [
        { date: '2024-08', title: '浮动湿地上线', impact: '入湖总氮降低。' },
        { date: '2025-10', title: '智慧管网接入', impact: '实时调控再生水流向。' },
        { date: '2026-02', title: '社区共治平台', impact: '居民可打卡监测点。' }
    ],
    actions: [
        { title: '污水源头控制', detail: '对 68 家企业实施在线监控。' },
        { title: '湿地多级净化', detail: '堤外湿地+藻类反应器组合。' },
        { title: '再生水利用', detail: '供应城市绿化与工业冷却。' }
    ]
};

archiveIntel['xisha-coral-sentinel'] = {
    subtitle: '南海珊瑚热浪哨所',
    mission: '融合热成像卫星、潜航器与声学浮标，实时评估西沙海域珊瑚健康度与热浪冲击。',
    focusMetrics: [
        { label: '监测岛礁', value: '42 处', trend: '2026 观测' },
        { label: '白化预警误报', value: '-20%', trend: 'AI 模型' },
        { label: '珊瑚覆盖', value: '62%', trend: '南海站巡测' }
    ],
    news: [
        { title: '中国科学院发布南海珊瑚热浪报告', source: '中科院南海海洋所', date: '2026-03-18', url: 'http://www.scsio.ac.cn/', excerpt: '结合地面与卫星观测分析热浪。' },
        { title: 'UNESCO 发布全球珊瑚恢复案例', source: 'UNESCO-IOC', date: '2026-02-08', url: 'https://ioc.unesco.org/', excerpt: '西沙哨兵系统被列为示范。' }
    ],
    resources: [
        { label: '南海海洋环境预报网', type: '数据', url: 'http://www.scsio.ac.cn/ocean/' },
        { label: 'GCRMN 珊瑚监测网络', type: '报告', url: 'https://gcrmn.net/' },
        { label: 'Allen Coral Atlas', type: '地图', url: 'https://allencoralatlas.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['中科院南海所', '自然资源部第三海洋所', 'UNESCO-IOC'],
    timeline: [
        { date: '2024-04', title: '潜航器团队常态化', impact: '提供 4K 近景影像。' },
        { date: '2025-09', title: '热浪 AI 预判上线', impact: '提前 14 天发布风险。' },
        { date: '2026-02', title: '声学浮标扩容', impact: '追踪鱼群栖息情况。' }
    ],
    actions: [
        { title: '珊瑚苗圃扩展', detail: '在琛航岛等地培育耐热珊瑚。' },
        { title: '禁捕区协同', detail: '结合海警巡航保护脆弱礁区。' },
        { title: '公众可视化', detail: '开放 VR 实况吸引科普。' }
    ]
};

archiveIntel['pearl-river-saline-guard'] = {
    subtitle: '粤港澳水源防线',
    mission: '对珠江口多闸群、取水口与淡化厂实施协同调度，保障枯水季饮用水安全。',
    focusMetrics: [
        { label: '取水保障率', value: '99.3%', trend: '2025 枯水季' },
        { label: '淡化产能', value: '75 万 m³/日', trend: '深汕等地' },
        { label: '闸门联动', value: '12 座', trend: '粤港协作' }
    ],
    news: [
        { title: '广东省印发咸潮联防方案', source: '广东省水利厅', date: '2026-02-16', url: 'http://slt.gd.gov.cn/', excerpt: '明确东西两翼闸门调度原则。' },
        { title: '深圳东部供水工程扩建', source: '深圳市水务局', date: '2026-03-03', url: 'http://swj.sz.gov.cn/', excerpt: '淡化+应急调水体系升级。' }
    ],
    resources: [
        { label: '珠江水利委员会水情', type: '数据', url: 'http://www.pearlwater.gov.cn/' },
        { label: '香港水务署取水信息', type: '公开数据', url: 'https://www.wsd.gov.hk/' },
        { label: '联合国城市供水指南', type: '指南', url: 'https://www.unwater.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1455218873509-8097305ee378?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['广东省水利厅', '香港水务署', '深圳市水务局'],
    timeline: [
        { date: '2024-12', title: '闸门一体化调度平台', impact: '实现粤港澳实时互通。' },
        { date: '2025-11', title: '淡化厂扩容', impact: '缓解枯水期缺口。' },
        { date: '2026-01', title: '跨境演练', impact: '联合发布居民用水提醒。' }
    ],
    actions: [
        { title: '取水口守护', detail: '布设自动化护堤与混合取水。' },
        { title: '智慧闸群', detail: '依据潮位及时阻断咸潮。' },
        { title: '居民提示', detail: '通过小程序推送云淡化供水情况。' }
    ]
};

archiveIntel['songhua-icewatch'] = {
    subtitle: '东北凌汛安全网',
    mission: '使用雷达高度计、无人机与 GNSS 冰浮标监测松花江凌汛，服务航运、电厂与沿岸居民。',
    focusMetrics: [
        { label: '凌汛预测准确率', value: '88%', trend: '黑龙江省水文局' },
        { label: '破冰船', value: '9 艘', trend: '哈尔滨航道局' },
        { label: '预警提前量', value: '2 h', trend: '2026 春汛' }
    ],
    news: [
        { title: '黑龙江完成 2026 年凌汛应急演练', source: '黑龙江省水文水资源中心', date: '2026-03-05', url: 'http://www.hlsw.org.cn/', excerpt: '多部门联合破冰巡航。' },
        { title: '国家能源集团升级松花江沿岸电厂护堤', source: '国家能源集团', date: '2026-01-12', url: 'https://www.ceic.com.cn/', excerpt: '护堤监测纳入冰情数据。' }
    ],
    resources: [
        { label: '黑龙江水文在线', type: '数据', url: 'http://www.hljwater.gov.cn/' },
        { label: '中国气象局寒潮监测', type: '产品', url: 'http://www.nmc.cn/' },
        { label: 'WMO 冰雪手册', type: '指南', url: 'https://public.wmo.int/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1482192597420-4817fdd7e8b0?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['黑龙江水文局', '哈尔滨航道局', '国家能源集团'],
    timeline: [
        { date: '2024-12', title: 'GNSS 浮标投放', impact: '实时掌握冰速。' },
        { date: '2025-11', title: '无人机巡护常态化', impact: '提升危险河段识别。' },
        { date: '2026-02', title: '破冰-电力协同', impact: '保障沿岸电厂进水。' }
    ],
    actions: [
        { title: '高危河段巡查', detail: '重点关注哈尔滨至佳木斯。' },
        { title: '居民疏散提醒', detail: '对滩涂村庄推送短信。' },
        { title: '航运调度', detail: '破冰船与货运联合排班。' }
    ]
};

archiveIntel['ross-sea-guardian'] = {
    subtitle: '南极最大海洋保护区守望',
    mission: '用卫星、浮标和自动潜航器监控罗斯海 MPA 内的生态指标与非法捕捞活动。',
    focusMetrics: [
        { label: '监测面积', value: '1.55 M km²', trend: 'CCAMLR 统计' },
        { label: '巡航频次', value: '4 次/年', trend: '意大利-新西兰合作' },
        { label: '违规船只', value: '0', trend: '2025-2026' }
    ],
    news: [
        { title: 'CCAMLR 发布罗斯海监测报告', source: 'CCAMLR', date: '2026-03-21', url: 'https://www.ccamlr.org/' , excerpt: '确认保护区内生态指标良好。' },
        { title: '意大利“普里奥拉”站升级观测设备', source: 'Italian PNRA', date: '2026-02-02', url: 'https://www.pnra.aq/', excerpt: '新增水下滑翔机和浮标。' }
    ],
    resources: [
        { label: 'CCAMLR Data Portal', type: '数据', url: 'https://www.ccamlr.org/en/data/data' },
        { label: 'NASA Earthdata Polar Watch', type: '遥感', url: 'https://earthdata.nasa.gov/' },
        { label: 'Polar Code 环境指南', type: '法规', url: 'https://www.imo.org/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1459478309853-2c33a60058e7?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['CCAMLR', '新西兰南极局', '意大利 PNRA'],
    timeline: [
        { date: '2024-11', title: '浮标网更新', impact: '数据延迟缩短 40%。' },
        { date: '2025-10', title: '自动潜航器项目', impact: '覆盖更深水域。' },
        { date: '2026-01', title: '卫星监测协定', impact: '共享 Sentinel-1 数据。' }
    ],
    actions: [
        { title: '对非法捕捞零容忍', detail: '实时推送船舶 AIS 异常。' },
        { title: '生态指标共享', detail: '向全球科研机构开放数据。' },
        { title: '气候反馈研究', detail: '评估海冰变化对生态影响。' }
    ]
};

archiveIntel['norwegian-fjord-carbon-lab'] = {
    subtitle: '北欧蓝碳实验田',
    mission: '在挪威峡湾测试海草、海带与贻贝混种的碳汇能力，并评估对沿海社区的经济价值。',
    focusMetrics: [
        { label: '年固碳', value: '12 t/ha', trend: 'NTNU Marine' },
        { label: '传感模块', value: '220', trend: 'FiberMesh Telemetry' },
        { label: '渔民参与', value: '56 艘', trend: 'Trøndelag County' }
    ],
    news: [
        { title: '挪威公布蓝碳信用试点', source: 'Norwegian Environment Agency', date: '2026-03-14', url: 'https://www.miljodirektoratet.no/', excerpt: '峡湾实验室入选试点。' },
        { title: 'NTNU 发表蓝碳多营养层培养研究', source: 'Norwegian University of Science and Technology', date: '2026-02-05', url: 'https://www.ntnu.edu/', excerpt: '证明海草+贻贝可提升固碳效率。' }
    ],
    resources: [
        { label: 'Arctic Blue Carbon Lab', type: '项目页', url: 'https://www.arcticbluecarbon.org/' },
        { label: 'EU Mission Ocean', type: '资金', url: 'https://research-and-innovation.ec.europa.eu/' },
        { label: 'NOAA Kelp Carbon Toolkit', type: '工具', url: 'https://oceanservice.noaa.gov/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1476611338391-6f395a0ebc8a?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['NTNU', '挪威环境署', 'Trøndelag 县政府'],
    timeline: [
        { date: '2024-05', title: '第一批混种架投放', impact: '形成 3D 生态农场。' },
        { date: '2025-09', title: '社区合作社成立', impact: '渔民共享收益。' },
        { date: '2026-01', title: '蓝碳信用上链', impact: '引入企业购买。' }
    ],
    actions: [
        { title: '扩展至北极圈', detail: '评估更冷水体的适应性。' },
        { title: '多营养层监测', detail: '同步观测溶氧、pH 与 DOC。' },
        { title: '教育与旅游', detail: '打造蓝碳体验中心。' }
    ]
};

archiveIntel['hudson-bay-freshwater'] = {
    subtitle: '北极淡水脉冲哨所',
    mission: '监测永久冻土融化带来的淡水和 DOC 输入，评估哈德逊湾分层和碳循环变化。',
    focusMetrics: [
        { label: '淡水输入', value: '900 km³/年', trend: 'Environment and Climate Change Canada' },
        { label: 'DOC 增幅', value: '+18%', trend: '2025-2026 比较' },
        { label: '表层盐度', value: '28‰', trend: 'ArcticNet' }
    ],
    news: [
        { title: 'ECCC 报告哈德逊湾甲烷增量', source: 'Environment and Climate Change Canada', date: '2026-03-19', url: 'https://www.canada.ca/en/environment-climate-change.html', excerpt: '指出 DOC 上升导致甲烷通量增加。' },
        { title: 'Inuit 社区参与淡水监测', source: 'ArcticNet', date: '2026-02-11', url: 'https://arcticnet.ulaval.ca/', excerpt: '本地监测站提供数据共享。' }
    ],
    resources: [
        { label: 'ArcticNet Data', type: '平台', url: 'https://simea.arcticnet.ulaval.ca/' },
        { label: 'Copernicus Polar Regions', type: '遥感', url: 'https://polarview.org/' },
        { label: 'NOAA Freshwater Flux Project', type: '研究', url: 'https://www.aoml.noaa.gov/phod/freshwater_flux/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['Environment Canada', 'ArcticNet', 'Inuit Tapiriit Kanatami'],
    timeline: [
        { date: '2024-03', title: '淡水浮标投放', impact: '持续记录温盐。' },
        { date: '2025-10', title: '社区实验室启用', impact: 'Inuit 青年参与分析。' },
        { date: '2026-02', title: '甲烷航测', impact: '首次完成全湾航程。' }
    ],
    actions: [
        { title: '分层模型升级', detail: '纳入 DOC、营养盐与海冰参数。' },
        { title: '社区监测', detail: '培训猎人记录冰情。' },
        { title: '国际合作', detail: '与格陵兰、俄罗斯共享数据。' }
    ]
};

archiveIntel['caspian-salinity-gate'] = {
    subtitle: '里海水位与盐度调控',
    mission: '跨国监测里海水位下降与盐度变化，评估港口、湿地与渔业风险。',
    focusMetrics: [
        { label: '水位下降', value: '-7 cm/年', trend: '2026 测线' },
        { label: '蒸发损失', value: '1 m/年', trend: 'Kazhydromet' },
        { label: '补水计划', value: '3 条河流', trend: '跨国协定' }
    ],
    news: [
        { title: '里海沿岸五国签署水位监测共享协议', source: 'Caspian Sea Commission', date: '2026-03-01', url: 'https://www.caspiancommission.org/', excerpt: '共享水位、蒸发与河流流量数据。' },
        { title: '世界银行评估里海港口适应性', source: 'World Bank', date: '2026-02-07', url: 'https://www.worldbank.org/', excerpt: '提出港口改造资金方案。' }
    ],
    resources: [
        { label: 'Kazhydromet Lake Monitoring', type: '数据', url: 'https://www.kazhydromet.kz/' },
        { label: 'Azerbaijan Caspian Portal', type: '信息', url: 'https://www.caspian.az/' },
        { label: 'UNESCO Water Level Toolkit', type: '指南', url: 'https://iwhw.boku.ac.at/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['Caspian Sea Commission', 'World Bank', 'Kazhydromet'],
    timeline: [
        { date: '2024-09', title: 'GNSS 水位网建成', impact: '提升测量精度。' },
        { date: '2025-11', title: '蒸发塔扩容', impact: '量化蒸发通量。' },
        { date: '2026-02', title: '港口适应性规划', impact: '9 个港口拟搬迁或加深航道。' }
    ],
    actions: [
        { title: '生态补水', detail: '研究伏尔加河调水量。' },
        { title: '湿地修复', detail: '保护北部湿地免于干涸。' },
        { title: '渔业适应', detail: '调整鲟鱼孵化与放流计划。' }
    ]
};

archiveIntel['lake-victoria-nutrient-net'] = {
    subtitle: '东非最大淡水湖协同治理',
    mission: '整合三国水质站、遥感与渔业数据，实施营养盐总量控制与分区禁捕。',
    focusMetrics: [
        { label: '营养盐削减目标', value: '-20%', trend: 'LVBC 规划' },
        { label: '透明度', value: '0.7 m', trend: '2025 监测' },
        { label: '湿地修复', value: '32 km²', trend: '2026 项目' }
    ],
    news: [
        { title: '维多利亚湖流域委员会启动“净湖 2030”', source: 'Lake Victoria Basin Commission', date: '2026-03-04', url: 'https://www.lvbcom.org/', excerpt: '三国共担治理目标。' },
        { title: '世界粮农组织协助制定渔业动态配额', source: 'FAO', date: '2026-02-12', url: 'https://www.fao.org/', excerpt: '保护尼罗罗非鱼资源。' }
    ],
    resources: [
        { label: 'LVBC Data Portal', type: '数据', url: 'https://database.lvbcom.org/' },
        { label: 'NASA SERVIR-East Africa', type: '遥感', url: 'https://servirglobal.net/' },
        { label: 'FAO SmartFish', type: '项目', url: 'https://www.fao.org/in-action/smartfish/en/' }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'
    ],
    partners: ['LVBC', 'FAO', 'UNEP'],
    timeline: [
        { date: '2024-06', title: '营养盐总量控制协议', impact: '三国签署约束目标。' },
        { date: '2025-09', title: '智慧渔获日志', impact: '船只上传实时渔获。' },
        { date: '2026-02', title: '湿地修复基金', impact: '企业参与碳信用。' }
    ],
    actions: [
        { title: '城市污水治理', detail: '在坎帕拉、基苏木建设再生水厂。' },
        { title: '分区禁捕', detail: '根据遥感数据划定禁捕区。' },
        { title: '社区教育', detail: '培训渔民识别蓝藻风险。' }
    ]
};


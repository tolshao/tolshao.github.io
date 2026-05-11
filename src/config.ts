export default {
  // 网站标题
  Title: 'Tolshao',
  // 网站地址
  Site: 'https://blog.tolshao.xyz',
  // 网站副标题
  Subtitle: '探物及理',
  // 网站描述
  Description: 'BUAA | 张小跳 - 记录学习与生活的技术博客',
  // 网站作者
  Author: 'Tolshao',
  // 作者头像
  Avatar: '/assets/images/avatar.png',
  // 网站座右铭
  Motto: '探物及理',
  // Cover 网站缩略图
  Cover: '/assets/images/banner/default-cover.webp',
  // 网站侧边栏公告 (不填写即不开启)
  Tips: '',
  // 首页打字机文案列表
  TypeWriteList: [
    '探物及理',
    'Explore the world, understand the principles.',
  ],
  // 网站创建时间
  CreateTime: '2016-09-01',
  // 顶部 Banner 配置
  HomeBanner: {
    enable: true,
    // 首页高度
    HomeHeight: '38.88rem',
    // 其他页面高度
    PageHeight: '28.88rem',
    // 背景 - 使用内置默认
    background: '',
  },
  // 博客主题配置
  Theme: {
    // 颜色请用 16 进制颜色码
    // 主题颜色
    "--vh-main-color": "#01C4B6",
    // 字体颜色
    "--vh-font-color": "#34495e",
    // 侧边栏宽度
    "--vh-aside-width": "318px",
    // 全局圆角
    "--vh-main-radius": "0.88rem",
    // 主体内容宽度
    "--vh-main-max-width": "1458px",
  },
  // 导航栏 (新窗口打开 newWindow: true)
  Navs: [
    { text: '朋友', link: '/links', icon: 'Nav_friends' },
    { text: '圈子', link: '/friends', icon: 'Nav_rss' },
    { text: '动态', link: '/talking', icon: 'Nav_talking' },
    { text: '昔日', link: '/archives', icon: 'Nav_archives' },
    { text: '留言', link: '/message', icon: 'Nav_message' },
    { text: '关于', link: '/about', icon: 'Nav_about' },
  ],
  // 侧边栏个人网站
  WebSites: [
    { text: 'Github', link: 'https://github.com/tolshao', icon: 'WebSite_github' },
    { text: '微信公众号', link: 'http://mp.weixin.qq.com/profile?src=3&timestamp=1596602759&ver=1&signature=6jJFqT92IqiLn64LDjUv4K3MpbEd6S6GQb*1ZIk*vhU59KXh*zFvqI1RAcDsQV0NiKibhaInaAJPHHRP-A9zxw==', icon: 'WebSite_link' },
  ],
  // 侧边栏展示
  AsideShow: {
    // 是否展示个人网站
    WebSitesShow: true,
    // 是否展示分类
    CategoriesShow: true,
    // 是否展示个人标签
    TagsShow: true,
    // 是否展示推荐文章
    recommendArticleShow: true
  },
  // DNS预解析地址
  DNSOptimization: [
    'https://i0.wp.com',
    'https://cn.cravatar.com',
    'https://pagead2.googlesyndication.com'
  ],
  // 博客音乐组件解析接口
  vhMusicApi: 'https://vh-api.4ce.cn/blog/meting',
  // 评论组件（只允许同时开启一个）
  Comment: {
    // Twikoo 评论
    Twikoo: {
      enable: true,
      envId: 'https://cmt.tolshao.xyz/'
    },
    // Waline 评论
    Waline: {
      enable: false,
      serverURL: ''
    }
  },
  // Han Analytics 统计
  HanAnalytics: { enable: false, server: '', siteId: '' },
  // Google 广告
  GoogleAds: {
    ad_Client: '',
    asideAD_Slot: '',
    articleAD_Slot: ''
  },
  // 文章内赞赏码
  Reward: {
    AliPay: '',
    WeChat: ''
  },
  // 访问网页 自动推送到搜索引擎
  SeoPush: {
    enable: false,
    serverApi: '',
    paramsName: 'url'
  },
  // 页面阻尼滚动速度
  ScrollSpeed: 666
}

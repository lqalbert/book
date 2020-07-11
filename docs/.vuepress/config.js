module.exports = {
  title: '贪狼武曲',
  description: '建站指南',
  dest: './dist',
  port: '7777',
  head: [
    ['link', {
      rel: 'icon',
      href: '/cat.jpg'
    }]
  ],
  markdown: {
    lineNumbers: true
  },
  extraWatchFiles: ['docs'],
  themeConfig: {
    nav: require('./nav'),
    sidebar: require('./sidebar'),
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    searchMaxSuggestoins: 10,
    serviceWorker: {
      updatePopup: {
        message: "有新的内容.",
        buttonText: '更新'
      }
    },
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页 ！'
  }
}
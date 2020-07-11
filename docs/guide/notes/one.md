# vuePress博客搭建指南
## 安装初始化
* 全局安装
```
$ npm install -g vuepress
```
* 创建个文件夹作为目录
```
$ mkdir book
# 该目录作为整本书的项目目录
```
* 项目初始化
```
$ cd vuepress-blog
$ npm init -y
```
初始化后会生成一个`package.json`文件
* 在当前目录中创建一个`docs`目录
```
$ mkdir docs
# 主要存放博客书籍内容
```
* 首页内容书写(默认主题提供)
```
---
home: true
heroImage: /logo.jpg
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```
## 核心配置
* 在`docs`目录下创建`.vuepress`目录
```
$ cd docs
$ mkdir .vuepress
# 主要存放配置
```
* 新建总配置文件config.js
```
$ cd .vuepress
$ touch config.js
# config是整个项目的核心配置文件，所有菜单、栏目相关的配置均配置在该模块中
```
* 在`config.js`中加入内容
```
module.exports = {
    title: '贪狼武曲',
    description: '贪狼武曲',
    dest: './dist',
    port: '7777',
    head: [
      ['link', {rel: 'icon', href: '/logo.jpg'}]
    ],
    markdown: {
      lineNumbers: true
    },
    themeConfig: {
      nav: [{
        text: '建站指南', link: '/guide/'
      }],
      sidebar: {'/guide/':[{
          title:'新手指南',
          collapsable: true,
          children:[
            '/guide/notes/one',
          ]
        }]
      },
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
```
上述配置中`themeConfig`处有2个关键配置，`nav`和`sidebar`，我们后续单独讲解
* 运行
```
vuepress dev docs
```
## 导航栏配置
* `nav`是顶部栏目导航
<div style="margin: 1em"><img :src="$withBase('/nav.png')" alt="nav图片"></div>
接下来我们在当前目录创建一个`nav.js`
```
$ touch nav.js
# 因为config.js中引入了nav，所以我们要提供一个来存放栏目
```
* 编辑`nav.js`
```
module.exports = [{
    text: '建站指南', link: '/guide/'
  }, {
    text: '面试宝典', link: '/interview/',
    items: [
      {text: '初级开发篇', link: '/interview/primary/'},
      {text: '中高进阶篇', link: '/interview/advanced/'}
    ]
  }, {
    text: '工具箱',
    items: [{
      text: '在线编辑',
      items: [
        {text: '图片压缩', link: 'https://tinypng.com/'}
      ]
    }, {
      text: '在线服务',
      items: [
        {text: '阿里云', link: 'https://www.aliyun.com/'},
        {text: '腾讯云', link: 'https://cloud.tencent.com/'}
      ]
    }, {
      text: '博客指南',
      items: [
        {text: '掘金', link: 'https://juejin.im/'},
        {text: 'CSDN', link: 'https://blog.csdn.net/'}
      ]
    }]
  }
]
```
* nav配置注意点
1. `nav`可以支持本地目录和链接
2. `nav`由text、link、items组成
    - text：栏目名（项名）
    - link：链接，可以指向本地目录和http地址
    - items：可以包含多个text和link，可以继续反复套用组成复杂的菜单
3. `nav`配置时需要与本地的目录对应
    - 如上述我配置了建站指南和面试宝典栏目
    - 建站指南：对应的是/guide/，则我需要再docs目录下创建一个guide目录
    - 面试宝典：对应的是/interview/，则我需要在docs目录下创建一个interview目录
    - interview子目录：上述配置中interview下有2个子目录，则我需要在下面新建2个子目录与之对应
## 侧边栏配置
<div style="margin: 1em"><img :src="$withBase('/sidebar.png')" alt="nav图片"></div>

* `sidebar`配置语法

```
module.exports = {
	'/guide/': require('../guide/sidebar'),
	'/interview/junior': require('../interview/junior/sidebar'),
	'/interview/advanced': require('../interview/advanced/sidebar')
}
```
这里我贴出目录：`/docs/guide/sidebar.js`文件内容
```
module.exports = [
  {
    title: '博客搭建',
    collapsable: true,
    children: [
      '/guide/notes/one',
    ]
  }
]
```
+ 参数解析
    - `title`：表示侧边栏大标题
    - `collapsable`：是否可收缩
    - `children`：具体的.md文件，这里无需指定后缀
## 静态资源配置
静态资源是最重要的一部分，比如图片，比如`js`，比如`css`  
  
vuepress程序默认的图片目录是`/docs/.vuepress/public`  
  
如果你的网站会被部署到一个**非根路径**，你将需要在 `.vuepress/config.js` 中设置 `base`，举例来说，如果你打算将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 的值就应该被设置为 `"/bar/"` (应当总是以斜杠开始，并以斜杠结束)。  
  
有了基础路径（Base URL），如果你希望引用一张放在 `.vuepress/public` 中的图片，你需要使用这样路径：`/bar/image.png`，然而，一旦某一天你决定去修改 base，这样的路径引用将会显得异常脆弱。为了解决这个问题，VuePress 提供了内置的一个 helper `$withBase`（它被注入到了 Vue 的原型上），可以帮助你生成正确的路径：
```
<img :src="$withBase('/logo.png')" alt="foo">
```
最后补充一句，一个 `base` 路径一旦被设置，它将会自动地作为前缀插入到 `.vuepress/config.js` 中所有以 `/` 开始的资源路径中。
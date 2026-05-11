---
title: "hexo 进阶设置指南（持续更新）"
date: "2020-08-12"
categories: "博客"
tags: ["Hexo", "Blog"]
id: "6809"
cover: "/img/blogyourlife.jpg"
top: false
---

# 让hexo渲染MathJax复杂公式(默认的渲染引擎复杂公式会报错)

## Problem
对复杂公式的支持不够好，简单公式可以显示，复杂编译错误，验证表明，问题不是mathjax.js导致，是默认hexo引擎编译导致html文本转义错误。
![-w192](/img/15972822338745.jpg)
![-w894](/img/15972822421519.jpg)

### Reason
Hexo默认使用"hexo-renderer-marked"引擎渲染网页，该引擎会把一些特殊的markdown符号转换为相应的html标签，比如在markdown语法中，下划线'_'代表斜体，会被渲染引擎处理为`<em>`标签

因为类Latex格式书写的数学公式下划线 '_' 表示下标，有特殊的含义，如果被强制转换为`<em>`标签，那么MathJax引擎在渲染数学公式的时候就会出错。例如，`x_i`在开始被渲染的时候，处理为`x<em>i</em>`，这样MathJax引擎就认为该公式有语法错误，因为不会渲染。

类似的语义冲突的符号还包括'*', '{', '}', '\'等。

## Solution
- 更换默认的Hexo下 Markdown渲染引擎
marked -> kramed

```dash
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-kramed --save
```
-  更改hexo转义冲突
找到根目录`node_modules\kramed\lib\rules\inline.js`
 - 修改11行，取消对`\,{,}`的转义escape
```dash
//  escape: /^\\([\\`*{}\[\]()#$+\-.!_>])/,
  escape: /^\\([`*\[\]()#$+\-.!_>])/,
```

 - 修改20行em
```dash
//  em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  em: /^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
```

- 三连 `hexo cl && hexo g && hexo s`查看效果
## Debug

- 如果出问题，在主题`_config.yml`下设置`mathjax`为`true`
- 文章也要开启`mathjax`

```yml
---
title: 我是标题
date: 2020-08-15 23:18:50
tags:
mathjax: true
--
```

## 其他解决办法
- 服务器端的渲染
 - [math.now.sh](https://math.now.sh/home)
 - [markdown-it-latex2img](https://github.com/MakerGYT/markdown-it-latex2img)

 

# SEO 搜索引擎优化

[Google search console 大全](https://zhuanlan.zhihu.com/p/150718629)




![](/img/contact.jpg)
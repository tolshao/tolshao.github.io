---
title: Latex设置
categories: 设置备忘
tags:
  - Snippets
  - Latex
id: "64459"
date: 2020-03-18
cover: "/assets/images/settings_latex_cover.jpg"
top: false
---

# Texpad实时编译注意
Texpad live 支持实时编译
缺点：不支持高级packages，如cref

经过验证，下列包不支持实时编译
```
\crefname{figure}{Fig.}{Figs.}
\crefname{table}{Table.}{Tables.}
\crefname{appendix}{}{}
\crefname{equation}{}{}
```
所以最后文档定型之后，调整格式的时候再添加

## 强制使用自定义图例标签，ref
\renewcommand{\Figurename}{Fig.}

## 投稿latex模板自定义修改
一般要求单列，双倍间距（可以在cls文件里面调）
## 实时预览中文
使用包CJK

```latex
\documentclass{article}
\usepackage{CJKutf8}
\begin{document}
\begin{CJK}{UTF8}{gbsn}
这是一个CJK例子,使用了UTF-8编码和gbsn字体。
\end{CJK}
\end{document}
```

另外两种方法
- `ctex`

```latex
\documentclass[UTF8]{ctexart}
\begin{document}
这是一个CTEX的utf-8编码例子，{\kaishu 这里是楷体显示}，{\songti 这里是宋体显示}，{\heiti 这里是黑体显示}，{\fangsong 这里是仿宋显示}。
\end{document}
```

- `xeCJK`只支持`xelatex`包，不能实时预览

```latex
\documentclass{article}
\usepackage{xeCJK}
\setCJKmainfont{SimSun}
\begin{document}
中文 \LaTeX 示例。
\end{document}
```

## 长公式跨双栏显示
- 使用`cuted`包的`strip`环境
- 更改strip默认行距，`\stripsep -3pt plus 3pt minus 2pt`

```latex
\begin{strip}
\begin{equation}
\label{haha}
a&=b+c=b+c=b+c=b+c=b+c=b+c\\
&=b+c=b+c=b+c=b+c=b+c=b+c
\end{equation}
\end{strip}
```


# Word公式转换
mathtype支持latex公式和mathml公式的转换
Win10有BUG，默认报错找不到`.xml`文件
需要用管理员打开word，才能mathtype不报错

# latex公式编辑器
[latex公式编辑器](https://www.latexlive.com/##)


# 报错解决
- `cref`引用不现实`algorithm`等`label`，将`cref`放在`algorithm2e`后面


# zotero使用mendeley数据库
https://zhuanlan.zhihu.com/p/31453719
思想，使用软链接的方式，配合zotfile插件，将原先在zotero根目录storage子目录的文件，链接到mendeley目录，平铺展开，并关闭mendeley的重命名功能更，避免对pdf文件重复修改
- zotero插件
    - zotfile 管理pdf
    - jasminum 识别中文文献
    - zotero-better-bibtex 管理bibtex



![](/assets/images/contact.jpg)
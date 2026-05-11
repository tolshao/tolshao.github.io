---
title: Python-Latex主题分享
categories: 分享
tags:
  - tricks
  - 工具
id: "61469"
date: 2021-09-24
top: false
---

# Python-Latex主题分享

## 人生苦短，我用Python

- Life is short, you need Python——Bruce Eckel

  <img src="/assets/images/image-20210924174440602.png" alt="人生苦短，我用Python" style="zoom:100%;" />

#### 优点

- 优雅、明确、简单

#### 特点

- 易于上手：跨平台，开源，短小精悍
- 易于阅读：
  - `没有太多仪式化的东西`：使用变量：声明、定义……
  - 乍一看就能知道在干啥
- **丰富的库**：（CSDN ？？？）
  - Pillow，图形处理
  - Numpy，数学方法
  - tkinter，GUI界面
  - Matplotlib，画图（数据可视化，当然还有其他的库）
- 便携式：环境配置简单，不同终端即开即用
- GUI编程：及格线，其他语言也ok
- 可扩展性：一切皆对象（数据、方法（函数）……）



### 推荐1：代码化的程序安装方式

#### 常用的软件安装方式

- `GUI`界面交互，下一步 -> 同意 -> 下一步 -> 取消“捆绑软件”选钩 -> 完成

<img src="/assets/images/image-20210924160110700.png" alt="传统软件安装方式" style="zoom:50%;" />

- 沙盒应用，即开即用

<img src="/assets/images/image-20210924160039138.png" alt="沙盒应用安装方式" style="zoom:25%;" />

- 代码式

  <img src="/assets/images/image-20210924151522040.png" alt="代码安装方式" style="zoom:30%;" />

```bash
# mac
brew install python3
# windows
choco install python3
# linux
sudo apt-get install python3
```

#### 优点：

- 源头可靠，干净绿色，远离360等流氓捆绑
- `people free`式安装，不用值守
- 方便安装各种环境依赖：使用`python`、`latex`等环境，难免需要各种依赖库，`conda`太过臃肿
- 自动配置环境变量(windows中的path)

#### 软件包管理软件

- Mac：`brew`……
- Windows：`choco`，`scoop`，`winget`……
- Linux：`apt-get`，`yum`，`dpkg`……
- python：`pip`

#### 批量安装

- `scoop`主要用来安装便携版

```bash
scoop bucket add extras		# 添加第三方库
scoop install pdftk sumatrapdf dismplusplus 
```

-  `choco`需要更权限下的软件，需要在管理员模式下安装软件

```bash
choco install -y git wechat raidrive clash-for-windows netease-cloudmusic everything texlive texstudio typora nodejs etcher geekuninstaller notepad3 quicklook potplayer vscode youtube-dl logitech-options
```



### 推荐2：Git：好用的分布式版本控制系统

#### 人工管理

没有良好的版本控制，一个新的Word文件，再接着改，改到一定程度，再“另存为

<img src="/assets/images/image-20210924161745854.png" alt="错乱的word版本" style="zoom:60%;" />

文件夹变成了这样

<img src="/assets/images/image-20210924161658163.png" alt="错乱的文件夹目录" style="zoom:50%;" />

#### `Git`的效果

使用了git，有这样一个`log`日志

<img src="/assets/images/image-20210924161829019.png" alt="git日志形式" style="zoom:67%;" />



Git-gui客户端`Source`介绍

- 一图抵百语

<img src="/assets/images/image-20210924163449459.png" alt="source软件界面" style="zoom:30%;" />

### python入门

认字看字典，编程看文档，例子是最好的老师

- [RUNOOB教程](https://www.runoob.com/python/python-tutorial.html)

- [Python100天](https://github.com/jackfrued/Python-100-Days)

- [Python3.9官方文档](https://docs.python.org/zh-cn/3/)

- [哔哩哔哩](https://search.bilibili.com/all?keyword=python3%20&from_source=webtop_search&spm_id_from=333.851)

- [Coursera](https://www.coursera.org/search?query=python&)

### python可视化

- 传统的编程交互
  - print - log
  - 没有公式、图片等信息

<img src="/assets/images/image-20210924174817756.png" alt="传统的log形式" style="zoom:30%;" />

- 富文本式的数据交互，matlab也可以实现，`实时脚本mlx`

推荐的编辑器：

- `jupyter notebook`
- `jupyter-lab`

![jupyter-lab界面](/assets/images/image-20210924174701096.png)

使用matplotlib库

```python
import matplotlib.pyplot as plt
t=[1,2,3]
y=[1,2,3]
fig = plt.plot(t,y)
plt.show()
```

官方样本库

<img src="/assets/images/16322933796539.jpg" alt="matplotlib样本库" style="zoom:30%;" />

### 参考资料

- [Matplotlib-repo](https://github.com/matplotlib/matplotlib)

- [Matplotlib-tutorial](https://github.com/rougier/matplotlib-tutorial)

- [论文学术style](https://github.com/garrettj403/SciencePlots)

  <img src="/assets/images/fig1.jpg" alt="学术style" style="zoom:30%;" />

- [手写汇报style](https://github.com/cutecharts/cutecharts.py)

  <img src="/assets/images/16322931692182.png" alt="手写style" style="zoom:52%;" />

- [Matplotlib-Animation](https://matplotlib.org/stable/api/animation_api.html)

  <img src="/assets/images/16322956547712.gif" alt="python画图制作动画" style="zoom:50%;" />

- [C++环境`Python-Style`画图](https://github.com/lava/matplotlib-cpp)

```c++
#include "matplotlibcpp.h"
namespace plt = matplotlibcpp;
int main() {
    plt::plot({1,3,2,4});
    plt::show();
}
```



## latex论文排版

关于和`word`的优劣，争论不休

双向跳转

### 环境

- texlive

### 软件

- mac：`texpad`

  <img src="/assets/images/image-20210924173315499.png" alt="texpad界面" style="zoom:30%;" />

- windows

  - `texstudio` + `sumatrapdf`
  - `vscode` + `sumatrapdf`

- web：[Overleaf](https://www.overleaf.com/)

  <img src="/assets/images/image-20210924173215633.png" alt="Overleaf界面" style="zoom:37%;" />

### 语法

查文档、找模板

- 图

  ```latex
  \begin{figure}[!hbt]
    \centering
    \includegraphics[width=0.45\textwidth]{/path/figure.png}
    \caption{ label }
    \label{fig_1}
  \end{figure}
  ```

- 表

  ```latex
  \begin{tabular}{l|cc}
    1& 2& 3\\
    \hline
    4& 5& 6\\
    7& 8& 9
  \end{tabular}	
  ```

- 公式

  ```latex
  \begin{equation}
  \label{eq_1}
     a = b + c 
  \end{equation}
  ```

- 引用

  ```latex
  \ref{fig_1}
  \cref{eq_1}
  \cref{tab_1}
  \cite{ref_1}
  ```

  

## 代理

以上资源服务器部分在国外，访问网速慢，甚至443，所以偶尔需要借助

<img src="/assets/images/image-20210924165854805.png" style="zoom:80%;" />

速度客观

<img src="/assets/images/16322949326340.png" alt="vpn测速" style="zoom:30%;" />

- [邀请链接1](https://zcssr.com/auth/register?code=SYGh)

- [邀请链接2](https://zc17.xyz/auth/register?code=SYGh)

- [邀请链接3](https://zc18.xyz/auth/register?code=SYGh)

- [邀请链接4](https://zc01.us/auth/register?code=SYGh)

  

  ![](/assets/images/contact.jpg)

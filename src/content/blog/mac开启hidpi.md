---
title: "mac开启HiDPI"
date: "2021-01-07"
categories: "设置"
tags: ["settings", "HiDPI"]
id: "56592"
cover: "/img/hidpi.png"
top: false
---

# 什么是HiDPI
- 全名：`High Dots Per Inch`

> 它使用横纵 2 个物理像素也就是 4 个物理像素来显示 1 个像素区域，结果就是图像的细节得到翻倍、更清晰、边缘更平滑。

> 拿 13 寸的 MacBook Pro 举例，它的屏幕物理分辨率是 2560 x 1600，所以原生的 HiDPI 分辨率就是 1280x800。更高的一档 1440x900 HiDPI 缩放分辨率，则是虚拟出一个 2880x1800 的分辨率，再进行软缩放输入。所以你能发现苹果的电脑总是有很高的分辨率。

> 好了，既然你的屏幕是 1080p，本身就没有那么多像素去合成 HiDPI，如果以原生的显示计算，你这屏幕的 1080p 分辨率应该是 960x540，这么低的分辨率你是没法用的。

> 这个脚本的功能就是虚拟出比你的屏幕物理分辨率更高的假分辨率……如果你要开启 1080p 的 HiDPI 分辨率，就虚拟一个 3840 x 2160 的假分辨率，然后 macOS 会使用 4 个像素来显示 1 个像素区域，也就是和你物理分辨率一样的 1080p 分辨率。

- on-off 对比图
![hidpi-on](/img/hidpi-on.png)

![hidpi-off](/img/hidpi-off.png)
原来一直觉得字体辣眼睛，不是显示器的锅

# 为什么要**手动**开启hidpi
不只是黑苹果需要开启hidpi，白苹果外接非4k显示屏的时候默认也是不开启hidpi的，显示效果不佳，颗粒感严重



# 操作方法
-  靠第三方软件
    - SwitchResX（收费）
    ![SwitchResX](/img/16099873336577.png)
    - RDM（Retina Display Manager），免费
    ![-w337](/img/16099896834987.png)
    [下载链接](http://avi.alkalay.net/software/RDM/)

## 原生：修改系统配置文件
- 见[少数派教程](https://sspai.com/post/57549)

- 并附有懒人版，一键bash脚本操作搞定
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/xzhih/one-key-hidpi/master/hidpi.sh)"
```
- 脚本运行过程如下：
![操作过程](/img/%E8%84%9A%E6%9C%AC.png)


如果成功的话，在系统显示器配置页面可以见到分辨率调整选项
![显示器分辨率调整页面](/img/16099901559419.jpg)

如果需要更多选项，可以按`option`单击`缩放`选项
![Advanced](/img/16099902334267.jpg)
从中选择一个支持hidpi的分辨率，让你的眼睛舒服一些吧。

# 针对不同系统版本的说明
- 系统在10.15之前的，配置文件放在`/System`下，按照教程开启`SIP(System Integrity Protection)`可以完成系统配置文件的修改

- 系统从big sur开始，将原生系统配置文件锁死在
`/System/Library/Displays/Contents/Resources/Overrides/`
开启`SIP`后仍无法修改。
可以通过在`/Library/Displays/Contents/Resources/Overrides/`下放置对应配置文件，系统自动完成优先调用



![](/img/contact.jpg)
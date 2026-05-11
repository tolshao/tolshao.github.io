---
title: "免费图床搭建:Github+Picgo+jsDelivr"
date: "2020-08-19"
categories: "工具"
tags: ["图床", "Picgo", "jsDelivr"]
id: "48156"
cover: "/assets/images/img_bed.jpg"
top: false
recommend: false
---

# Introduction

简单说图床就是一个在网络上存储图片的地方，目的是为了节省本地服务器空间（`.md`和`.html`文件里图片是以链接的形式），加快图片打开速度，主要是个人博客和网站使用。

- 微博图床：挂了已经
- SM.MS：国外服务，慢
- imgur：国外，被Q，慢
- 七牛云：需要注册国内域名，备案麻烦
- 阿里云：要花几块钱
- 腾讯云：比阿里贵

但是，Github也有缺点，比如不用爬墙访问慢等，会导致国内访问网页的时候，图片刷新极慢，但是不要钱啊，配合jsDelivr可以白嫖成功。

另，不可能每次都开浏览器去上传图片，图床工具Picgo可以方便的帮你上传图片到图床，并且插件可以支持自定义域名，方便你用cdn工具来加速Github存放的图片访问。

# 搭建步骤

## 新建Github仓库

登录/注册GitHub，新建一个仓库，填写好仓库名，仓库描述，根据需求选择是否为仓库初始化一个README.md描述文件。

![](/img/15978320697562.jpg)

- 仓库设置
 - 仓库名称
 - 仓库公有/私有：因为图床需要被很多应用程序访问，所以需要设置成public的，切记
 - 根据需要，决定是否初始化`readme.md`

![](/img/15978321283696.jpg)
## 申请access token给picgo


token是外部应用程序访问github的密钥，是picgo在github的身份证明
【注意】：需要注意的是token申请成功后，只会显示一次，需要自己妥善保存，否则要重新申请，最好配置完后在关闭picgo
- 设置路径在`settings/Developer settings/generate new token`

![](/img/15978321943320.jpg)



![](/img/15978322447146.jpg)
- 设置token
 - 填写token描述：方便知道哪个token干嘛的
 - token权限：这里只开放仓库repo的权限

![](/img/15978322969831.jpg)

## 配置Picgo
- 安装
 - 下载地址在这里[Picgo](https://github.com/Molunerfinn/PicGo)
 - 也可以`brew cask install picgo` 大法

上图，我的设置如下：
- 用户名`tolshao`
- 仓库名`media`
- 设定分支名：`master`
- 设定Token：粘贴之前生成的`Token`
- 存储路径`img/`
- 自定义域名是仓库的别名，这里可以用`jsDelivr`来进行`cdn`加速，实现`https://raw.githubusercontent.com/tolshao/media/master/img/contact.jpg`到`https://cdn.jsdelivr.net/gh/tolshao/media/img/contact.jpg`的替换，实测快很多

![](/img/15978324636801.jpg)


![](https://cdn.jsdelivr.net/gh/tolshao/media/img/contact.jpg)
---
title: "卷积神经网络CNN（convolutional）"
date: "2020-07-15"
categories: "机器学习笔记"
tags: ["深度学习", "CNN", "卷积神经网络"]
id: "71093"
cover: "../image/CNN/cover.png"
typora-root-url: ../
top: false
recommend: false
---



# 卷积神经网络CNN（convolutional）
卷积运算：原图像*卷积核=新图像，经常用来做边缘检测
人造核：手动指定权重，改善效果
![-w615](../image/CNN/15941711725552.jpg)

指定核权重为变量，通过反向传播，学习卷积核的权重
补白和步幅决定了卷积后的
## 补白Padding
* Valid convolution：p = 0
$n\times n * f\times f -> (n-f+1)\times (n-f+1)$
* Same convolution：n = n
$(n+2p)\times (n+2p) * f\times f -> n\times n$
得到填充边缘宽度$p = \frac{f-1}{2}$
所以一般卷积核大小是奇数
## 步幅strides
s>1，图像也变小
![-w600](../image/CNN/15941720564251.jpg)

## 三维卷积
对于RGB三通道图像，nc个滤波器，卷积叠加，得到深度为nc的图像
![-w710](../image/CNN/15941727037025.jpg)

### 总结
![-w697](../image/CNN/15941735838131.jpg)
### 趋势：缩减图片尺度，增加深度
![-w693](../image/CNN/15941743777673.jpg)

## CNN分类
### 卷积层Conv：

![-w695](../image/CNN/15941767758613.jpg)

### 池化层Pool：减少图片宽度，用卷积核进行特征提取
欠**采样**（下采样），特征降维，压缩数据和参数，减小过拟合
只有超参数，没有参数
主要分类：
* 最大池化
* 平均池化

![-w730](../image/CNN/15941793237584.jpg)

### 全连接层Fc：一般用来输出

![-w743](../image/CNN/15941799685961.jpg)
![-w732](../image/CNN/15941799984582.jpg)
![-w661](../image/CNN/15941803310656.jpg)
### 总结
* 优势
1. 参数共享：将卷积核的参数共享给每组被卷积对象运算
2. 稀疏性联系：输出的值只与小部分输入相关
### 特点
CNN从前到后，维度缩减，参数增多


## CNN案例
### 经典CNN
* LeNet-5（sigmoid激活，softmax分类）
![-w767](../image/CNN/15942602914708.jpg)

* AlexNet

![-w772](../image/CNN/15942603354885.jpg)

* VGGNet
![-w775](../image/CNN/15942604999932.jpg)

### 残差网络
传统的plain network存在梯度指数现象
![-w596](../image/CNN/15942710882961.png)


为了改善深度网络的梯度爆炸（消失）现象，使深度神经网训练可能
* Residual block
![-w777](../image/CNN/15942613601777.jpg)

![-w770](../image/CNN/15942613429827.jpg)
维数不一致的问题，可以通过构建权重矩阵，填充0元素或者其他方法进行适配

![-w723](../image/CNN/15942620573952.jpg)

## 1x1 convolution
对image每个像素进行非线性函数映射，通过n个kernel，映射为n个特征，用于**缩减图像特征深度**
![-w662](../image/CNN/15942632478404.jpg)

### 用法，生成中间量，减少运算量
直接5x5卷积
![-w576](../image/CNN/15942634806609.jpg)
采用1x1卷积中间量，再用5x5卷积
![-w685](../image/CNN/15942635070290.jpg)

## Inception network
### Main idea
![-w667](../image/CNN/15942632298297.jpg)

### Inception module
![-w678](../image/CNN/15942639201675.jpg)

### Inception network
* Inception module 的串联
* branches用于在中间预测结果，效果不差
![-w678](../image/CNN/15942640307997.jpg)

## Transfer learning
步骤
1. 下载源码，模型，权重参数
2. 修改末层结构，softmax分类或者
3. 冻结前层参数
4. 训练自己模型

## Data Augmentation数据增强
可以预先处理，
也可以与训练并行处理
### 1、形状
* 镜像Mirroring
* 随机裁剪Random Cropping
* 旋转Rotation
* 倾斜Shearing
* 扭曲Local warping

### 2、色彩Color shifting
* 增减RGB通道值，改变量随机
* PCA，干扰主要元素



# 目标检测
## 概述
CV（computer vision）中，目标检测是并列与图像分类的一个重要应用
分类 -> 分类+定位 = 目标检测 -> 多目标检测
![-w788](../image/CNN/15942815091519.jpg)
* 输出和cost function构造
输出$Y = [p_c,b_x,b_y,b_h,b_w,c_1,c_2……]$
包含**有没有**物体、**坐标**和**物体类别**
* cost function 
当$p_c$=1，计算均方根误差
$p_c$= 0,其他的不计算

## Landmark Detection
人脸特征标记
姿态特征标记
特征构建Y = $[是不是脸,b_x{1},b_y{1},……,b_x{n},b_{yn}]$

## 目标检测几种思路
### Sliding windows detection
1. 滑窗获取图像
2. 传给Classification
3. 增大windows size 和 stride 重复1

#### 缺点：
* 小步长，计算量高
* 大步长，计算粗略，精度差
### 用卷积实现Turning FC layer into convolutional layers
用1x1卷积实现权重线性组合
![-w670](../image/CNN/15942833041786.jpg)

![-w669](../image/CNN/15942837667651.jpg)

#### 缺点
定位不精确

## 输出更精确的边界框——YOLO
YOLO算法  you only look once
构造输出Y.shape = (h,w,l)
h是高度图像分割的个数
w是宽度图像分割的个数
l方向是物体定位信息$[p_c,b_x,b_y,b_h,b_w,c_1,c_2……]$
![-w668](../image/CNN/15942851221558.jpg)

## 非极大值抑制
1. 低于阈值，直接丢弃
2. 找出最大值
3. 与最大值重叠区域IoU>0.5，丢弃。多目标检测的话，运行多次IoU算法

![-w671](../image/CNN/15942863921030.jpg)

## Anchor Boxes

重叠物体检测，重建Y
矮胖，瘦长
![-w673](../image/CNN/15942868946435.jpg)


# 人脸识别——单样本学习

* Verification验证
input： 图片 姓名 140311199402071213
output：是否对应

* Recognition识别
n个人的数据库
input：图片
output：140311199402071213 of person（如果图片在库里）

相似度函数$d(img1,img2)$，函数和照片没关系
## 孪生网络Siamese network
核心思想：NN生成编码，比较不同样本编码的范数
CNN的参数相同，
![-w663](../image/CNN/15942958881883.jpg)

### 三重损耗函数 Triple loss
防止NN输出退化解，布置小于0
$\alpha$ is margin
![-w662](../image/CNN/15942962863559.jpg)

### another相似性函数
![-w413](../image/CNN/15943010618021.jpg)

![-w672](../image/CNN/15943009025922.jpg)

# 风格转换Styler transfer
![-w670](../image/CNN/15943016778419.jpg)




## 可视化hidden unit
浅层学习基本特征
深层学习宏观特征
![-w667](../image/CNN/15943015979608.jpg)

## cost function
Main idea: 和两张图片都很像
$J(G) = \alpha J_{content}(C,G) + \beta J_{style}(S,G)$

![-w682](../image/CNN/15943018797577.jpg)
### content cost function
![-w698](../image/CNN/15943020713953.jpg)



### Style cost function



![-w603](../image/CNN/15943023722812.jpg)
$\lambda$ 是 l 层的权重
![-w468](../image/CNN/15943032075944.jpg)


## 卷积1D和3D形式
### 1D形式
![-w707](../image/CNN/15943038817548.jpg)

### 3D形式
![-w695](../image/CNN/15943041391653.jpg)

> 封面图来源：[Convolutional Neural Network.png](https://commons.wikimedia.org/wiki/File:Convolutional_Neural_Network.png)，作者 Irisbox，许可证 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。

![](../image/CNN/contact.jpg)
---
title: Keras & Tensorflow 笔记
categories: 机器学习笔记
tags:
  - 机器学习 ML
  - keras
  - tensorflow
id: "46547"
date: 2020-08-03
cover: "../image/keras_tensorflow/keras_tensorflow_cover.jpg"
typora-root-url: ../
top: false
recommend: false
---

Keras是一个高层神经网络API，Keras由纯Python编写而成并基于Tensorflow、Theano以及CNTK后端。Keras为支持快速实验而生，能够把你的idea迅速转换为结果，如果你有如下需求，请选择Keras：

* 简易和快速的原型设计（keras具有高度模块化，极简，和可扩充特性）
* 支持CNN和RNN，或二者的结合
* 无缝CPU和GPU切换

有串联式和函数式两种建模方式，串联式建模方式
* 串联式Sequential：

```python
model = Sequential()
model.add(Dense(32, input_dim=784))
model.add(Activation('relu'))
```

* 函数式：

```
def model_name(input_shape, output_shape):
    inputs = Input(shape = input_shape, dtype = , name = '')
    x = Dense(64 , activation='relu')(inputs)
    x = Dense(64,activation='relu')(x)
    predictions = Dense(output_shape,activation='softmax')(x)

    model = Model(inputs=inputs, outputs=predictions)
    return model
```


# 学习一般操作步骤
from keras import Model ……
1. Generate：
`model = Model(inputs = input, outputs = output)`
1. Compile：
model.compile(配置优化器，学习率，误差等参数)
2. Fit \ Train：
`model.fit(X_train, Y_train, (X_dev, Y_dev),metric = [])`
4. Evaluate \ test：
`model.predict(X_test, Y_test)`
fit和predict函数有返回值的，最好用一个变量来接住，方便查看预测过程中的变量信息history。

# Tricks and Snippets

## 模型可视化

### 命令行打印：keras自带的summary函数
`model.summary()`
![-w582]((../image/keras_tensorflow/15954994831618.jpg))
### 调用库，打印保存图片
使用方法：
```python
Keras.utils.plot_model plot_model(model,to_file='a.png')
```
结果如下，还可以保存为pdf等格式
![-w425]((../image/keras_tensorflow/15955035723718.jpg))

### [PlotNeuralNet](https://github.com/HarisIqbal88/PlotNeuralNet)绘制latex风格的网络图
例图：
![-w456]((../image/keras_tensorflow/15955111765714.jpg))

使用方法：
1. 下载github源文件，安装pycore库，将目录中的python包，拷贝至`/usr/local/lib/python3.7/site-packages/pycore/`
2. 根据example搭建网络结构的python文件
3. 运行python文件生成filename.tex文件
4. `pdflatex filename.tex`，此步骤需要提前拷贝源文件layers中sty文件至tex文件目录，用pdflaetx编译需要texlive环境，请提前安装。

### model.fit函数调用
这个方法最为硬核，其中mandb还可以横纵向对比多个模型的各个参数，并方便debug和optimize
使用方法：

```python
from rl.callbacks import WandbLogger
import tensorboard
model.fig(巴拉巴拉, callbacks = [函数])
```
``，在网页localhost可视化
* TensorBoard
* Mandb：callbacks=[WandbLogger()]，需要提前进行wandb初始化并在config中定义需要log的变量。
Tensorboard作者没有去尝试，这里就先贴一张Wandb的可视化结果：
![-w1436]((../image/keras_tensorflow/15955742598518.jpg))


### Netron软件
下载安装，导入keras模型.h5即可食用，也支持tf、pytorch等多种模型，界面如下
![-w866]((../image/keras_tensorflow/15954993270061.jpg))
### 超参数调节
超参数就是模型权重以外的其他参数，比如层种类，层深度、宽度，优化器类型、学习率大小等等，它们都影响着模型的表现和上限，超参数一动，就是一个新的模型了。但是超参数却没有像构建神经网络一样有可遵照的理论指导，一直以来都是从业人员的难点。
虽然网上已经有很多关于超参数调节的帖子，但大多都为经验之谈，是研究人员在实践中摸索、发现并总结的。就像控制理论里最简单PID调节一样，三个参数就能调的人头大，有些模型遵照经验去调还可能不work。
其实这点早就为我们想到了，作者找到了几个超参数调节器


#### [keras tunner](https://blog.csdn.net/wmq104/article/details/105740497)
根据验证集的表现自动优化超参数
![]((../image/keras_tensorflow/15955749309209.jpg))

![]((../image/keras_tensorflow/15955749728608.jpg))


#### keras-lr-finder
使用方法：安装python库keras_lr_finder

代码：引用库，包装模型，绘制结果
```
import keras_lr_finder

# model is a Keras model
lr_finder = LRFinder(model)

# Train a model with batch size 512 for 5 epochs
# with learning rate growing exponentially from 0.0001 to 1
lr_finder.find(x_train, y_train, start_lr=0.0001, end_lr=1, batch_size=512, epochs=5)

# Plot the loss, ignore 20 batches in the beginning and 5 in the end
lr_finder.plot_loss(n_skip_beginning=20, n_skip_end=5)
```
![]((../image/keras_tensorflow/15948027436905.png))


```
# Plot rate of change of the loss
# Ignore 20 batches in the beginning and 5 in the end
# Smooth the curve using simple moving average of 20 batches
# Limit the range for y axis to (-0.02, 0.01)
lr_finder.plot_loss_change(sma=20, n_skip_beginning=20, n_skip_end=5, y_lim=(-0.01, 0.01))
```

![]((../image/keras_tensorflow/15948027304867.png))

#### [利用scikit-learn交互网格搜索超参数](https://blog.csdn.net/happytofly/article/details/80124813)



# 设置备忘

## Keras下载的预训练数据存放目录

`root\\.keras\models`

# 错误记录
* **非**张量运算变量运算用内置函数，+ - 操作会把张量 转为 Tensorflow，报错
* 实数，不用tf. 或者 K. 函数库运算，报错“张量”
* 张量一定用内置函数，python支持@ + - 等操作，但是偶尔报错

![](../image/contact.jpg)
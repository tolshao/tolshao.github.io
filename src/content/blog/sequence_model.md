---
title: RNN 序列模型 sequence model
categories: 机器学习笔记
tags:
  - 序列模型 sequence model
  - 循环神经网络 RNN
id: "60230"
date: 2020-06-25
cover: "/assets/images/sequence_model_cover.jpg"
top: false
---

# Sequence model
概述：处理样本数不规则的模型

![-w769]((/assets/images/15943710523088.jpg))


## recurrent neural network递归神经网络
参数共享,前->后
样本逐个扫描
a激活用一套参数
y激活用一套参数
![-w777]((/assets/images/15943708867352.jpg))

### 参数流
![-w731]((/assets/images/15943568179775.jpg))

### x、y个数不一致的RNN
序列样本分类问题
![-w775]((/assets/images/15943713488434.jpg))
音乐生成、机器翻译
![-w774]((/assets/images/15943715537565.jpg))

### RNN类型总结
![-w765]((/assets/images/15943716830777.jpg))

## language model with RNN
输出P(sentence),并按照y(i)展开为字符串
![-w774]((/assets/images/15943725690344.jpg))

### 从训练模型采样
![-w776]((/assets/images/15943750855765.jpg))

在训练过程中，结局梯度爆炸
gradient clipping：梯度过大时，重新缩放梯度向量




## GRU gated recurrent unit
解决了梯度爆炸问题
新建c^{<t>} = a^{<t>} 

c的估计值
$\tilde C^{<t>} = tanh(w_c[c^{<t-1>},x^{<t>}]+b_c)$

Gata，门限值，0 or 1，选择是否记忆
$\Gamma_u = \sigma(w_u[c^{<t-1>},x^{<t>}]+b_u)$$

c的实际值更新函数
$c^{<t>} = \Gamma_u * \tilde c ^{<t>} + (1-\Gamma_u) c^{<t-1>}$

* GRU单元
![-w365]((/assets/images/15943765663495.jpg))

![-w545]((/assets/images/15943771234112.jpg))

## LSTM （Long Short Term Memory）
![-w712]((/assets/images/15944389576811.jpg))


![-w788]((/assets/images/15944388078864.jpg))

## Bidirectional双向 RNN  BRNN
![-w782]((/assets/images/15944392852666.jpg))

## Deep RNN
![-w790]((/assets/images/15944397105651.jpg))

## word representation
只用 one-hot，无法表征单词之间的关系
点积为0
构建词向量 word vec
![-w647]((/assets/images/15946185176380.jpg))


![-w668]((/assets/images/15946183444304.jpg))

man - women 
king - queen

词向量库 E 泛化negligible不错
![-w669]((/assets/images/15946186629440.jpg))


相似度函数
![-w672]((/assets/images/15946189996342.jpg))

![-w670]((/assets/images/15946193246812.jpg))
应对大词典的softmax运算慢问题，构建二叉树数据结构，常用的放上面，不用每次计算概率
![-w656]((/assets/images/15946209191942.jpg))


平衡P(t|c),避免the of 等 词频繁运算出现


### 负采样法Negative sampling
![-w654]((/assets/images/15946217618512.jpg))

### Glove global vectors for word representation





## 情感分类sentiment classification
问题描述：
![-w658]((/assets/images/15946227091045.jpg))
## 平均数 词向量分类
![-w660]((/assets/images/15946228651974.jpg))

![-w660]((/assets/images/15946229353440.jpg))

词编码向量的偏差消除
![-w659]((/assets/images/15946235846181.jpg))

## 变输入输出架构
主要应用在语言识别和机器翻译

架构：编码器 + 解码器各用了一个
![-w493]((/assets/images/15946322380539.jpg))

### Beam search
对于翻译算法来说，一次得到整个句子的最优概率对应翻译，搜索量太大，而贪心算法，每次只选一个，随机误差太大，效果差，因此引入Beam search 算法
每次考虑2步，第一步选B个，第二部全选n个，从B x n个中寻优

### 概率估计值数值稳定性
* 概率$\in [0,1]$，连乘，数值稳定性差
* 转化为log函数求和，越加越小
* 平均值，比求和好
* 用$\frac{1}{T_y^\alpha}$
![-w703]((/assets/images/15946358060953.jpg))

### Error analysis
![-w702]((/assets/images/15946364822178.jpg))


## 注意力集中 Attention model intution
* 长序列模型的问题
![-w703]((/assets/images/15946392688436.jpg))
without 注意力模型，$y^{<t>}$ 取决于 $a^{<t>}$
带有注意力的系统，将权重，分散给其他的几个激活值$a^{<t>}$
![-w696]((/assets/images/15946399130903.jpg))

### 注意力权重计算
用softmax保证和为1
![-w703]((/assets/images/15946403850376.jpg))

## 语音识别
声音预处理，频谱
![-w700]((/assets/images/15946409369067.jpg))

![-w700]((/assets/images/15946409126527.jpg))

![](/assets/images/contact.jpg)
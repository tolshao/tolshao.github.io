---
title: Getting Started with gym
categories: 强化学习笔记
tags:
  - 强化学习 RL
  - gym
id: "40502"
date: 2020-09-08
cover: "/assets/images/rl_gym_start_cover.jpg"
top: false
---

# gym入门

gym是用于开发和比较强化学习算法的工具包。它不对代理的结构做任何假设，并且与任何数字计算库(例如TensorFlow或Theano)兼容。

`gym`库是测试问题(环境)的集合，您可以用来制定强化学习算法。这些环境具有共享的接口，使您可以编写常规算法。

## 安装
首先，您需要安装Python 3.5+。只需使用pip安装gym：
如果你的电脑中存在系统版本Python2，那你可能要用`pip3`来安装
```python
pip install gym
```

- 从源头建造

如果愿意，还可以直接克隆gym Git存储库。当您要修改gym本身或添加环境时，此功能特别有用。使用以下方法下载并安装：


```python
git clone https://github.com/openai/gym
cd gym
pip install -e。
```
您以后可以运行`pip install -e.[all]`执行包含所有环境的完整安装。这需要安装更多涉及的依赖项，包括`cmake`和最新的`pip`版本。

## 环境环境
这是运行某件事的最低限度示例。这将在1000个时间步中运行CartPole-v0环境的实例，并在每个步骤中渲染该环境。您应该会看到一个弹出窗口，呈现经典的购物车问题：


```python
import gym
env = gym.make('CartPole-v0')
env.reset()
for _ in range(1000)：
    env.render()
    env.step(env.action_space.sample())＃采取随机行动
env.close()
```
它看起来应该像这样：

![cartpole](/assets/images/cartpole.gif)


通常，我们会在允许球杆离开屏幕之前结束模拟。以后再说。现在，即使此环境已经返回`done = True`，也请忽略有关调用`step()`的警告。

如果您希望看到其他运行环境，请尝试将上面的`CartPole-v0`替换为`MountainCar-v0`，`MsPacman-v0`(需要Atari依赖项)或`Hopper-v1`(需要`MuJoCo`依赖项)。所有环境均来自`Env`基类。

请注意，如果您缺少任何依赖项，则应该收到一条有用的错误消息，告诉您所缺少的内容。 (让我们知道依赖项是否给您带来麻烦，而没有明确的修复说明。)安装缺少的依赖项通常非常简单。您还需要`Hopper-v1`的`MuJoCo`许可证。

## 观察结果
如果我们想做的比每步都采取随机行动要好，那么最好是真正了解我们的行动对环境有何影响。

环境的`step`函数恰好返回了我们所需要的。实际上，`step`返回四个值。这些是：

- `observation`(object)：特定于环境的对象，代表您对环境的观察。例如，来自摄像机的像素数据，机器人的关节角度和关节速度或棋盘游戏中的棋盘状态。
- `reward`(float)：上一操作获得的奖励金额。规模因环境而异，但目标始终是增加总奖励。
- `done`(布尔值)：是否应该再次重置环境。大多数(但不是全部)任务被划分为定义明确的情节，如果为True，则表示情节已终止。 (例如，也许杆子太尖了，或者您失去了上一生。)
- `info`(dict)：诊断信息，可用于调试。它有时对学习很有用(例如，它可能包含环境上次状态更改背后的原始概率)。但是，您的代理人的官方评估不允许将其用于学习。
这只是经典“代理程序-环境循环”的实现。每个时间步长，代理都会选择一个动作，环境会返回观察结果和奖励。

![agent and env](/assets/images/2.png)

该过程通过调用`reset()`开始，此返回初始`observation`。因此，编写前面的代码的更合适的方法是检查`done`flag：

```python
import gym
env = gym.make('CartPole-v0')
for i_episode in range(20):
    observation = env.reset()
    for t in range(100):
        env.render()
        print(observation)
        action = env.action_space.sample()
        observation, reward, done, info = env.step(action)
        if done:
            print("Episode finished after {} timesteps".format(t+1))
            break
env.close()
```

这应该提供视频和类似以下的输出。您应该能够看到重置发生的位置。
![cartpole](/assets/images/cartpole1.gif)


```
[-0.061586   -0.75893141  0.05793238  1.15547541]
[-0.07676463 -0.95475889  0.08104189  1.46574644]
[-0.0958598  -1.15077434  0.11035682  1.78260485]
[-0.11887529 -0.95705275  0.14600892  1.5261692 ]
[-0.13801635 -0.7639636   0.1765323   1.28239155]
[-0.15329562 -0.57147373  0.20218013  1.04977545]
Episode finished after 14 timesteps
[-0.02786724  0.00361763 -0.03938967 -0.01611184]
[-0.02779488 -0.19091794 -0.03971191  0.26388759]
[-0.03161324  0.00474768 -0.03443415 -0.04105167]
```


## 空间
在上面的示例中，我们从环境的操作空间中采样了随机操作。但是这些动作实际上是什么？每个环境都有一个action_space和一个observation_space。这些属性的类型为Space，它们描述了有效操作和观察的格式：


```
import gym
env = gym.make('CartPole-v0')
print(env.action_space)
#> Discrete(2)
print(env.observation_space)
#> Box(4,)
```
`Discrete`空间允许固定范围的非负数，因此在这种情况下，有效操作为0或1。`Box`空间表示n维盒子，因此有效观察值将是4个数字组成的数组。我们还可以检查`Box`的边界：


```python
print(env.observation_space.high)
#> array([ 2.4       ,         inf,  0.20943951,         inf])
print(env.observation_space.low)
#> array([-2.4       ,        -inf, -0.20943951,        -inf])
```


这种`assert`对于编写适用于许多不同环境的通用代码很有帮助。 Box和Discrete是最常见的空间。您可以从某个空间采样或检查某个空间是否属于该空间：


```python
from gym import spaces
space = spaces.Discrete(8) # Set with 8 elements {0, 1, 2, ..., 7}
x = space.sample()
assert space.contains(x)
assert space.n == 8
```


对于`CartPole-v0`，其中一个动作向左施加力，而其中一个动作向右施加力。 (您能找出哪个吗？)

幸运的是，您的学习算法越好，您自己尝试解释这些数字的次数就越少。

# 可用环境

gym拥有各种环境，从容易到困难，涉及许多不同种类的数据。查看环境的完整列表以鸟瞰。

- `经典控制`和`玩具文字`：完成小规模任务，大部分来自RL文献。他们是来帮助您入门的。
算法：执行计算，例如添加多位数和反转顺序。有人可能会反对说这些任务对于计算机来说很容易。挑战在于仅从示例中学习这些算法。这些任务具有很好的特性，即可以通过改变序列长度来轻松地改变难度。
- `Atari`：玩经典的Atari游戏。我们以易于安装的形式集成了Arcade学习环境(这对强化学习研究产生了重大影响)。
- `2D和3D机器人`：在仿真中控制机器人。这些任务使用了MuJoCo物理引擎，该引擎设计用于快速而准确的机器人仿真。其中包括加州大学伯克利分校研究人员最新基准的一些环境(偶然会在今年夏天加入我们)。 `MuJoCo`是专有软件，但提供免费试用许可证。


## 注册表Registry

`gym`的主要目的是提供大量环境，这些环境暴露出一个通用的界面，并进行版本控制以进行比较。要列出安装中可用的环境，只需询问`gym.envs.registry`：

```python
from gym import envs
print(envs.registry.all())
#> [EnvSpec(DoubleDunk-v0), EnvSpec(InvertedDoublePendulum-v0), EnvSpec(BeamRider-v0), EnvSpec(Phoenix-ram-v0), EnvSpec(Asterix-v0), EnvSpec(TimePilot-v0), EnvSpec(Alien-v0), EnvSpec(Robotank-ram-v0), EnvSpec(CartPole-v0), EnvSpec(Berzerk-v0), EnvSpec(Berzerk-ram-v0), EnvSpec(Gopher-ram-v0), ...
```

这将为您提供`EnvSpec`对象的列表。这些定义了特定任务的参数，包括要运行的试验次数和最大步骤数。例如，`EnvSpec(Hopper-v1)`定义了一个环境，目标是让2D模拟机器人跳跃； `EnvSpec(Go9x9-v0)`在9x9板上定义Go游戏。

这些环境ID被视为不透明字符串。为了确保将来进行有效的比较，绝不会以影响性能的方式更改环境，而只能用较新的版本来替换。目前，我们为每个环境都添加了v0后缀，以便将来可以自然地将其替换为v1，v2等。

将您自己的环境添加到注册表非常容易，从而使它们可用于`gym.make()`：只需在加载时`register()`即可。

# 背景：为什么要选择`gym`？ 

强化学习(RL)是机器学习的子领域，涉及决策和运动控制。它研究代理商如何在复杂，不确定的环境中学习如何实现目标。令人兴奋的原因有两个：

- **RL是一个大的范式(框架)，涵盖了涉及一系列决策的所有问题**：例如，控制机器人的电动机以使其能够运行和跳跃，制定价格，库存管理等商业决策，或者玩视频游戏和棋盘游戏。 RL甚至可以应用于具有顺序或结构化输出的监督学习问题。
- **RL算法已开始在许多困难的环境中取得良好的效果**。 RL历史悠久，但在深度学习方面取得新进展之前，它需要大量针对特定问题的工程。 DeepMind的Atari结果，Pieter Abbeel小组的BRETT和AlphaGo都使用了深度RL算法，该算法并未对其环境做太多假设，因此可以在其他环境中应用。
但是，RL研究也因两个因素而减慢了速度：

- **需要更好的基准**。在监督学习中，像ImageNet这样的大型标签数据集推动了进步。在RL中，最接近的等效项是各种各样的环境。但是，现有的RL环境的开源集合种类繁多，并且通常甚至很难设置和使用。
- **出版物中使用的环境缺乏标准化**。问题定义上的细微差异(例如奖励功能或一组动作)会大大改变任务的难度。这个问题使得很难复制已发表的研究成果并比较不同论文的结果。
`gym`是试图解决这两个问题的尝试。



![](/assets/images/contact.jpg)
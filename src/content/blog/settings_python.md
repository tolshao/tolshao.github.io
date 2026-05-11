---
title: python-snippets
categories: 设置备忘
tags:
  - python
  - snippets
id: "28408"
date: 2020-01-01
cover: "/assets/images/settings_python_cover.jpg"
top: false
---

## python读取txt数据plot

- 从txt获取数据

```python
def get_txt_result(filename, sp=-1, ep=-1, debug=False):
    fileReadObj = open(filename)
    # 再读入后续的文件
    fileLines = fileReadObj.readlines()  # 一次性读入所有的行

    if sp >= 0 and ep > sp:
        fileLines = fileLines[sp:ep]

    mylist = fileLines[0].split("\t")  # 用""将字符分开
    # print(mylist)
    linecount = len(fileLines)
    colcount = len(mylist)
    data = np.zeros((linecount, colcount))
    j = 0
    for line in fileLines:
        line = line.strip()  # 去掉字符串头尾的空格
        mylist = line.split("\t")  # 用""将字符分开
        i = 0
        for x in mylist:
            data[j][i] = float(x)
            i = i + 1
        j = j + 1
    N = j

    dT = 0.0001

    time = np.linspace(start=0, stop=N * dT, num=N)
    return time, data
```




## python保存data到excel
```python
import numpy as np
import pandas as pd
# prepare for data
data = np.arange(1,101).reshape((10,10))
data_df = pd.DataFrame(data)
# change the index and column name
data_df.columns = ['A','B','C','D','E','F','G','H','I','J']
data_df.index = ['a','b','c','d','e','f','g','h','i','j']
# create and writer pd.DataFrame to excel
writer = pd.ExcelWriter('Save_Excel.xlsx')
data_df.to_excel(writer,'page_1',float_format='%.5f') # float_format 控制精度
writer.save()
```


## python Science 风格画图
- 安装`pip install SciencePlots`

- 使用

```python
import matplotlib.pyplot as plt
import numpy as np
plt.style.use('science')
x = np.linspace(00,10,50)
y = np.sin(x)
y2 = np.cos(x)
plt.plot(x,y)
plt.plot(x,y2)
plt.show()
```

## matplotlib help文档
[地址](https://matplotlib.org/gallery.html)


![](/assets/images/contact.jpg)
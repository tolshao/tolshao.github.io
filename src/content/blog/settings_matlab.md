---
title: Matlab设置
categories: 设置备忘
tags:
  - matlab
  - snippets
id: "52406"
date: 2020-02-01
cover: "../image/settings_matlab/settings_matlab_cover.jpg"
typora-root-url: ../
top: false
recommend: false
---

## 代码片段snippets

* 保存pdf调整a4纸至合适大小

```
h = figure;
plot(1:10);
set(h,'Units','Inches');
pos = get(h,'Position');
set(h,'PaperPositionMode','Auto','PaperUnits','Inches','PaperSize',[pos(3), pos(4)])
print(h,'filename','-dpdf','-r0')
```
* 缺省参数默认值设定

```
function f(arg1, arg2, arg3)
if ~exist('arg2', 'var')
    arg2 = arg2Default;
end
```
*  [plot-legend多行设置](https://blog.csdn.net/ckzhb/article/details/81105384)

```
lgd1 = legend('第一条');
set(lgd1,'FontSize',12,'Location', 'SouthOutside','box','off','Fontname','times new roman');  
%注：将legend放在图外面时，Legend 1不能通过鼠标移动，只能通过代码调整位置 
% ============= Legend 2 :
ax2 = axes('position',get(gca,'position'),'visible','off');
lgd2 = legend(ax2, [p2 p3], '第二条', '第三条');
set(lgd2,'FontSize',12,'Location', 'SouthOutside','Orientation','horizontal','box','off','Fontname','times new roman');
```
Another way:
`legend({'cos(x)','cos(2x)','cos(3x)','cos(4x)'},'Location','northwest','NumColumns',2)`

* mac打开时闪退
`/Applications/Polyspace/R2019b.app/bin/matlab -nosplash`
* matlab-mex命令 10.15.4问题
`https://www.mathworks.com/matlabcentral/answers/512901-mex-xcodebuild-error-sdk-macosx10-15-4-cannot-be-located/?s_tid=mlc_lp_leaf`


## 绘制等高线

```
contour(u, v, z, [-0.5, -0.5], 'LineWidth', 2)
```
区间是zlim

![](../image/contact.jpg)
---
type: infographic
style: dark technical vector
aspect_ratio: 16:9
language: zh-CN
output: ../svpwm_speed_torque_zero_vector_map.png
---

Create a polished 16:9 dark technical vector infographic in Simplified Chinese for a motor-control blog article.

Topic: 根据转速与转矩工况，判断 SVPWM 零矢量选择策略。 The infographic must explain how speed and torque determine the dominant loss conflict: conduction loss vs switching loss, then decide whether to use upper clamping, lower clamping, or seven-segment λ allocation.

Main title at top:
“转速 × 转矩：SVPWM 零矢量选择地图”
Subtitle:
“扭矩看电流，转速看电压裕量；先判主要矛盾，再选 V0 / V7 / λ”

Layout:
- A clean two-axis quadrant chart.
- X-axis: “转速 / 电压裕量” from left “低速：T_Z 充足” to right “高速：T_Z 缩短 / 弱磁”.
- Y-axis: “转矩 / 电流” from bottom “低转矩：电流小” to top “高转矩：电流大”.
- Four large rounded cards inside quadrants.
- Each card must contain exactly three short rows: “工况”, “主要矛盾”, “对策”.

Quadrant contents:
1. Bottom-left card:
工况：低速 · 低转矩
主要矛盾：波形质量 / 噪声 / 采样稳定
对策：七段式，λ = 0.5，V0/V7 平衡
Visual icon: smooth sine wave, balanced scale between V0 and V7.
Color accent: green.

2. Top-left card:
工况：低速 · 高转矩
主要矛盾：导通损耗、二极管路径、温升
对策：比较 V0 与 V7 导通热；上桥臂热→下钳位/λ↑，下桥臂热→上钳位/λ↓
Visual icon: current arrow, warm chip, V0/V7 path split.
Color accent: amber.

3. Bottom-right card:
工况：高速 · 低转矩
主要矛盾：电压裕量、T_Z 变短、过调制边界
对策：七段式或常规限幅；λ 调温收益有限
Visual icon: speed gauge, small current bar, shrinking zero-vector window.
Color accent: blue.

4. Top-right card:
工况：高速 · 高转矩
主要矛盾：开关损耗、结温峰值、ΔT_j
对策：五段式/混合 DPWM；大电流相停止换向：正峰值→上钳位，负峰值→下钳位
Visual icon: hot IGBT, clamped phase window, switching event sparks reduced.
Color accent: red-orange.

Additional visual cue:
- Add a thin decision ribbon near the bottom: “低速看零矢量导通路径；高速高转矩优先减少大电流换向；七段式 λ 只在 T_Z 充足且约束允许时调温”.

Style:
- Dark navy background, subtle grid, electric blue axes, rounded quadrant panels.
- Technical but readable, like an engineering explainer diagram.
- Use simple schematic icons, not photorealistic.
- Text must be legible Simplified Chinese, no garbled characters, no tiny dense paragraphs.
- No logos, no watermark, no brand names.

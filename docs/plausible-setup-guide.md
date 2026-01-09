# Plausible Analytics 配置指南

## 概述

你的网站已经集成了 Plausible Analytics（通过 Toolify Box 托管），但还需要配置**转化目标**（Goals）来追踪用户行为。

**脚本位置**: `src/app/layout.tsx:96-101`
**域名**: `beeswarmsimulator.org`
**后台地址**: https://stats.toolifybox.com

---

## Phase 1: 设置转化目标（Goals）

### 为什么需要转化目标？

当前你只能看到**访客数量**，但不知道他们：
- 是否使用了工具？
- 是否复制了代码？
- 是否深度阅读了内容？

**转化目标让你看到**：哪些页面真正产生了价值！

---

### 四个核心转化目标

**⚠️ 重要提醒**: Plausible Community Edition（Toolify Box 托管版本）不支持带高级过滤器的 Pageview 目标（如访问时长、页面数过滤）。因此我们使用 **Custom Event** 方式实现所有目标。

按照以下步骤配置：

#### 1. **Tool Usage** - 工具使用（最重要）

**类型**: Custom Event
**事件名称**: `tool_used`
**触发时机**: 用户使用 Hive Builder/Calculator/Advisor 时
**业务价值**: 核心用户行为，这些用户最可能转化为长期用户

**配置步骤**:
1. 登录 https://stats.toolifybox.com
2. 选择站点 `beeswarmsimulator.org`
3. 点击左侧 **"Settings"** → **"Goals"**
4. 点击 **"+ Add Goal"**
5. 选择 **"Custom Event"**
6. 输入事件名称: `tool_used`
7. 点击 **"Add Goal"**

**验证方法**:
```bash
# 部署代码后，访问 /hive-builder 并使用工具
# 然后在 Plausible → Goals 页面应该能看到 tool_used 事件
```

---

#### 2. **Code Copy** - 代码复制

**类型**: Custom Event
**事件名称**: `code_copied`
**触发时机**: 用户在 /codes 页面点击复制按钮
**业务价值**: 验证 /codes 页面的实际价值（不仅是访问，而是真的使用）

**配置步骤**（同上）:
1. Settings → Goals → + Add Goal
2. Custom Event
3. 事件名称: `code_copied`
4. Add Goal

---

#### 3. **Deep Reading** - 深度阅读

**类型**: Custom Event
**事件名称**: `deep_reading`
**触发时机**: 用户在任何页面停留超过2分钟（120秒）时自动触发
**业务价值**: 内容质量指标，长时间停留说明内容有价值
**实现方式**: 通过 JavaScript 计时器自动追踪

**配置步骤**:
1. Settings → Goals → + Add Goal
2. 选择 **"Custom Event"**
3. 事件名称: `deep_reading`
4. Display Name: `Deep Reading`
5. Add Goal

---

#### 4. **Content Explore** - 内容探索

**类型**: Custom Event
**事件名称**: `content_explore`
**触发时机**: 用户在单次会话中访问第3个不同页面时触发
**业务价值**: 用户粘性指标，多页面浏览说明内容吸引人
**实现方式**: 通过 SessionStorage 追踪会话内的页面访问

**配置步骤**:
1. Settings → Goals → + Add Goal
2. 选择 **"Custom Event"**
3. 事件名称: `content_explore`
4. Display Name: `Content Explore`
5. Add Goal

---

## Phase 2: 验证配置是否生效

### 2.1 部署代码（如果还没部署）

```bash
# 在项目根目录
git add .
git commit -m "feat: Add conversion tracking and recommended tools"
git push origin main

# Vercel 会自动部署
# 等待2-3分钟部署完成
```

---

### 2.2 测试事件触发

**测试 `code_copied` 事件**:

1. 打开浏览器开发者工具（F12 或 Cmd+Option+I）
2. 切换到 **Network** 标签
3. 访问 https://beeswarmsimulator.org/codes
4. 点击任意代码的"复制"按钮
5. 在 Network 标签搜索 "plausible"
6. 应该能看到一个请求，URL 包含 `event=code_copied`

**示例截图**:
```
Request URL: https://stats.toolifybox.com/api/event
Payload:
{
  "n": "code_copied",
  "u": "https://beeswarmsimulator.org/codes",
  "d": "beeswarmsimulator.org",
  "p": { "code_type": "THNXCYASZRUS" }
}
```

---

### 2.3 在 Plausible 后台查看

**实时查看** (需要等待1-2分钟):
1. 登录 Plausible → 选择站点
2. 点击顶部的 **"Realtime"** 标签
3. 触发事件（如复制代码）
4. 应该能在 Realtime 中看到事件出现

**历史数据查看**:
1. 回到主仪表板
2. 点击左侧 **"Goals"**
3. 应该能看到：
   - `code_copied`（如果有人复制了代码）
   - `tool_used`（如果有人使用了工具）
   - Custom goals with time thresholds

---

## Phase 3: 理解转化数据

### 3.1 转化率计算

**公式**:
```
转化率 = (转化次数 / 总访客数) × 100%
```

**示例**:
- 总访客: 1,000
- `tool_used` 事件: 150次
- **工具使用率**: 150 / 1,000 = 15%

---

### 3.2 关键指标解读

| 指标 | 良好 | 需改进 | 差 |
|------|------|--------|-----|
| **Tool Usage Rate** | >20% | 10-20% | <10% |
| **Code Copy Rate** (/codes页面) | >50% | 30-50% | <30% |
| **Deep Reading Rate** | >15% | 5-15% | <5% |
| **Content Explore Rate** | >30% | 15-30% | <15% |

---

### 3.3 优化方向

**如果工具使用率<10%**:
- 问题：用户不知道工具的存在或价值
- 解决：在首页更突出地展示工具卡片
- 解决：在高流量页（/codes, /values）添加工具推荐（已完成✅）

**如果代码复制率<30%**:
- 问题：代码可能已过期，或复制按钮不明显
- 解决：更频繁地更新代码
- 解决：优化复制按钮UI（更显眼的颜色/位置）

**如果深度阅读率<5%**:
- 问题：内容不够吸引人，或页面加载太慢
- 解决：增加内容深度（更多图片、示例、详细说明）
- 解决：优化页面性能（Lighthouse 测试）

**如果内容探索率<15%**:
- 问题：内部链接不够，或下一步不清楚
- 解决：添加更多内部链接（已完成✅）
- 解决：在页面底部添加"相关内容"模块

---

## Phase 4: 高级功能（可选）

### 4.1 自定义属性（Props）

在追踪事件时，可以添加额外的属性来细分数据：

**示例**（代码中已实现）:
```typescript
trackCodeCopy('THNXCYASZRUS') // 记录具体是哪个代码被复制
trackToolUsage('hive-builder') // 记录是哪个工具被使用
```

**在 Plausible 中查看**:
1. Goals → 点击 `tool_used` 事件
2. 应该能看到 breakdown by `tool`:
   - hive-builder: 80次
   - calculator: 50次
   - advisor: 20次

这让你知道**哪个工具最受欢迎**！

---

### 4.2 漏斗分析（Funnels）

**目标**: 了解用户流失在哪里

**示例漏斗**（从访问到使用工具）:
```
访问首页（100%）
  ↓ (-40%)
访问工具页（60%）
  ↓ (-50%)
使用工具（30%）
```

**Plausible 设置**:
1. Goals → Create Funnel
2. 步骤1: Pageview `/`
3. 步骤2: Pageview `/hive-builder`
4. 步骤3: Custom Event `tool_used`

**优化方向**:
- 流失最多的步骤需要优先优化
- 例如：60%的人访问了工具页但没使用 → 可能是工具太复杂或不明显

---

### 4.3 实时告警（Slack/Email）

**场景**: 当某个目标突然激增/下降时收到通知

**Plausible设置**（如果支持）:
1. Settings → Notifications
2. 设置阈值：如"tool_used事件少于10次/天"时发送告警
3. 选择通知方式（Email/Slack）

**用途**:
- 发现问题更快（如代码全部过期了）
- 发现机会更快（如某个工具突然爆红）

---

## 常见问题

### Q: 为什么我看不到 Goals 菜单？
A: 确保你有该站点的 **Admin** 权限。如果是 Toolify Box 托管，联系他们获取权限。

### Q: 事件不触发怎么办？
A: 检查步骤：
1. 确认代码已部署（查看 Vercel 部署日志）
2. 打开开发者工具 → Network，看是否有请求发送到 `stats.toolifybox.com`
3. 检查浏览器是否阻止了 Plausible 脚本（广告拦截器可能会拦截）
4. 确认在 Plausible 后台正确添加了 Goal

### Q: 可以删除或修改已有的 Goal 吗？
A: 可以！在 Settings → Goals 页面，点击目标旁边的 **"Edit"** 或 **"Delete"** 按钮。

### Q: 历史数据会受影响吗？
A: 不会。添加 Goal 后，Plausible 会**追溯性地**分析历史数据（如果事件已经被触发过）。但自定义事件（Custom Event）只能从添加后开始追踪。

### Q: Plausible 会影响网站性能吗？
A: 几乎不会。Plausible 脚本非常轻量（<1KB），且使用异步加载，不会阻塞页面渲染。

---

## 下一步行动

**今天完成**:
- [ ] 登录 Plausible 后台
- [ ] 添加4个转化目标（Tool Usage, Code Copy, Deep Reading, Content Explore）
- [ ] 测试事件触发（开发者工具验证）

**本周完成**:
- [ ] 部署代码更新
- [ ] 24小时后查看 Goals 数据
- [ ] 根据转化率设定基线

**持续优化**:
- [ ] 每周一查看转化数据
- [ ] 识别低转化率页面
- [ ] 根据数据调整优化策略

---

## 总结

设置转化目标的价值：
1. **从"虚荣指标"到"行动指标"** - 不再只看访客数，而是看实际价值
2. **数据驱动决策** - 知道哪些改动有效，哪些无效
3. **发现机会** - 看到哪些页面转化率低，需要优化

**记住**: 转化率 > 访客数。100个转化的访客比1000个零转化的访客更有价值！

现在就去设置吧！🚀

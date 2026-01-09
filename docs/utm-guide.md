# UTM 参数使用指南

## 什么是 UTM 参数？

UTM (Urchin Tracking Module) 参数是添加在URL末尾的标签，用于追踪流量来源、媒介和活动。Plausible Analytics 会自动识别并分类这些参数。

## 标准格式

```
https://beeswarmsimulator.org/{page}?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}
```

## 参数定义

### `utm_source` (必需) - 流量来源

具体的网站或平台名称：

**社交媒体**：
- `reddit` - Reddit 平台
- `discord` - Discord 服务器
- `youtube` - YouTube 评论/描述
- `twitter` - Twitter/X
- `tiktok` - TikTok

**搜索引擎**：
- `google` - 付费Google广告（自然流量会自动标记）
- `bing` - 付费Bing广告

**其他来源**：
- `github` - GitHub README/文档
- `chatgpt` - ChatGPT 引用
- `email` - 邮件营销
- `newsletter` - 新闻通讯

### `utm_medium` (推荐) - 媒介类型

流量的传播方式：

- `social` - 社交媒体帖子
- `community` - 社区/论坛讨论
- `organic` - 自然分享
- `referral` - 网站链接
- `email` - 邮件链接
- `comment` - 评论区链接
- `video_description` - 视频描述

### `utm_campaign` (推荐) - 活动名称

具体的营销活动或主题：

**时间相关**：
- `launch_jan2026` - 2026年1月上线
- `winter_codes` - 冬季代码更新
- `summer_event` - 夏季活动

**功能相关**：
- `tool_launch` - 工具上线推广
- `codes_update` - 代码更新公告
- `value_guide` - 价值指南推广

**内容相关**：
- `tutorial` - 教程内容
- `guide` - 攻略指南
- `news` - 新闻公告

## 实际使用示例

### Reddit 帖子
```
https://beeswarmsimulator.org/hive-builder?utm_source=reddit&utm_medium=social&utm_campaign=jan_tool_launch
```

### Discord 分享
```
https://beeswarmsimulator.org/codes?utm_source=discord&utm_medium=community&utm_campaign=codes_update
```

### YouTube 评论
```
https://beeswarmsimulator.org/values?utm_source=youtube&utm_medium=comment&utm_campaign=value_guide
```

### GitHub README
```
https://beeswarmsimulator.org?utm_source=github&utm_medium=referral&utm_campaign=oss_project
```

## UTM 链接生成器

### 快速生成工具（命令行）

```bash
# 基础版本（只需修改参数值）
BASE_URL="https://beeswarmsimulator.org"
PAGE="/codes"
SOURCE="reddit"
MEDIUM="social"
CAMPAIGN="jan_launch"

echo "${BASE_URL}${PAGE}?utm_source=${SOURCE}&utm_medium=${MEDIUM}&utm_campaign=${CAMPAIGN}"
```

### 在线生成器（推荐）

使用 Google Analytics Campaign URL Builder：
https://ga-dev-tools.google/campaign-url-builder/

虽然是为 Google Analytics 设计的，但生成的 UTM 参数同样适用于 Plausible。

## 最佳实践

### ✅ 推荐做法

1. **保持一致性**
   - 使用小写字母
   - 用下划线 `_` 分隔单词（不要用空格或连字符）
   - 例如：`winter_codes` 而非 `WinterCodes` 或 `winter-codes`

2. **简洁明了**
   - 避免过长的参数值
   - `utm_source=reddit` 而非 `utm_source=reddit_bee_swarm_simulator_community`

3. **有意义的命名**
   - 让团队成员一眼就能理解
   - `utm_campaign=tool_launch` 而非 `utm_campaign=abc123`

4. **记录所有活动**
   - 在表格中记录使用的UTM组合
   - 方便后续分析和对比

### ❌ 避免的错误

1. **不要混用大小写**
   - `utm_source=Reddit` 和 `utm_source=reddit` 会被当作两个不同来源

2. **不要使用空格**
   - 空格会被编码为 `%20`，影响可读性
   - 用 `_` 或 `-` 替代

3. **不要过度细分**
   - 太多参数组合会让数据分散，难以分析
   - 专注于核心的5-10个活动即可

4. **不要忘记测试**
   - 发布前先点击链接，检查 Plausible 是否正确记录

## UTM 参数追踪表格

建议用表格记录所有 UTM 链接：

| 发布日期 | 平台 | 完整链接 | 预期目标 | 实际访客 | 转化数 |
|---------|------|---------|---------|---------|--------|
| 2026-01-09 | Reddit | beeswarmsimulator.org/codes?utm_source=reddit&utm_medium=social&utm_campaign=jan_launch | 100访客 | - | - |
| 2026-01-10 | Discord | beeswarmsimulator.org/hive-builder?utm_source=discord&utm_medium=community&utm_campaign=tool_share | 50访客 | - | - |

## 在 Plausible 中查看 UTM 数据

1. 登录 Plausible 后台：https://stats.toolifybox.com
2. 选择 beeswarmsimulator.org 站点
3. 查看以下报告：
   - **Sources** - 看 `utm_source` 的流量分布
   - **UTM Medium** - 看 `utm_medium` 的效果
   - **UTM Campaign** - 看各个活动的表现
   - **UTM Source** - 细分的来源数据

## 常见问题

### Q: UTM 参数会影响 SEO 吗？
A: 不会。搜索引擎会忽略 UTM 参数，只索引主URL。

### Q: 如果用户删除了 UTM 参数怎么办？
A: 流量会被记录为 Direct（直接访问），无法追踪来源。这是正常现象。

### Q: 可以添加自定义参数吗（如 utm_content）？
A: 可以，但 Plausible 默认只追踪5个标准参数：source, medium, campaign, content, term。建议专注于前3个核心参数。

### Q: 内部链接需要 UTM 参数吗？
A: 不需要。UTM 只用于**外部流量**追踪。网站内部的链接不要加 UTM。

## 总结

**记住3个核心原则**：
1. 每个外部链接都加 UTM
2. 保持命名一致性
3. 用表格记录和分析

这样你就能准确知道哪些推广渠道最有效，把精力集中在高ROI的地方！

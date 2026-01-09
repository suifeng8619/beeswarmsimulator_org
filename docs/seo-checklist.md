# SEO 优化清单

## 目标

**当前状况** (2026-01-08):
- Bing流量: 63% (1,269访客) ✅ 优势
- Google流量: 5% (105访客) ⚠️ 劣势
- Yahoo流量: 12% (239访客)

**6周目标**:
- Google流量提升至 20% (400+访客)
- 保持 Bing 优势
- 总流量增长 150%

---

## Phase 1: Google Search Console 设置

### 1.1 验证域名所有权 ✓

**方法1: HTML文件验证**
1. 登录 [Google Search Console](https://search.google.com/search-console)
2. 添加资源 → 网址前缀 → 输入 `https://beeswarmsimulator.org`
3. 选择"HTML文件"验证方式
4. 下载 `google[hash].html` 文件
5. 上传到 `/public/` 目录
6. 点击"验证"

**方法2: HTML标签验证**（推荐，Next.js项目）
1. 选择"HTML标签"验证方式
2. 复制 `<meta>` 标签
3. 添加到 `src/app/layout.tsx` 的 `<head>` 部分：
```tsx
<meta name="google-site-verification" content="your-verification-code" />
```
4. 部署后点击"验证"

---

### 1.2 提交 Sitemap

**检查当前 Sitemap**:
```bash
curl https://beeswarmsimulator.org/sitemap.xml
```

**提交到 Google**:
1. Google Search Console → Sitemaps（左侧菜单）
2. 输入: `sitemap.xml`
3. 点击"提交"

**预期结果**:
- 状态显示"成功"
- 发现的URL数量应该匹配实际页面数

---

### 1.3 请求索引核心页面

在 Google Search Console → URL检查工具，逐个检查并请求索引：

**优先级P0**（立即索引）:
- [ ] `https://beeswarmsimulator.org/`
- [ ] `https://beeswarmsimulator.org/codes`
- [ ] `https://beeswarmsimulator.org/hive-builder`
- [ ] `https://beeswarmsimulator.org/values`

**优先级P1**（本周内）:
- [ ] `https://beeswarmsimulator.org/calculator`
- [ ] `https://beeswarmsimulator.org/bees`
- [ ] `https://beeswarmsimulator.org/advisor`

**操作步骤**:
1. 粘贴URL → 回车
2. 如果"URL未在Google中" → 点击"请求索引"
3. 等待1-2分钟确认提交

---

### 1.4 修复索引问题

查看 **Coverage 报告** (Google Search Console → Coverage):

**常见问题和解决方案**:

| 错误类型 | 可能原因 | 解决方法 |
|---------|---------|---------|
| 已排除：发现 - 尚未编入索引 | 页面太新，Google还未爬取 | 使用"请求索引"手动提交 |
| 已排除：Robots.txt阻止 | robots.txt文件配置错误 | 检查 `/public/robots.txt` |
| 已排除：noindex标签 | 页面元数据包含noindex | 检查 `metadata` 对象 |
| 错误：服务器错误 (5xx) | 服务器问题或超时 | 检查 Vercel 部署日志 |
| 已排除：软404错误 | 页面内容太少 | 增加内容丰富度 |

---

## Phase 2: On-Page SEO 优化

### 2.1 标题标签优化

**公式**: `[关键词] | [修饰词] | [品牌名]`

**当前 vs 优化后**:

| 页面 | 当前标题 | 优化后标题 | 原因 |
|------|---------|-----------|------|
| /codes | `Active Codes` | `Bee Swarm Simulator Codes (2026) - All Working BSS Codes` | 添加年份+主关键词 |
| /hive-builder | `Hive Builder` | `Free Hive Builder Tool - Plan Your BSS Layout` | 强调"免费"+描述功能 |
| /values | `Value List` | `BSS Value List (2026) - Sticker & Beequip Prices` | 添加年份+明确内容 |
| / (首页) | `BSS Nexus` | `Bee Swarm Simulator Tools & Guides - Free BSS Resources` | 更清晰的价值主张 |

**实施方法**:
修改各页面的 `metadata` 对象：

```tsx
// src/app/codes/page.tsx
export const metadata: Metadata = {
  title: 'Bee Swarm Simulator Codes (2026) - All Working BSS Codes',
  // ...
}
```

---

### 2.2 Meta Description 优化

**公式**: `[行动召唤] + [核心价值] + [独特卖点]`（120-155字符）

**优化示例**:

```tsx
// 当前
description: 'All working Bee Swarm Simulator codes for 2026. Get free honey, tickets, royal jelly, boosts, and more rewards! Updated regularly.'

// 优化后
description: 'Get free rewards with 15+ active BSS codes (updated daily). Copy & redeem for honey, tickets, royal jelly, boosts. No login required!'
```

**为什么更好？**
- 添加数字（"15+ codes"）→ 具体化
- 强调"No login"→ 降低摩擦
- 使用行动词（"Get", "Copy", "Redeem"）→ 提升点击率

---

### 2.3 H1/H2 标签优化

**当前问题**: H1标签太短（如"Active Codes"）

**优化方案**:

```tsx
// 之前
<h1 className="text-3xl font-bold">Active Codes</h1>

// 优化后
<h1 className="text-3xl font-bold">
  Bee Swarm Simulator Codes (2026)
  <span className="block text-lg text-muted-foreground mt-2">
    All Working BSS Codes - Updated Daily
  </span>
</h1>
```

**H2 标签策略**:
- 使用关键词变体（"BSS codes", "Roblox codes", "free rewards"）
- 回答常见问题（"How to redeem codes?", "Why is my code not working?"）

---

### 2.4 内容丰富度提升

**目标**: 每个核心页面至少 800 字

**当前状况**:
- /codes: ~500字 → 需要增加300字
- /values: ~200字 → 需要增加600字
- /hive-builder: ~150字 → 需要增加650字

**内容扩展方向**:

**For /codes**:
- [ ] 添加"代码历史"部分（过去最有价值的代码）
- [ ] 添加"新手指南"（第一次玩应该先用哪些代码）
- [ ] 添加"高级技巧"（如何最大化代码价值）

**For /values**:
- [ ] 添加"交易技巧"部分
- [ ] 添加"市场趋势分析"（哪些物品升值最快）
- [ ] 添加"新手vs老手推荐"（不同阶段该收集什么）

**For /hive-builder**:
- [ ] 添加"布局策略指南"
- [ ] 添加"常见错误"
- [ ] 添加"进阶优化技巧"

---

### 2.5 结构化数据（Schema Markup）

**已有的结构化数据**（保持）:
- BreadcrumbList ✓
- ItemList ✓

**建议添加**:

**1. FAQPage Schema** (for /codes FAQ section):
```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Why is my code not working?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Codes are case-sensitive..."
    }
  }]
}
</script>
```

**2. SoftwareApplication Schema** (for /hive-builder):
```tsx
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "BSS Hive Builder",
  "applicationCategory": "GameApplication",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
}
```

---

## Phase 3: Off-Page SEO（外链建设）

### 3.1 优质外链来源（零预算）

**立即可做**:
- [ ] 在 r/BeeSwarmSimulator 发帖（Reddit Do-Follow链接）
- [ ] 在 BSS Discord 服务器签名中添加网站链接
- [ ] 在 GitHub profile README 中添加链接

**需要时间建设**:
- [ ] 联系 BSS YouTubers，请求在视频描述中添加链接
- [ ] 在 Roblox group description 中添加链接
- [ ] 贡献到 BSS Wiki（如果有官方Wiki）

### 3.2 内部链接优化

**策略**: 高权重页面 → 低权重页面

**实施**:
```
首页 (highest authority)
  ↓ link to
/codes, /hive-builder, /values (medium authority)
  ↓ link to
/bees/[slug], /stickers/[slug] (lowest authority)
```

**具体操作**:
- [x] 在首页添加3个核心工具卡片（已有）
- [x] 在 /codes 底部添加推荐工具（已完成）
- [x] 在 /values 底部添加推荐工具（已完成）
- [ ] 在 /bees 页面添加"相关装备"链接

---

## Phase 4: 技术SEO

### 4.1 速度优化

**当前性能检查**:
```bash
# 使用 Lighthouse CI
npx lighthouse https://beeswarmsimulator.org --view
```

**目标分数**:
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: 100

**常见优化**:
- [ ] 图片懒加载（Next.js Image 自动处理）
- [ ] 字体优化（使用 next/font）
- [ ] 减少未使用的 JavaScript
- [ ] 启用 Brotli 压缩（Vercel 自动支持）

---

### 4.2 移动端友好性

**测试工具**:
- Google Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- 输入网址 → 检查所有核心页面

**常见问题**:
- 文字太小（<16px）
- 点击目标太小（<48px）
- 内容宽度超出屏幕

**Next.js 已帮你做好的**:
- ✅ 响应式视口（viewport meta tag）
- ✅ 触摸友好的按钮尺寸（Tailwind 默认）
- ✅ 自适应图片（next/image）

---

### 4.3 HTTPS 和安全性

**检查项**（Vercel 自动处理）:
- [x] HTTPS 启用
- [x] SSL 证书有效
- [x] 混合内容警告（无）
- [x] 安全标头（CSP, X-Frame-Options）

---

## Phase 5: 关键词研究和优化

### 5.1 主要关键词（Focus Keywords）

**当前排名追踪**（使用 Google Search Console）:

| 关键词 | 搜索量 | 难度 | 当前排名 | 目标排名 |
|-------|--------|------|---------|---------|
| bee swarm simulator codes | High | Medium | ? | Top 3 |
| bss codes 2026 | High | Low | ? | #1 |
| bee swarm hive builder | Medium | Low | ? | Top 5 |
| bss value list | Medium | Medium | ? | Top 5 |
| bee swarm sticker values | Low | Low | ? | Top 3 |

**如何查看当前排名**:
1. Google Search Console → Performance
2. 筛选查询（Queries）
3. 查看平均排名（Position）

---

### 5.2 长尾关键词策略

**优势**: 竞争低、转化高、更容易排名

**示例**:

| 主关键词 | 长尾变体 | 优化页面 |
|---------|---------|---------|
| bss codes | "bee swarm simulator codes that work 2026" | /codes |
| hive layout | "best hive layout for mid game bee swarm" | /hive-builder + blog |
| sticker values | "what is gummy gumdrop sticker worth" | /stickers/[slug] |

**实施**: 在博客/指南内容中自然使用这些长尾词

---

### 5.3 关键词密度检查

**工具**: https://www.seoreviewtools.com/keyword-density-checker/

**目标密度**:
- 主关键词: 1-2%
- 次要关键词: 0.5-1%

**避免过度优化**: 不要为了 SEO 而堆砌关键词，保持自然阅读

---

## Phase 6: 本地优化（如果适用）

**注意**: BSS 是全球性游戏，不需要本地 SEO。但如果未来添加多语言支持：

### 6.1 多语言 SEO

**优先语言**（基于当前流量）:
1. 英语（主要）
2. 越南语（7.1% 流量）
3. 菲律宾语（4.8% 流量）

**实施方案**:
```tsx
// next.config.ts
i18n: {
  locales: ['en', 'vi', 'fil'],
  defaultLocale: 'en',
}
```

**hreflang 标签**:
```html
<link rel="alternate" hreflang="en" href="https://beeswarmsimulator.org/codes" />
<link rel="alternate" hreflang="vi" href="https://beeswarmsimulator.org/vi/codes" />
```

---

## Week-by-Week 执行计划

### Week 1: 基础设置
- [x] ~~Google Search Console 验证~~（今天完成）
- [ ] 提交 Sitemap
- [ ] 请求索引核心页面（P0）
- [ ] 修改标题标签（codes, values, hive-builder）

### Week 2: 内容优化
- [ ] 优化 Meta Descriptions
- [ ] 增加 /codes 页面内容（+300字）
- [ ] 添加 FAQ Schema
- [ ] 请求索引次要页面（P1）

### Week 3: 外链建设
- [ ] 发布 Reddit 主帖 (#1)
- [ ] 在 Discord 签名添加链接
- [ ] 联系2-3个 BSS YouTubers

### Week 4: 技术优化
- [ ] Lighthouse 性能测试
- [ ] 修复发现的问题
- [ ] Mobile-Friendly 测试

### Week 5-6: 内容扩展
- [ ] 增加 /values 内容
- [ ] 增加 /hive-builder 内容
- [ ] 创建第一篇博客文章（长尾关键词）

---

## 效果追踪

### 关键指标（每周一检查）

**Google Search Console**:
- **Clicks** (点击数) - 目标: 每周增长10%
- **Impressions** (展示数) - 目标: 每周增长20%
- **CTR** (点击率) - 目标: >3%
- **Position** (平均排名) - 目标: 前20名

**Plausible Analytics**:
- **Google 流量占比** - 目标: 从5% → 20%
- **Organic Search 总流量** - 目标: 1,740 → 3,000+
- **平均停留时间** - 目标: >2分钟

### 记录模板

| 周数 | Google点击 | Google展示 | CTR | 平均排名 | 备注 |
|-----|-----------|-----------|-----|---------|-----|
| W1  | -         | -         | -   | -       | Baseline |
| W2  |           |           |     |         |      |
| W3  |           |           |     |         |      |
| W4  |           |           |     |         |      |

---

## 常见问题

### Q: 为什么 Google 流量这么少，Bing 却很高？
A: 新站在 Bing 上更容易获得排名。Google 需要更多时间建立信任。持续优化3-6个月后会看到明显增长。

### Q: 多久能看到SEO效果？
A:
- **短期** (2-4周): Google 索引提升，impressions 增加
- **中期** (6-8周): 排名进入前50名，clicks 开始增长
- **长期** (3-6个月): 排名稳定在前10名，流量显著提升

### Q: 需要付费工具吗？
A: 不需要。Google Search Console 和 Plausible 已经足够。如果预算允许，可以考虑 Ahrefs/SEMrush（$99+/月），但不是必需的。

### Q: 竞争对手在排名第一，我怎么超越？
A:
1. 分析对手页面（内容长度、关键词使用、外链数量）
2. 创建更好的内容（更全面、更新、更有用）
3. 建立更多优质外链
4. 优化用户体验（速度、移动端）
5. 耐心等待（可能需要3-6个月）

---

## 禁止的黑帽SEO技术 ⚠️

**绝对不要做**:
- ❌ 购买外链（会被Google惩罚）
- ❌ 关键词堆砌（降低可读性和排名）
- ❌ 隐藏文本（CSS hide）
- ❌ 自动生成的无意义内容
- ❌ 伪装（Cloaking）- 给搜索引擎看不同内容
- ❌ 负面SEO攻击竞争对手

**后果**: Google 会将网站降权或从索引中移除

---

## 总结：SEO是长期游戏

**记住**:
1. **内容为王** - 优质内容最终会获得排名
2. **耐心** - SEO需要3-6个月才能看到显著效果
3. **持续优化** - 每周执行清单，逐步改进
4. **用户优先** - 为用户优化，排名自然会提升

**下一步**: 打勾完成Week 1的任务，然后每周回顾这个清单！

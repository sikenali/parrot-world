# 移动端图片响应式优化 — 设计文档

日期：2026-08-04
状态：已批准

## 背景

博客为女儿宠物「紫米」（牡丹鹦鹉）的照片/日记站，移动端是主要访问场景。当前所有图片都直接使用 `content` 中 Pexels URL 的原始 `w` 参数（照片墙 `w=800`、lightbox 也 `w=800`），手机上全屏宽约 390px，请求 `w=800` 的图明显浪费流量（每张约省一半以上可降为 `w=400`），lightbox 点开却仍是低清大图。

## 目标

- 移动端照片墙缩略图按屏幕宽度请求合适分辨率，节省流量
- lightbox 打开时加载高清大图，观感提升
- 桌面端行为不退化
- 低风险、可回滚：不改 content 源数据、不改 loader、不改 types

## 方案

Pexels URL 天然支持 `?w=` 参数输出任意分辨率（现有图片如
`https://images.pexels.com/photos/37018701/pexels-photo-37018701.jpeg?auto=compress&cs=tinysrgb&w=800`）。

新增工具函数按用途生成目标尺寸，配合 `srcset`/`sizes` 让浏览器按屏幕宽自动选档。

## 设计

### 1. 新增 `src/utils/img.ts`

```ts
export function imgSrc(url: string, w: number): string
```

- 若 URL 含 `w=\d+` → 用 `w=${w}` 替换
- 不含 `w=` → 按已有查询参数追加或新建 `?w=${w}`
- URL 为空 → 原样返回（安全）

### 2. 各图片用途尺寸档位

| 用途 | 位置 | 尺寸策略 |
|---|---|---|
| 照片墙缩略图 | `PhotoPage.tsx` | `srcset`：`400w`/`800w`，`sizes="(max-width:900px) 50vw, 25vw"`，`src` 兜底 `600` |
| Lightbox 高清大图 | `PhotoLightbox.tsx` | `imgSrc(photo.src, 1400)` |
| 文章列表封面 | `BlogPage.tsx` | `srcset`：`400w`/`800w`，`sizes="(max-width:480px) 100vw, 200px"` |
| 文章详情大图 | `PostDetail.tsx` | 已用 `w=1200`，保留不动 |
| Hero / About 头图 | `Hero.tsx` / `AboutPage.tsx` | 已 `w=1200`，保留不动 |

### 3. 数据流

`content/*.md` 源 URL、`src/data/loader.ts`、`src/types` 均不改动。尺寸派生只发生在渲染层。

### 4. 防布局抖动

照片墙有 `grid-auto-rows` 固定行高 + `object-fit: cover`，文章封面有 `min-height:160px`，加载时无布局跳动，无需额外宽高比锁定。非首屏图片已带 `loading="lazy"` 的保持不动。

### 5. 验证

- `npm run build` 成功
- `npx tsc --noEmit` 无类型错误
- CDP 无头验证：照片墙 `<img>` 含正确 `srcset` 属性；lightbox 打开时请求 `w=1400` URL

## 不做的事（YAGNI）

- 不自建缩略图 pipeline（Pexels 已支持按参数出图）
- 不引入抽象 `<ResponsiveImg>` 组件（对当前规模过重）
- 不改 content 源数据 / loader / types
- 不做组件级代码拆分

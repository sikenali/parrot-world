# 移动端图片响应式优化 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 通过 Pexels `?w=` 参数按用途生成目标分辨率，配合 `srcset`/`sizes` 让照片墙与文章封面按屏幕宽自动选档，lightbox 加载高清大图，减少移动端流量。

**Architecture:** 新增纯函数 `imgSrc(url, w)`（替换/追加 Pexels `w=` 参数）；`PhotoPage.tsx` 照片墙加 `srcset`+`sizes`、`PhotoLightbox.tsx` 用 `w=1400` 高清档、`BlogPage.tsx` 封面加 `srcset`+`sizes`。content 源数据、loader、types 不动。`imgSrc` 用 vitest 做 TDD，组件层用 Chrome CDP 无头验证。

**Tech Stack:** React 18 + TypeScript + Vite 7，新增 devDependency: vitest。

**重要环境说明：**
- 本机为 Windows + PowerShell 5.1。**不要用 `Get-Content`/`Select-String` 读取含中文的文件**（GBK 控制台会假性乱码）；读文件用 Read 工具或 `node -e` 读 UTF-8。
- 验证命令：`npm run build`（含 `tsc`）、`npx vitest run`、CDP 无头脚本（`C:\Users\jingle\AppData\Local\Temp\opencode\cdp_test.mjs` 模式）。
- 提交信息用中文，风格参考 `git log`。

---

### Task 1: 引入 vitest 测试框架

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/utils/img.test.ts`

- [ ] **Step 1: 安装 vitest**

```bash
npm install -D vitest
```

Expected: `vitest` 出现在 `package.json` devDependencies，`node_modules/vitest` 生成。

- [ ] **Step 2: 创建 vitest 配置**

`vitest.config.ts`：

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 3: 添加测试脚本**

修改 `package.json` 的 `"scripts"`，新增：

```json
"test": "vitest run"
```

- [ ] **Step 4: 提交**

```bash
git add package.json package-lock.json vitest.config.ts src/utils/img.test.ts
git commit -m "引入 vitest 测试框架"
```

> 注：`src/utils/img.test.ts` 此时还是空的占位文件，Task 2 会填充真实测试；若不想提交空文件，可改为 Task 2 完成后再一并提交，二选一均可。

---

### Task 2: TDD 实现 imgSrc 纯函数

**Files:**
- Create: `src/utils/img.ts`
- Create: `src/utils/img.test.ts`

- [ ] **Step 1: 写失败测试**

`src/utils/img.test.ts`：

```ts
import { describe, it, expect } from 'vitest';
import { imgSrc } from './img';

describe('imgSrc', () => {
  it('replaces existing w= query param', () => {
    expect(imgSrc('https://example.com/a.jpg?auto=compress&w=800', 400))
      .toBe('https://example.com/a.jpg?auto=compress&w=400');
  });

  it('appends w= when no query string exists', () => {
    expect(imgSrc('https://example.com/a.jpg', 400))
      .toBe('https://example.com/a.jpg?w=400');
  });

  it('appends w= when query string has no w', () => {
    expect(imgSrc('https://example.com/a.jpg?auto=compress', 400))
      .toBe('https://example.com/a.jpg?auto=compress&w=400');
  });

  it('returns empty string for empty input', () => {
    expect(imgSrc('', 400)).toBe('');
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npx vitest run src/utils/img.test.ts`
Expected: FAIL，报 `Cannot find module './img'` 或 `imgSrc is not defined`。

- [ ] **Step 3: 实现 imgSrc**

`src/utils/img.ts`：

```ts
export function imgSrc(url: string, w: number): string {
  if (!url) return url;
  const sep = url.includes('?') ? '&' : '?';
  if (/[?&]w=\d+/.test(url)) {
    return url.replace(/([?&])w=\d+/, `$1w=${w}`);
  }
  return `${url}${sep}w=${w}`;
}
```

- [ ] **Step 4: 运行测试确认通过**

Run: `npx vitest run src/utils/img.test.ts`
Expected: PASS，4 个用例全绿。

- [ ] **Step 5: 提交**

```bash
git add src/utils/img.ts src/utils/img.test.ts
git commit -m "新增 imgSrc 工具：按目标宽度生成 Pexels 图片 URL"
```

---

### Task 3: 照片墙响应式 srcset/sizes

**Files:**
- Modify: `src/components/PhotoPage.tsx:85`
- Verify: `src/index.css`（photo-wall-grid 断点无需改动）

- [ ] **Step 1: 修改照片墙 img 标签**

将 `src/components/PhotoPage.tsx` 第 85 行的：

```tsx
<img src={p.src} alt={p.caption} loading="lazy" decoding="async" />
```

改为：

```tsx
<img
  src={imgSrc(p.src, 600)}
  srcSet={`${imgSrc(p.src, 400)} 400w, ${imgSrc(p.src, 800)} 800w`}
  sizes="(max-width: 900px) 50vw, 25vw"
  alt={p.caption}
  loading="lazy"
  decoding="async"
/>
```

同时在文件顶部 import 区加入：

```tsx
import { imgSrc } from '../utils/img';
```

> 尺寸依据：900px 断点以下照片墙 2 列（约 50vw），以上 4 列（约 25vw）。`src` 兜底 `600` 覆盖无 srcset 支持的场景。

- [ ] **Step 2: 构建验证**

Run: `npm run build`
Expected: `tsc && vite build` 成功，无类型错误。

- [ ] **Step 3: 提交**

```bash
git add src/components/PhotoPage.tsx
git commit -m "照片墙缩略图改为响应式 srcset/sizes 按屏宽选档"
```

---

### Task 4: Lightbox 高清大图

**Files:**
- Modify: `src/components/PhotoLightbox.tsx:39`

- [ ] **Step 1: 修改 lightbox img src**

将 `src/components/PhotoLightbox.tsx` 第 39 行的：

```tsx
<img src={photo.src} alt={photo.caption} className="lightbox-img" />
```

改为：

```tsx
<img src={imgSrc(photo.src, 1400)} alt={photo.caption} className="lightbox-img" />
```

并加 import：

```tsx
import { imgSrc } from '../utils/img';
```

- [ ] **Step 2: 构建验证**

Run: `npm run build`
Expected: 成功，无类型错误。

- [ ] **Step 3: 提交**

```bash
git add src/components/PhotoLightbox.tsx
git commit -m "Lightbox 大图升级为 w=1400 高清档"
```

---

### Task 5: 文章列表封面响应式

**Files:**
- Modify: `src/components/BlogPage.tsx:13`

- [ ] **Step 1: 修改 PostCard 封面 img**

将 `src/components/BlogPage.tsx` 第 13 行的：

```tsx
<img src={post.cover} alt={post.title} className="post-cover" loading="lazy" />
```

改为：

```tsx
<img
  src={imgSrc(post.cover, 600)}
  srcSet={`${imgSrc(post.cover, 400)} 400w, ${imgSrc(post.cover, 800)} 800w`}
  sizes="(max-width: 480px) 100vw, 200px"
  alt={post.title}
  className="post-cover"
  loading="lazy"
/>
```

并加 import：

```tsx
import { imgSrc } from '../utils/img';
```

> 尺寸依据：480px 断点以下 post-card 单列（约 100vw），以上封面固定 200px 列宽（900px 断点内为 140px，取 200px 保守档）。

- [ ] **Step 2: 构建验证**

Run: `npm run build`
Expected: 成功，无类型错误。

- [ ] **Step 3: 提交**

```bash
git add src/components/BlogPage.tsx
git commit -m "文章封面改为响应式 srcset/sizes"
```

---

### Task 6: 单元测试全量通过

- [ ] **Step 1: 跑全部单元测试**

Run: `npx vitest run`
Expected: PASS，4 个用例。

- [ ] **Step 2: 类型检查**

Run: `npx tsc --noEmit`
Expected: 无错误（npm warn 的 electron mirror 配置警告可忽略）。

- [ ] **Step 3: 全量构建**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 4: 提交（如测试脚本新增时已提交过则跳过）**

```bash
git status --short
```

如有未提交改动，提交之。

---

### Task 7: CDP 无头端到端验证

**Files:**
- Create (临时): `C:\Users\jingle\AppData\Local\Temp\opencode\cdp_test.mjs`
- Verify: `dist` 产物 + 本地 preview

- [ ] **Step 1: 启动本地 preview**

```powershell
Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run preview > preview5.log 2>&1" -WindowStyle Hidden
Start-Sleep -Seconds 2
(Invoke-WebRequest "http://localhost:4173/photos" -UseBasicParsing -TimeoutSec 10).StatusCode
```

Expected: `200`。

- [ ] **Step 2: 编写 CDP 验证脚本**

在 `C:\Users\jingle\AppData\Local\Temp\opencode\cdp_test.mjs` 写一个脚本（参考此前已有的 CDP 模式）：启动 headless Chrome（`--remote-debugging-port` 随机端口 + 独立 `--user-data-dir`），`Emulation.setDeviceMetricsOverride` 设 390×844 mobile，`Page.navigate` 到 `http://localhost:4173/photos`，等待约 6 秒，然后 `Runtime.evaluate` 断言：

```js
JSON.stringify({
  firstSrc: document.querySelector('.photo-card img').src,
  firstSrcset: document.querySelector('.photo-card img').getAttribute('srcset'),
  firstSizes: document.querySelector('.photo-card img').getAttribute('sizes'),
})
```

Expected:
- `firstSrc` 含 `w=600`
- `firstSrcset` 含 `400w` 与 `800w`
- `firstSizes` 等于 `(max-width: 900px) 50vw, 25vw`

- [ ] **Step 3: 验证 lightbox 高清档**

同一脚本内继续点击第一张照片（`document.querySelector('.photo-card').click()`），等待 1 秒，再断言：

```js
JSON.stringify({ lightboxSrc: document.querySelector('.lightbox-img').src })
```

Expected: `lightboxSrc` 含 `w=1400`。

- [ ] **Step 4: 验证文章封面**

`Page.navigate` 到 `http://localhost:4173/daily`，等待 4 秒，断言第一张 `.post-cover`：

Expected: `src` 含 `w=600`，`srcset` 含 `400w`/`800w`。

- [ ] **Step 5: 清理**

杀掉测试用的 chrome 进程与 preview 进程（`Get-Process chrome,node | Stop-Process -Force`）。临时脚本留在 Temp 目录不入库。

---

### Task 8: 推送并线上抽查

- [ ] **Step 1: 检查工作区干净**

Run: `git status --short`
Expected: 无未提交改动（Task 1-7 各步均已提交）。

- [ ] **Step 2: 推送到远端**

```bash
git push origin master
```

Expected: 成功，`master -> master`。

- [ ] **Step 3: 线上 CSS/资源抽查（等 Vercel 部署约 1-2 分钟）**

```powershell
$r = Invoke-WebRequest "https://parrotworld.10012049.xyz/photos" -UseBasicParsing -TimeoutSec 20
$r.Content -match "srcset"
```

Expected: `True`（照片墙图片已带 srcset）。

- [ ] **Step 4: 最终确认提交链**

Run: `git log --oneline -8`
Expected: 能看到本计划的各个中文提交信息（imgSrc、照片墙、lightbox、封面等）。

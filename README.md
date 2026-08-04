# 鹦鹉世界 · 紫米的小窝

为女儿的小宠物「紫米」创建的私人博客。紫米是一只牡丹鹦鹉，每天的日常、成长的点滴、好玩的小事，都记在这里。

## 功能

- 博客文章：记录紫米的日常趣事与成长故事
- 照片墙：紫米的生活照片，支持标签筛选与灯箱浏览
- 站点数据：作者信息、滚动公告等内容配置化
- 后台管理：通过 Sveltia CMS 在 GitHub 上直接管理和发布

## 技术栈

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [React Router](https://reactrouter.com/) 页面路由
- [Sveltia CMS](https://sveltiacms.app/) 后台内容管理
- 内容使用 Markdown / YAML 编写，构建时打包进站点
- 部署于 Vercel，绑定自有域名 `parrotworld.10012049.xyz`

## 目录结构

```
.
├── content/          # 博客内容（Markdown / YAML）
│   ├── posts/        # 文章
│   ├── photos/       # 照片
│   └── settings/     # 站点设置（作者信息、公告）
├── public/
│   └── admin/        # Sveltia CMS 后台页面
├── src/              # 前端源码
└── vercel.json       # 部署配置
```

## 本地开发

```bash
npm install      # 安装依赖
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览构建产物
```

## 添加内容

- 文章：在 `content/posts/` 下新增一个 `.md` 文件（带 frontmatter）
- 照片：在 `content/photos/` 下新增一个 `.md` 文件
- 或用后台 `/admin` 直接可视化编辑

## 许可

仅用于个人与家庭，保留所有权利。
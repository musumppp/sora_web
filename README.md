# 水无月空站

> 为《BALDR SKY DIVE》角色 **水无月空** 建立的个人档案站

鉴于 BALDR SKY DIVE 是一个小众作品，相关创作稀少且分散，设立此站，
希望能为喜爱空的访客，提供一个可持续访问的存档点。

**这是一个非营利、纯为爱发电运作的站点。**

---

## 功能

| 板块 | 说明 |
|---|---|
| **看板娘 MiniSora** | 按早 / 中 / 晚 / 半夜时段随机问候，原生 JS 实现 |
| **签到日历** | 记录你对空的喜爱 |
| **创作资源** | 分类整理 AI 模型、游戏资源、同人创作 |
| **相册** | 无限滚动浏览立绘与 CG |
| **留言板** | 访客留言 |
| **背景音乐** | 极简自定义播放器，可拖拽，带进度与音量调节 |

## 技术栈

**前端**
Vue 3.5 · Vite 8 · Pinia 3 · Vue Router 4
dayjs · vue3-lazyload · vue-easy-lightbox · @vueuse/core

**后端**
FastAPI（测试环境）· Spring Boot（正式环境）
SQLite（测试）· PostgreSQL（正式）· Redis

**部署**
Docker · Nginx

## 本地运行

```bash
npm install
npm run dev
```

开发环境自带**本地测试数据层**（`src/mock/`），没有后端也能看到完整页面：

- 开关在 `src/mock/index.js` 顶部的 `MOCK_ENABLED`
- 浏览器控制台可用 `__mock.login()` / `__mock.logout()` 切换登录态

> ⚠️ `src/mock/`、`src/assets/bgm/`、`src/assets/images/` 因为**体积和版权原因
> 未纳入版本控制**，clone 后这些目录是空的。
> 需要自行补齐素材；或者注释掉 `src/main.js` 里对 mock 的那行引入，再接你自己的后端。

## 构建与部署

```bash
npm run build      # 产物输出到 dist/
npm run preview    # 本地预览产物
```

路由使用的是 **History 模式**，所以 Nginx 必须配好这两段，否则会出现
「刷新子页面 404」和「所有接口 404」：

```nginx
server {
    location / {
        try_files $uri $uri/ /index.html;          # SPA 回退
    }
    location ~ ^/(log|album|resource)/ {
        proxy_pass http://后端地址;                 # 接口反向代理
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 关于

本站由 **暮双** 开发维护，站内素材多为站长自行整理、修复与制作，
仅供学习交流，请勿用于商业用途。

<template>
  <div id="about_page">
   <div class="about-wrap">

    <!-- ① 页头 -->
    <div class="about-hero">
      <h1 class="hero-title">水无月 空 站</h1>
      <p class="hero-sub">本站由暮双开发维护，旨在记录对水无月空的热爱</p>

      <a class="gh-btn"
         :class="{ 'gh-pending': !ghReady }"
         :href="ghReady ? GITHUB_URL : undefined"
         :target="ghReady ? '_blank' : undefined"
         rel="noopener noreferrer"
         >
        <svg class="gh-icon" viewBox="0 0 16 16" aria-hidden="true">
          <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        <span>查看项目源码</span>
      </a>
    </div>

    <!-- ② 正文卡片组：以后加段落，复制一个 <section class="card"> 即可 -->
    <section class="card">
      <h2 class="card-title"><span class="card-num">01</span>建站初衷</h2>
      <p class="para">
        鉴于 BALDR SKY DIVE 是一个小众作品，相关创作稀少且分散，设立此站，
        希望能为喜爱空的访客，提供一个可持续访问的存档点。
      </p>
    </section>

    <section class="card">
      <h2 class="card-title"><span class="card-num">02</span>在这里你可以</h2>
      <ul class="feature-list">
        <li>分享或获取创作资源</li>
        <li>阅览站长收集的空有关的各种官方或同人创作</li>
        <li>签到打卡，记录你对空的喜爱</li>
        <li>与站内的看板娘互动</li>
      </ul>
    </section>

    <section class="card">
      <h2 class="card-title"><span class="card-num">03</span></h2>
      <p class="para">
        这是一个非营利、纯为爱发电运作的站点，感谢访问。
      </p>
    </section>

    <!-- ③ 技术栈：平时只露标签；鼠标设备悬浮展开，触摸设备点击展开 -->
    <section class="card tech-card"
             @mouseenter="onTechEnter"
             @mouseleave="onTechLeave"
             @click="onTechTap">
      <div class="tech-head">
        <h2 class="card-title"><span class="card-num">04</span>技术栈</h2>
        <span class="tech-hint" :class="{ hidden: techOpen }">{{ isTouch ? '点击' : '鼠标悬浮' }}展开全部</span>
      </div>

      <!-- 简略态：标签云 -->
      <div class="tech-tags">
        <span v-for="tag in techTags" :key="tag" class="tech-tag">{{ tag }}</span>
      </div>

      <!-- 展开态：分组明细 -->
      <div class="tech-detail" :class="{ open: techOpen }">
        <div class="tech-detail-inner">
          <div v-for="group in techGroups" :key="group.key" class="tech-group">
            <div class="tech-group-label">{{ group.label }}</div>
            <div v-for="(item, i) in group.items" :key="group.key + '-' + i" class="tech-row">
              <span class="tech-name">{{ item.name }}</span>
              <span class="tech-desc">{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ 联系站长 -->
    <section class="card">
      <h2 class="card-title"><span class="card-num">05</span>联系站长</h2>
      <p class="para">如果你想分享资源，或者参与到本站的建设中，可以通过以下方式联系站长：</p>
      <div class="contact-list">
        <div class="contact-item">
          <span class="contact-label">QQ</span>
          <span class="contact-value">1678368233</span>
        </div>
        <div class="contact-item">
          <span class="contact-label">bilibili</span>
          <span class="contact-value">musumppp</span>
        </div>
      </div>
    </section>

   </div>

   <Announcement/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Announcement from '@/components/announcement.vue'

/* ============================================================
 * GitHub 仓库地址
 * ============================================================ */
const GITHUB_URL = 'https://github.com/musumppp/sora_web'

/* 地址填了才让按钮可点；没填时只是禁用态，不会点一下跳到页首 */
const ghReady = GITHUB_URL.startsWith('http')

const techOpen = ref(false)

/* 触摸设备没有 hover —— 技术栈卡片在手机上要改成「点击展开」
   （用 hover:none + pointer:coarse 判断，比看屏幕宽度准：窄屏桌面窗口仍有鼠标，
   iPad 这类大屏平板却是触摸设备） */
const isTouch = typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches

function onTechEnter() {
  if (!isTouch) techOpen.value = true
}
function onTechLeave() {
  if (!isTouch) techOpen.value = false
}
function onTechTap() {
  if (isTouch) techOpen.value = !techOpen.value
}

/* 简略态显示的标签 —— 想加减直接改这个数组 */
const techTags = [
  'Vue 3',
  'Vite',
  'Pinia',
  'Vue Router',
  'FastAPI',
  'Spring Boot',
  'Redis',
  'PostgreSQL',
  'Docker',
  'Nginx',
]

/* ============================================================
 * 悬浮展开的明细 —— 结构已搭好（前端 / 后端 / 部署 三组），
 * 内容你自己填。增删条目直接改 items 数组即可。
 * ============================================================ */
const techGroups = [
  {
    key: 'frontend',
    label: '前端',
    items: [
      { name: 'Vue 3', desc: '前端框架，响应式' },
      { name: 'Vite 8', desc: '开发服务器与生产构建工具' },
      { name: 'Pinia 3', desc: '状态管理' },
      { name: 'Vue Router 4', desc: '路由管理' },
      { name: 'dayjs', desc: '日期处理' },
      { name: 'vue3-lazyload', desc: '图片懒加载' },
      { name: 'vue-easy-lightbox', desc: '相册大图展示' },
      { name: '@vueuse/core', desc: '组合式工具集' },
    ],
  },
  {
    key: 'backend',
    label: '后端',
    items: [
      { name: 'FastAPI', desc: 'Python 异步后端框架' },
      { name: 'SQLite', desc: '测试版数据库' },
      { name: 'PostgreSQL', desc: '正式版数据库' },
      { name: 'Redis', desc: '缓存' },
    ],
  },
  {
    key: 'deploy',
    label: '部署',
    items: [
      { name: 'Docker', desc: '容器化' },
      { name: 'Nginx', desc: '反向代理与静态资源' },
    ],
  },
]
</script>

<style scoped>
/* ===== 页面容器 =====
   限宽是为了控制「每行字数」—— 4K 下不限宽的话，一行会被拉到 1500px+，
   字就显得很小。这里 46vw 在 1080p 约 883px、4K 封顶 1000px。 */
#about_page {
    display: flex;
    justify-content: center;
    width: 100%;
}

.about-wrap {
    width: 100%;
    max-width: clamp(720px, 46vw, 1000px);
    padding: 48px 24px 88px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 22px;
}

/* ===== ① 页头 ===== */
.about-hero {
    text-align: center;
    padding: 6px 0 10px;
}
.hero-roman {
    margin: 0;
    font-size: clamp(11px, 0.34rem + 0.3vw, 13px);
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--ink-4);
}
.hero-title {
    margin: 8px 0 0;
    font-size: clamp(26px, 1rem + 1.3vw, 44px);
    font-weight: 600;
    letter-spacing: 3px;
    color: var(--ink);
}
.hero-sub {
    margin: 12px 0 0;
    font-size: clamp(13px, 0.4rem + 0.45vw, 17px);
    color: var(--ink-3);
    letter-spacing: 0.5px;
    line-height: 1.8;
}

/* GitHub 直链按钮 */
.gh-btn {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    margin-top: 22px;
    padding: 11px 24px;
    border-radius: var(--radius-pill);
    background: var(--ink);
    color: var(--surface);
    text-decoration: none;
    font-size: clamp(13px, 0.38rem + 0.4vw, 15px);
    font-weight: 600;
    letter-spacing: 1px;
    box-shadow: 0 6px 18px rgba(46, 42, 46, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.gh-btn:hover {
    background: var(--ink-2);
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(46, 42, 46, 0.26);
}
.gh-btn:active {
    transform: translateY(0);
}

/* 仓库地址还没填时的禁用态 */
.gh-btn.gh-pending {
    opacity: 0.5;
    cursor: not-allowed;
}
.gh-btn.gh-pending:hover {
    transform: none;
    background: var(--ink);
    box-shadow: 0 6px 18px rgba(46, 42, 46, 0.2);
}

.gh-icon {
    width: 1.15em;
    height: 1.15em;
    flex: 0 0 auto;
}

/* ===== ② 通用卡片 ===== */
.card {
    background: var(--surface-glass);
    border: 1px solid var(--line);
    border-radius: 14px;
    box-shadow: var(--shadow-card);
    backdrop-filter: blur(10px);
    padding: 24px 30px;
    transition: box-shadow 0.25s ease;
}
.card:hover {
    box-shadow: 0 8px 28px rgba(60, 40, 60, 0.11);
}

.card-title {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin: 0 0 14px;
    font-size: clamp(16px, 0.55rem + 0.6vw, 21px);
    font-weight: 600;
    color: var(--ink);
    letter-spacing: 1px;
}
.card-num {
    font-size: 0.72em;
    font-weight: 700;
    color: var(--brand);
    letter-spacing: 1px;
    opacity: 0.9;
}

.para {
    margin: 0;
    font-size: clamp(15px, 0.5rem + 0.55vw, 20px);
    line-height: 1.9;
    color: var(--ink-2);
    letter-spacing: 0.3px;
}

/* 要点列表 */
.feature-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.feature-list li {
    position: relative;
    padding-left: 26px;
    font-size: clamp(15px, 0.5rem + 0.55vw, 20px);
    line-height: 1.8;
    color: var(--ink-2);
    letter-spacing: 0.3px;
}
.feature-list li::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 0.75em;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--brand-light);
}

/* ===== ③ 技术栈卡片 ===== */
.tech-card {
    cursor: default;
}
/* 触摸设备上技术栈是「点击展开」，给个可点击的暗示 */
@media (hover: none) and (pointer: coarse) {
    .tech-card { cursor: pointer; }
}
.tech-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
}
.tech-head .card-title {
    margin-bottom: 0;
}
.tech-hint {
    font-size: clamp(11px, 0.32rem + 0.35vw, 13px);
    color: var(--ink-4);
    letter-spacing: 0.5px;
    transition: opacity 0.25s ease;
}
.tech-hint.hidden {
    opacity: 0;
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
.tech-tag {
    padding: 4px 13px;
    border-radius: var(--radius-pill);
    background: var(--brand-soft);
    color: var(--brand-strong);
    border: 1px solid var(--brand-light);
    font-size: clamp(12px, 0.34rem + 0.4vw, 14px);
    font-weight: 600;
    letter-spacing: 0.5px;
}

/* 展开区：grid-template-rows 0fr → 1fr，过渡平滑且不用猜高度 */
.tech-detail {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    margin-top: 0;
    transition: grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.35s ease,
                margin-top 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.tech-detail.open {
    grid-template-rows: 1fr;
    opacity: 1;
    margin-top: 20px;
}
.tech-detail-inner {
    overflow: hidden;
    min-height: 0;
}

.tech-group {
    margin-top: 18px;
}
.tech-group:first-child {
    margin-top: 0;
}
.tech-group-label {
    font-size: clamp(12px, 0.34rem + 0.42vw, 15px);
    font-weight: 600;
    color: var(--brand-strong);
    letter-spacing: 1px;
    padding-bottom: 6px;
    margin-bottom: 8px;
    border-bottom: 1px solid var(--line);
}
.tech-row {
    display: flex;
    align-items: baseline;
    gap: 14px;
    padding: 5px 0;
}
.tech-name {
    flex: 0 0 auto;
    min-width: 8.5em;
    font-size: clamp(13px, 0.36rem + 0.44vw, 16px);
    font-weight: 600;
    color: var(--ink);
    letter-spacing: 0.3px;
}
.tech-desc {
    flex: 1;
    font-size: clamp(12px, 0.34rem + 0.4vw, 15px);
    color: var(--ink-3);
    line-height: 1.7;
}

/* ===== ④ 联系方式 ===== */
.contact-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 16px;
}
.contact-item {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 9px 18px;
    border-radius: 10px;
    background: var(--bg);
    border: 1px solid var(--line);
}
.contact-label {
    font-size: clamp(11px, 0.32rem + 0.35vw, 13px);
    color: var(--ink-4);
    letter-spacing: 1px;
    text-transform: uppercase;
}
.contact-value {
    font-size: clamp(13px, 0.38rem + 0.44vw, 16px);
    font-weight: 600;
    color: var(--ink);
    font-family: 'Consolas', 'Monaco', monospace;
    letter-spacing: 0.5px;
}

/* ===== 响应式 ===== */
@media (max-width: 820px) {
    .about-wrap {
        padding: 32px 18px 72px;
        gap: 16px;
    }
    .card {
        padding: 20px 20px;
    }
    .tech-row {
        flex-direction: column;
        gap: 3px;
    }
    .tech-name {
        min-width: 0;
    }
}
</style>

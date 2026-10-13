<template>
  <div class="detail-page">

    <RouterLink to="/Recource" class="back-link">
      <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
        <path d="M12.5 4.5 7 10l5.5 5.5" stroke="currentColor" stroke-width="1.8"
              fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>返回资源列表</span>
    </RouterLink>

    <article class="detail-card">

      <h1 class="detail-title">{{ show_title || '资源详情' }}</h1>

      <section class="detail-block">
        <h2 class="block-title">详细介绍</h2>
        <p class="block-text">{{ show_content_instruction || '暂无介绍。' }}</p>
      </section>

      <section class="detail-block">
       
        <a class="download-btn" :href="show_url" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <path d="M10 3.6v8.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/>
            <path d="M6.5 8.7 10 12.2l3.5-3.5" stroke="currentColor" stroke-width="1.7"
                  fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.2 15.4h11.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/>
          </svg>
          <span>前往下载</span>
        </a>
      </section>

    </article>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const show_title = ref('')
const show_content_instruction = ref('')
const show_url = ref('')

async function get_show_title() {
  try {
    const res = await fetch('/resource/get_detail_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resource_name: route.params.detail,
        id: route.params.id,
      }),
    })
    const data = await res.json()
    if (data.status === 200) {
      show_title.value = data.title
      show_content_instruction.value = data.description
      show_url.value = data.resource_url
    }
  } catch (error) {
    console.log('网络或服务器错误')
  }
}

onMounted(() => {
  get_show_title()
})
</script>

<style scoped>
/* ============================================================
 * 资源详情页
 * ------------------------------------------------------------
 * 设计前提：这类页面的内容**很少** —— 一个标题、一两句介绍、一个下载链接。
 * 所以不走「长文阅读」那套（大行距、两端对齐、10vh 大留白），
 * 而是按「少量信息 + 一个主操作」来做：
 *   卡片化 → 文字不再直接压在背景插画上，可读性先解决
 *   限宽   → 内容少就不要拉满屏，780px 左右最舒服
 *   紧凑   → 间距全部换成 clamp(px)，不再用 vh
 *   主次   → 下载按钮做成整张卡唯一的强调色元素
 * ============================================================ */
.detail-page {
  width: 100%;
  max-width: clamp(620px, 48vw, 820px);
  margin: 0 auto;
  padding: clamp(24px, 2.6vw, 52px) 24px 80px;
  box-sizing: border-box;
}

/* ===== 返回：放在正常流里，不再 absolute 飘着 ===== */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 16px;
  padding: 6px 12px 6px 8px;
  border-radius: var(--radius-pill);
  color: var(--ink-3);
  text-decoration: none;
  font-size: clamp(13px, 0.38rem + 0.35vw, 15px);
  letter-spacing: 0.5px;
  transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}
.back-link:hover {
  color: var(--brand-strong);
  background: var(--brand-soft);
  transform: translateX(-2px);
}

/* ===== 卡片 ===== */
.detail-card {
  background: var(--surface-glass);
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(12px);
  padding: clamp(22px, 2.2vw, 40px);
}

.detail-title {
  margin: 0;
  font-size: clamp(22px, 0.85rem + 1vw, 34px);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 1px;
  color: var(--ink);
}

/* ===== 分段：详细介绍 / 下载 ===== */
.detail-block {
  margin-top: clamp(20px, 2vw, 30px);
}
.detail-block:first-of-type {
  margin-top: clamp(24px, 2.2vw, 34px);
  padding-top: clamp(18px, 1.8vw, 26px);
  border-top: 1px solid var(--line);
}

.block-title {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 12px;
  font-size: clamp(14px, 0.4rem + 0.5vw, 17px);
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--brand-strong);
}
.block-title::before {
  content: '';
  width: 3px;
  height: 1em;
  border-radius: 2px;
  background: var(--brand);
}

.block-text {
  margin: 0;
  font-size: clamp(15px, 0.5rem + 0.5vw, 18px);
  line-height: 1.85;
  letter-spacing: 0.3px;
  color: var(--ink-2);
  white-space: pre-wrap;
  word-break: break-word;
}

/* ===== 下载按钮：整张卡唯一的强调色 ===== */
.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 26px;
  border-radius: var(--radius-pill);
  background: var(--brand);
  color: var(--surface);
  text-decoration: none;
  font-size: clamp(14px, 0.4rem + 0.45vw, 16px);
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 6px 18px rgba(196, 106, 135, 0.26);
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}
.download-btn:hover {
  background: var(--brand-strong);
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(196, 106, 135, 0.3);
}
.download-btn:active {
  transform: translateY(0);
}

/* ===== 窄屏 ===== */
@media (max-width: 820px) {
  .detail-page {
    max-width: 100%;
    padding: 20px 16px 64px;
  }
  .detail-card {
    padding: 20px 18px;
    border-radius: 14px;
  }
  .detail-title {
    font-size: 1.35rem;
  }
  .block-text {
    font-size: 0.95rem;
    text-align: left;
  }
  .download-btn {
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    padding: 13px 24px;
  }
}

/* 触摸设备：按钮的悬停位移在触摸屏上会「粘住」 */
@media (hover: none) and (pointer: coarse) {
  .back-link:hover {
    background: transparent;
    color: var(--ink-3);
    transform: none;
  }
  .download-btn:hover {
    background: var(--brand);
    transform: none;
    box-shadow: 0 6px 18px rgba(196, 106, 135, 0.26);
  }
}
</style>

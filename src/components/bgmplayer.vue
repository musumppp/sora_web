<template>
  <div ref="el" class="bgm-dock" :style="dockStyle">

    <!-- 拖动把手：只有这个图标能拖动整个播放器 -->
    <img
      id="bgm-handle"
      class="dock-handle"
      :class="{ 'is-playing': playing }"
      :src="music_image"
      alt="背景音乐"
      draggable="false"
      :title="open ? '收起播放器' : '空站的背景音乐'"
      @dragstart.prevent
      @click="togglePanel"
    />

    <transition name="dock">
      <div v-show="open" class="dock-panel">

        <!-- 进度条（拖动中只更新 UI，松手才 seek） -->
        <div ref="progressEl" class="track" @pointerdown="onSliderDown('progress', $event)">
          <div class="track-fill" :style="{ width: progress + '%' }"></div>
          <div class="track-thumb" :style="{ left: progress + '%' }"></div>
        </div>

        <div class="dock-row">
          <!-- 上一首 / 播放暂停 / 下一首 -->
          <div class="dock-btns">
            <button class="ico-btn" type="button" title="上一首" aria-label="上一首" @click="prev">
              <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
                <path d="M5.7 4.5v11" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/>
                <path d="M15 4.7v10.6L6.9 10z" fill="currentColor"/>
              </svg>
            </button>

            <button class="ico-btn ico-main" type="button"
                    :title="playing ? '暂停' : '播放'"
                    :aria-label="playing ? '暂停' : '播放'"
                    @click="togglePlay">
              <svg v-if="!playing" viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
                <path d="M6.9 4.5v11L15.5 10z" fill="currentColor"/>
              </svg>
              <svg v-else viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
                <rect x="6" y="4.5" width="3.1" height="11" rx="1.2" fill="currentColor"/>
                <rect x="10.9" y="4.5" width="3.1" height="11" rx="1.2" fill="currentColor"/>
              </svg>
            </button>

            <button class="ico-btn" type="button" title="下一首" aria-label="下一首" @click="next">
              <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
                <path d="M14.3 4.5v11" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/>
                <path d="M5 4.7v10.6L13.1 10z" fill="currentColor"/>
              </svg>
            </button>
          </div>

          <!-- 音量 -->
          <div class="dock-vol">
            <svg class="vol-ico" viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
              <path d="M4 7.6h2.6L10 4.6v10.8L6.6 12.4H4z" fill="currentColor"/>
              <path v-if="volume > 0.02" d="M12.6 7.5a3.5 3.5 0 0 1 0 5"
                    stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/>
              <path v-if="volume > 0.55" d="M14.8 5.5a6.4 6.4 0 0 1 0 9"
                    stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/>
            </svg>
            <div ref="volumeEl" class="track track-sm" @pointerdown="onSliderDown('volume', $event)">
              <div class="track-fill" :style="{ width: volume * 100 + '%' }"></div>
              <div class="track-thumb" :style="{ left: volume * 100 + '%' }"></div>
            </div>
          </div>
        </div>

      </div>
    </transition>

    <!-- 真正的音频元素：不带 controls，视觉上完全隐藏 -->
    <audio
      ref="audioEl"
      class="dock-audio"
      :src="music_list[track]"
      preload="metadata"
      loop
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoaded"
    ></audio>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useDraggable, useWindowSize, useElementSize } from '@vueuse/core'
import music_image from '@/assets/images/music.png'
import bgm_music1 from '@/assets/bgm/1.mp3'
import bgm_music2 from '@/assets/bgm/2.mp3'
import bgm_music3 from '@/assets/bgm/3.mp3'
import bgm_music4 from '@/assets/bgm/4.mp3'

const music_list = [bgm_music1, bgm_music2, bgm_music3, bgm_music4]

/* ============================================================
 * DOM 引用
 * ============================================================ */
const el = ref(null)          // 整个播放器容器（拖动目标）
const audioEl = ref(null)     // <audio>
const progressEl = ref(null)  // 进度条轨道
const volumeEl = ref(null)    // 音量条轨道

/* ============================================================
 * 状态
 * ============================================================ */
const open = ref(false)        // 面板是否展开
const playing = ref(false)     // 是否正在播放
const everPlayed = ref(false)  // 是否成功播放过（用于「首次展开就播」）
const progress = ref(0)        // 0-100

/* 曲目索引：读取时夹紧，防止以前存过、后来曲子被删导致越界 */
const track = ref(
  Math.min(Math.max(0, Math.round(loadNum('bgm-track', 0))), music_list.length - 1)
)

/* 音量默认 0.4 —— 旧实现写的 volume="0.01" 是无效属性，实际一直是 100% */
const volume = ref(loadNum('bgm-volume', 0.4))

function loadNum(key, fallback) {
  const n = parseFloat(localStorage.getItem(key))
  return Number.isFinite(n) ? n : fallback
}

/* 用于区分「点击图标」和「拖动图标」——非响应式，够用 */
let justDragged = false
let downX = 0
let downY = 0

/* ============================================================
 * 播放控制
 * ============================================================ */
function tryPlay() {
  const a = audioEl.value
  if (!a) return
  a.play().catch(() => {
    /* 被浏览器策略拦截：由 kickAutoplay 在用户首次交互时补播 */
  })
}

function togglePlay() {
  const a = audioEl.value
  if (!a) return
  if (a.paused) tryPlay()
  else a.pause()
}

function togglePanel() {
  /* 刚拖完的那一下 click 不算 —— 浏览器在「按住→移动→松开」后仍会派发 click */
  if (justDragged) return
  open.value = !open.value
  /* 展开算一次用户手势，此时 play() 是合法的 → 顺手开始播放 */
  if (open.value && !everPlayed.value) tryPlay()
}

function go(offset) {
  track.value = (track.value + offset + music_list.length) % music_list.length
}
const next = () => go(1)
const prev = () => go(-1)

/* 切歌：换 src 会中断播放，若之前在播则接着播 */
watch(track, async () => {
  const wasPlaying = playing.value
  progress.value = 0
  localStorage.setItem('bgm-track', String(track.value))
  await nextTick()
  const a = audioEl.value
  if (!a) return
  a.volume = volume.value
  if (wasPlaying) a.play().catch(() => {})
})

/* ============================================================
 * 音频事件
 * ============================================================ */
function onPlay() {
  playing.value = true
  everPlayed.value = true
}
function onPause() {
  playing.value = false
}
function onLoaded() {
  const a = audioEl.value
  if (a) a.volume = volume.value
}
function onTimeUpdate() {
  const a = audioEl.value
  if (!a || !a.duration || dragTarget.value === 'progress') return
  progress.value = (a.currentTime / a.duration) * 100
}

/* ============================================================
 * 音量
 * ============================================================ */
watch(volume, v => {
  if (audioEl.value) audioEl.value.volume = v
  localStorage.setItem('bgm-volume', String(v))
})

/* ============================================================
 * 滑条（进度 / 音量共用）—— 自绘，不用原生 input[type=range]
 * ============================================================ */
const dragTarget = ref(null)   // 'progress' | 'volume' | null

function onSliderDown(kind, e) {
  e.preventDefault()
  dragTarget.value = kind
  applySlider(kind, e)
  window.addEventListener('pointermove', onSliderMove)
  window.addEventListener('pointerup', onSliderUp)
}
function onSliderMove(e) {
  if (!dragTarget.value) return
  applySlider(dragTarget.value, e)
}
function onSliderUp() {
  const kind = dragTarget.value
  dragTarget.value = null
  window.removeEventListener('pointermove', onSliderMove)
  window.removeEventListener('pointerup', onSliderUp)
  /* 进度条松手才真正 seek —— 拖动中频繁 seek 会卡顿 */
  if (kind === 'progress') seekToProgress()
}
function applySlider(kind, e) {
  const box = kind === 'progress' ? progressEl.value : volumeEl.value
  if (!box) return
  const rect = box.getBoundingClientRect()
  const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
  if (kind === 'progress') progress.value = ratio * 100
  else volume.value = ratio
}
function seekToProgress() {
  const a = audioEl.value
  if (!a || !a.duration) return
  a.currentTime = (progress.value / 100) * a.duration
}

/* ============================================================
 * 拖动整个播放器
 * ------------------------------------------------------------
 * 两个关键点（都是旧实现的 bug）：
 * 1) 拖拽把手限定为图标 —— 靠 onStart 里判断 event.target。
 *    旧实现整个容器都是把手，点按钮 / 拖滑条时手一动就整块被拖走。
 * 2) 面板不再用 position:absolute，而是正常参与布局，
 *    所以 useElementSize 量到的是「图标 + 面板」的真实总宽高。
 *    旧实现面板是 absolute（不计入父元素尺寸），量到的只有图标宽度，
 *    maxX 算小了 → 拖到右边后面板整个跑到屏幕外。
 * ============================================================ */
const { width: winW, height: winH } = useWindowSize()
const { width: elW, height: elH } = useElementSize(el)

/* ============================================================
 * 触摸设备判定：hover:none + pointer:coarse
 * 比看屏幕宽度准 —— 窄屏桌面窗口仍有鼠标，iPad 这类大屏平板却是触摸设备
 * ============================================================ */
const TOUCH = typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches

/* 位置分开存：桌面拖过的位置不该带到手机上（手机上 y 会落在导航栏里） */
const POS_KEY = TOUCH ? 'bgm-pos-touch' : 'bgm-pos'

function loadPos() {
  try {
    const raw = localStorage.getItem(POS_KEY)
    if (raw) {
      const p = JSON.parse(raw)
      if (Number.isFinite(p?.x) && Number.isFinite(p?.y)) return p
    }
  } catch { /* 忽略损坏数据 */ }
  /* 触摸设备默认放左下角：避开顶部导航栏；展开面板时向右延伸也不会溢出屏幕 */
  if (TOUCH) {
    return { x: 12, y: Math.max(0, window.innerHeight - 92) }
  }
  return { x: 0, y: 100 }
}

const { x, y, style: dockStyle } = useDraggable(el, {
  initialValue: loadPos(),

  /* 把手限定为图标；顺便记下按下的起点，供 onEnd 判断是否为拖拽 */
  onStart: (_pos, e) => {
    if (!(e.target instanceof Element && e.target.closest('#bgm-handle'))) return false
    downX = e.clientX
    downY = e.clientY
    return true
  },

  onMove: (position) => {
    position.x = Math.min(Math.max(0, position.x), Math.max(0, winW.value - elW.value))
    position.y = Math.min(Math.max(0, position.y), Math.max(0, winH.value - elH.value))
    return position
  },

  onEnd: (position, e) => {
    /* 位移超过 4px 才算拖动，避免手抖把「点击开合」吃掉 */
    justDragged = Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY) > 4
    if (justDragged) setTimeout(() => { justDragged = false }, 80)
    localStorage.setItem(POS_KEY, JSON.stringify({ x: position.x, y: position.y }))
  },
})

/* 展开 / 收起会改变容器宽度；窗口缩放也会 —— 都要重新收回视口内 */
watch(open, async () => {
  await nextTick()
  clampIntoView()
})
watch([winW, winH], () => clampIntoView())

function clampIntoView() {
  const node = el.value
  if (!node) return
  const w = node.offsetWidth
  const h = node.offsetHeight
  x.value = Math.min(Math.max(0, x.value), Math.max(0, winW.value - w))
  y.value = Math.min(Math.max(0, y.value), Math.max(0, winH.value - h))
}

/* ============================================================
 * 初始化：先尝试自动播放（多半会被浏览器拦截），
 * 被拦了就挂一个一次性的「首次交互补播」。
 * ============================================================ */
function kickAutoplay() {
  document.removeEventListener('pointerdown', kickAutoplay, true)
  if (!everPlayed.value) tryPlay()
}

onMounted(async () => {
  const a = audioEl.value
  if (!a) return
  a.volume = volume.value
  await nextTick()
  clampIntoView()

  try {
    await a.play()
  } catch {
    /* 无用户手势被拦 → 等用户第一次点击页面任意位置时补播 */
    console.log('[BGM] 自动播放被浏览器拦截，将在用户首次点击页面时开始播放')
    document.addEventListener('pointerdown', kickAutoplay, true)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', kickAutoplay, true)
  window.removeEventListener('pointermove', onSliderMove)
  window.removeEventListener('pointerup', onSliderUp)
})
</script>

<style scoped>
/* ===== 容器：图标 + 面板，正常文档流排列 ===== */
.bgm-dock {
  position: fixed;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 10px;
  user-select: none;
}

/* ===== 铃铛（唯一的拖动把手）
   原图直出：不加圆角、不裁剪、不加底色/描边/内边距，
   免得破坏这张手绘的轮廓 ==== */
.dock-handle {
  width: clamp(54px, 3.8vw, 76px);
  height: auto;
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
  transition: transform 0.2s ease, filter 0.25s ease;
}
.dock-handle:hover {
  transform: scale(1.06);
}
.dock-handle:active {
  transform: scale(1);
}
/* 正在播放：顺着图片轮廓发光（drop-shadow 跟随 alpha，不会出现方框） */
.dock-handle.is-playing {
  filter: drop-shadow(0 0 6px var(--brand-light));
}

/* ===== 面板：约 230 × 62，比原生 audio（约 300 × 90）小一圈 ===== */
.dock-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: clamp(212px, 12.5vw, 248px);
  box-sizing: border-box;
  padding: 10px 12px;
  border-radius: 14px;
  background: var(--surface-glass);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(10px);
}

.dock-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

/* ===== 按钮 ===== */
.dock-btns {
  display: flex;
  align-items: center;
  gap: 4px;
}
.ico-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--ink-2);
  cursor: pointer;
  transition: color 0.18s ease, background 0.18s ease, transform 0.18s ease;
}
.ico-btn:hover {
  color: var(--brand-strong);
  background: var(--brand-soft);
}
.ico-btn:active {
  transform: scale(0.92);
}
.ico-main {
  width: 26px;
  height: 26px;
  color: var(--brand-strong);
}
.ico-main:hover {
  background: var(--brand);
  color: var(--surface);
}

/* ===== 音量 ===== */
.dock-vol {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--ink-3);
}
.vol-ico {
  flex: 0 0 auto;
}

/* ===== 滑条（自绘，不用原生 range） ===== */
.track {
  position: relative;
  width: 100%;
  height: 3px;
  border-radius: 2px;
  background: var(--line-2);
  cursor: pointer;
  touch-action: none;
}
.track-sm {
  width: 54px;
  flex: 0 0 auto;
}
.track-fill {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  border-radius: 2px;
  background: var(--brand);
}
.track-thumb {
  position: absolute;
  top: 50%;
  width: 9px;
  height: 9px;
  margin-left: -4.5px;
  border-radius: 50%;
  background: var(--brand);
  transform: translateY(-50%);
  transition: transform 0.15s ease;
  pointer-events: none;
}
.track:hover .track-thumb {
  transform: translateY(-50%) scale(1.25);
}

/* ===== 真正的 audio 元素完全隐藏（0×0，仍能播放） ===== */
.dock-audio {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}

/* ===== 展开 / 收起动画 ===== */
.dock-enter-active,
.dock-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.dock-enter-from,
.dock-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

/* ============================================================
 * 触摸设备：手机上手指没那么准，点击区要加大
 * 同时取消 hover 效果 —— 触摸屏的 :hover 会在点完后一直保留
 *
 * 注意这里只改「交互尺寸」，不改布局：
 * 平板（iPad）宽度够，应当保持 PC 的排版，只是按钮要更大。
 * 所以面板宽度用 clamp + vw 跟着屏幕走，不做成固定值。
 * ============================================================ */
@media (hover: none) and (pointer: coarse) {
  .dock-handle {
    width: clamp(56px, 14vw, 68px);
  }
  .dock-handle:hover {
    transform: none;
  }
  .dock-panel {
    width: clamp(228px, 26vw, 292px);
    gap: 12px;
    padding: 13px 14px;
  }
  .ico-btn {
    width: 34px;
    height: 34px;
  }
  .ico-main {
    width: 38px;
    height: 38px;
  }
  .ico-btn:hover {
    background: transparent;
    color: var(--ink-2);
  }
  .ico-main:hover {
    background: transparent;
    color: var(--brand-strong);
  }
  .track {
    height: 5px;
  }
  .track-sm {
    width: 60px;
  }
  .track-thumb {
    width: 14px;
    height: 14px;
    margin-left: -7px;
  }
  .track:hover .track-thumb {
    transform: translateY(-50%);
  }
}
</style>

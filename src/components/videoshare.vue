<template>
  <div id="header">视频推荐</div>
  <div id="vedioShare">

    
    <div class="video-list" v-if="!loading">
      <div class="video-item" v-for="item in currentPageData" :key="item.id">
        <span class="video-title">{{ item.title }}</span>
        <a class="video-link" :href="item.url" target="_blank" rel="noopener noreferrer">B站链接</a>
      </div>
    </div>
    <div class="loading-tip" v-else>加载中...</div>
    <div class="pagination" v-if="totalPages > 1">
      <span
        v-for="page in totalPages"
        :key="page"
        :class="['page-btn', { active: page === currentPage }]"
        @click="goToPage(page)"
      >{{ page }}</span>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  apiUrl: {
    type: String,
    default: '/resource/video-share'
  }
})

const videos = ref([])
const currentPage = ref(1)
const loading = ref(false)
const screenWidth = ref(window.innerWidth)

const pageSize = computed(() => {
  return screenWidth.value >= 2560 ? 7 : 6
})

const handleResize = () => {
  screenWidth.value = window.innerWidth
}

const totalPages = computed(() => Math.max(1, Math.ceil(videos.value.length / pageSize.value)))

const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return videos.value.slice(start, end)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const fetchVideos = async () => {
  loading.value = true
  try {
    const response = await fetch(props.apiUrl)
    const data = await response.json()
    videos.value = data || []
  } catch (err) {
    console.error('获取视频推荐失败:', err)
    videos.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchVideos()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
#vedioShare {
  width: 44vw;
  /* height: 55vh; */
  /* min-height: 500px; */
  display: flex;
  flex-direction: column;
  background: var(--surface-glass);
  border: 1px solid var(--line);
  border-radius: 1vw;
  padding: 2vh 1.5vw;
  box-sizing: border-box;
  overflow: hidden;
  backdrop-filter: blur(0.6vw);
}

.video-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
  overflow-y: auto;
}

.video-list::-webkit-scrollbar {
  width: 0.4vw;
}

.video-list::-webkit-scrollbar-track {
  background: transparent;
}

.video-list::-webkit-scrollbar-thumb {
  background: var(--line-2);
  border-radius: 0.2vw;
}

.video-list::-webkit-scrollbar-thumb:hover {
  background: var(--ink-4);
}

.video-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2vh 1vw;
  border-bottom: 1px solid var(--line);
  transition: background 0.2s;
}

.video-item:hover {
  background: var(--brand-soft);
  border-radius: 0.4vw;
}

.video-title {
  font-size: clamp(0.45rem, 0.45rem + 0.6vw, 1.6rem);
  color: var(--ink);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 1vw;
}

.video-link {
  font-size: clamp(0.35rem, 0.35rem + 0.45vw, 1.3rem);
  color: var(--bilibili);
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  padding: 0.4vh 0.8vw;
  border: 1px solid var(--bilibili);
  border-radius: 0.3vw;
  transition: all 0.2s;
}

.video-link:hover {
  background: var(--bilibili);
  color: var(--surface);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6vw;
  padding-top: 1.5vh;
  border-top: 1px solid var(--line);
  margin-top: auto;
}

.page-btn {
  font-size: clamp(0.45rem, 0.45rem + 0.5vw, 1.5rem);
  color: var(--ink-3);
  cursor: pointer;
  padding: 0.3vh 0.5vw;
  border-radius: 0.3vw;
  transition: all 0.2s;
  user-select: none;
  min-width: 2vw;
  text-align: center;
}

.page-btn:hover {
  color: var(--brand-strong);
  background: var(--brand-soft);
}

.page-btn.active {
  color: var(--surface);
  background: var(--brand);
}

.loading-tip {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(0.5rem, 0.5rem + 0.6vw, 1.6rem);
  color: var(--ink-3);
}
#header{
  font-size: clamp(1rem, 1rem + 0.7vw, 2.6rem);
  color: var(--brand-strong);
  margin-bottom: 1.5vh;
  text-align: center;
  width: 44vw;
}
</style>
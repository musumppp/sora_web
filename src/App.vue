<script setup>
import { ref, onMounted, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

import bg1 from './assets/images/i00001.jpg';
import bg2 from './assets/images/i00002.png';
import bg3 from './assets/images/i00003.jpeg';
import bg4 from './assets/images/i00004.jpg';
import bg5 from './assets/images/i00005.jpg';
import bgmplayer from '@/components/bgmplayer.vue'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const log_status = computed(() => userStore.log_status);
const backgrounds = [bg1, bg2, bg3,bg4,bg5];
const currentIndex = ref(0);
onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % backgrounds.length;
  }, 15000);
});

</script>

<template>
  <div class="bg-container">
    <div 
      v-for="(bg, index) in backgrounds" 
      :key="index"
      class="bg-layer"
      :class="{ active: index === currentIndex }"
      :style="{ backgroundImage: `url(${bg})` }"
      
    ></div>
  </div>


  <header>
    <nav>
      
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/About">关于本站</RouterLink>
      <RouterLink to="/Recource">创作资源</RouterLink>
      <RouterLink to="/Album">相册</RouterLink>
      
    </nav>
      <div v-if="log_status==='off'" id="logregis-button" >
      <RouterLink to="/Login" class="logregis">登录</RouterLink>
      <RouterLink to="/Register" class="logregis">注册</RouterLink>
      </div>
      <div v-else id="logregis-button" >
      <RouterLink to="/User" class="logregis">个人中心</RouterLink>
      </div>
    </header>
   <bgmplayer/>

  <RouterView/>
    
</template>

<style scoped>
.bg-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1; 
    overflow: hidden;
}

.bg-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0; 
    transition: opacity 1.5s ease-in-out;
}

.bg-layer.active {
    opacity: 0.25;
}

header {
    position: relative;
    z-index: 10;
}

nav {
    display: flex;
    gap: 5vw;
    padding: 0.6vh;
    justify-content: center;
}

.router-link-active {
    color: var(--ink-3);
    font-weight: bold;
}

.logregis{ 
    color: var(--ink-2);
    text-decoration: none;
    margin-left: 10px;
    text-shadow: 0.5px 0.5px 2px rgba(0, 0, 0, 0.5);
    font-size: clamp(0.6rem, 0.5rem + 0.5vw, 1.5rem);

}
#logregis-button{
    position: absolute;
    right: 3vw;
    top: calc(6px + 0.7vw);

}

/* ===== 移动端 / 触摸设备 =====
   注意：这里 nav 的 gap / padding 是 scoped 规则，优先级高于 style.css 里的全局 nav，
   所以窄屏的覆盖必须写在这里才生效 */
@media (max-width: 820px) {
    header {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.3rem 0.5rem;
        padding: 0.25rem 0.5rem;
    }
    nav {
        gap: 0.25rem;
        padding: 0;
    }
    /* 登录 / 注册从「绝对定位到右上角」改成正常流里的一项，
       否则它会压在「相册」上面 */
    #logregis-button {
        position: static;
        display: flex;
        align-items: center;
        gap: 0.35rem;
        flex-shrink: 0;
    }
    .logregis {
        margin-left: 0;
        font-size: 0.78rem;
        text-shadow: none;
    }
}

/* 触摸设备：取消 nav a 的 hover（触摸屏上会「粘住」），见 style.css 的说明 */
@media (hover: none) and (pointer: coarse) {
    .logregis {
        text-shadow: none;
    }
}
</style>

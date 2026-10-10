<template>
  <div ref="el" class="draggable-element" :style="style">
    
       <img id="image_image" :src="music_image" alt="音乐图标" @click="handleImageClick" draggable="false" @dragstart.prevent/>
    <transition name="slide">
    <div id="bgmplayer_container" v-show="is_show">
        <div><audio id="bgmplayer" autoplay="autoplay" :src="music_list[correct_music]" volume="0.01" loop="loop" controls></audio></div>
            <div id="bgm_player_switch_button">
    <button class="switch_button" @click="switch_next_music">下一首</button>
    <button class="switch_button" @click="switch_previous_music">上一首</button>
    </div> 
    </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDraggable, useWindowSize, useElementSize } from '@vueuse/core'
import music_image from '@/assets/images/music.png'
import bgm_music1 from '@/assets/bgm/1.mp3'
import bgm_music2 from '@/assets/bgm/2.mp3'
import bgm_music3 from '@/assets/bgm/3.mp3'
import bgm_music4 from '@/assets/bgm/4.mp3'

const music_list = [bgm_music1,bgm_music2,bgm_music3,bgm_music4]
const el = ref(null)
const { width: windowWidth, height: windowHeight } = useWindowSize()
// 动态获取元素自身尺寸
const { width: elWidth, height: elHeight } = useElementSize(el)
const is_show = ref(false)
const correct_music = ref(0)
const is_dragging = ref(false)
function show_bgm_player(){
  is_show.value = !is_show.value
}
function handleImageClick(){
  if(is_dragging.value){
    return
  }
  show_bgm_player()
}
function switch_next_music(){
  correct_music.value = (correct_music.value+1)%music_list.length
}
function switch_previous_music(){
  correct_music.value = (correct_music.value-1+music_list.length)%music_list.length
}
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 0, y: 100 },
  onMove: (position) => {
    is_dragging.value = true
    // 计算边界
    const minX = 0
    const minY = 0
    const maxX = windowWidth.value - elWidth.value
    const maxY = windowHeight.value - elHeight.value

    // 约束 X 坐标
    if (position.x < minX) position.x = minX
    if (position.x > maxX) position.x = maxX

    // 约束 Y 坐标
    if (position.y < minY) position.y = minY
    if (position.y > maxY) position.y = maxY
    
    // 返回修正后的位置
    return position
  },
  onEnd: () => {
   setTimeout(()=>{
    is_dragging.value = false
  },50)
  },
})
</script>

<style scoped>
.draggable-element {
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 10000;
}
#bgmplayer_container {
  position: absolute;
  
  left: 6vw;
  /* margin-left: 2vw;  */
}

#image_image{
  max-width: 5vw;
  max-height: 5vw;
  cursor: pointer;

}
#bgm_player_switch_button{
  position: relative;
   
   right: -1vw;
    
}
.switch_button{
  background-color: var(--surface-2);
  border:none;
  border-radius: 5px;
  margin-right: 0.5vw;
  cursor: pointer;
  color: var(--ink-3);
  font-weight: 500;
  font-family: 'Quicksand', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
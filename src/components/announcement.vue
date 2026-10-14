<template>
  <div id="announcement-wrapper">

    <div class="panel" :class="{ 'panel-open': isOpen }">
      <div class="panel-content">
        <slot>
          <!-- 公告内容 -->
          <div class="announcement-item">
            <h3>当前版本V1.0</h3>
            <p></p> 
          </div>
          <div class="announcement-item">
            <h4> 维护通知</h4>
            <p v-for="announce in announceListWeihu" :key="announce.id">{{announce.content}}</p>
          </div>
          <div class="announcement-item">
            <h4> 重要公告</h4>
            <p>水无月空站正式上线!</p>
            <p >如果资源分享中有哪些资源失效，请用qq邮箱或者b站私信联系站长</p>
            <p>首页看板娘需要加载立绘和语音资源，网络好的话需要3~5秒的时间，请不要立即点击，否则会出现严重延迟</p>
            <p v-for="announce in announceListGonggao" :key="announce.id">{{announce.content}}</p>
          </div>
          <div class="announcement-item">
            <h4> 版本更新</h4>
            <!-- 最新的在最上面，越往下越旧 -->
            <p>2026.10.14正式版v1.0上线！</p>
            <p>2026.7.19测试版本v0.5:新增功能：空视频创作结合，站长会把空相关的b站创作视频列在下面</p>
            <p>2026.6.28测试版本v0.4:修改了主页看板娘动作幅度的计算逻辑，高分辨率屏幕下也能正常显示了</p>
            <p>测试版本v0.3:修复了一个神秘小bug</p>
            <p>测试版本v0.2:修复了大量排版问题</p>
            <p>测试版本v0.1</p>
          </div>
          
          
          </slot>
      </div>
    </div>

  
    <div class="toggle-button" @click="togglePanel">
      <span class="arrow" :class="isOpen ? 'arrow-left' : 'arrow-right'"></span>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'

const isOpen = ref(false)

const announceListWeihu = ref([])
const announceListGonggao = ref([])
const togglePanel = () => {
  isOpen.value = !isOpen.value
}
async function getAnnounceList(){ 
   try{
     const res = await fetch('/resource/getAnnounceList',{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
     })
     const data = await res.json()
     if(data.status === 200){
      console.log('公告列表获取成功')
      let j =1,k =1
      for(let i = 0; i < data.category.length; i++)
     {
      if(data.category[i] === 'weihu'){
          announceListWeihu.value.push({id:j,content:data.content[i]})
          j++
      }
      if(data.category[i] === 'gonggao'){
        
        announceListGonggao.value.push({id:k,content:data.content[i]})
        k++
      }
    }
     }
     if(res.status === 404){
      console.log('暂无公告')
     }
             
      }
      catch(error){
        console.log(error)
      }
} 
onMounted(() =>{
  {
  getAnnounceList()
}  
})   
</script>

<style scoped>
#announcement-wrapper {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  
}

/* 主体面板 */
.panel {
  width: 0;
  height: 60vh;
  background: var(--surface);
  border: 1px solid var(--line);
  border-right: none;
  
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
 
}

.panel-open {
  width: 12vw;
}

/* 滚动区域 */
.panel-content {
  width: 12vw;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 4vh 14px;
  box-sizing: border-box;
}

/* 滚动条 */
.panel-content::-webkit-scrollbar {
  width: 5px;
}

.panel-content::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

.panel-content::-webkit-scrollbar-thumb {
  background: var(--line-2);
  border-radius: 3px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: var(--ink-4);
}

/* 条目样式 */
.announcement-item {
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px dashed var(--line);
  word-wrap: break-word;
  word-break: break-all;
}

.announcement-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.announcement-item h4 {
  font-size: clamp(12px, 1vw, 24px);
  color: var(--ink);
  margin: 0 0 5px 0;
  font-weight: 600;
  line-height: 1.4;
}
.announcement-item h3 {
  font-size: clamp(14px, 1.2vw, 28px);
  color: var(--ink);
  margin: 0 0 5px 0;
  font-weight: 600;
  line-height: 1.4;
}

.announcement-item p {
  font-size: clamp(10px, 0.8vw, 18px);
  color: var(--ink-2);
  line-height: 1.6;
  margin: 0;
  text-align: justify;
}

/* 按钮样式 */
.toggle-button {
  width: 2vw;
  height: 8vh;
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 1px solid var(--line);
  border-radius: 0 12px 12px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  z-index: 2;
  
}

.toggle-button:hover {
  background: var(--surface-2);
  box-shadow: 2px 0 14px rgba(0, 0, 0, 0.12);
}

/* 箭头样式 */

.arrow {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-top: 2.5px solid var(--ink-2);
  border-right: 2.5px solid var(--ink-2);
  transition: transform 0.3s ease;
  position: relative;
}

/* 基础位移 —— 必须写在下面 2K/4K 媒体查询【之前】。
   原来它写在文件末尾，与媒体查询里的规则同优先级（都是单类选择器），
   按 CSS 顺序后者覆盖前者，导致高分辨率下的位移微调全部失效。 */
.arrow-right {
  transform: rotate(45deg) translate(-2px, 2px);
}

.arrow-left {
  transform: rotate(-135deg) translate(1px, 2px);
}

/* 2K 到 4K 分辨率*/
@media (min-width: 2560px) and (max-width: 3839px) {
  .arrow {
    width: 20px;
    height: 20px;
    
    border-top: 4px solid var(--ink-2);
    border-right: 4px solid var(--ink-2);
  }
  
  
  .arrow-right {
    transform: rotate(45deg) translate(-4px, 4px);
  }

  .arrow-left {
    transform: rotate(-135deg) translate(2px, 4px);
  }
}

/* 4K  */
@media (min-width: 3840px) {
  .arrow {
    width: 40px;
    height: 40px;
    
    border-top: 6px solid var(--ink-2);
    border-right: 6px solid var(--ink-2);
  }

 
  .arrow-right {
    transform: rotate(45deg) translate(-8px, 8px);
  }

  .arrow-left {
    transform: rotate(-135deg) translate(4px, 8px);
  }
}


/* ============================================================
 * 窄屏：桌面端的样子保持不变，只修手机上的问题
 * 原来 .panel-open 用 12vw —— 440px 的手机上只有 53px，
 * 减去 28px 左右内边距后正文只剩 25px，「字会竖着排」；
 * .toggle-button 的 2vw 同理，只有 8.8px 宽，根本点不到。
 * ============================================================ */
@media (max-width: 820px) {
  .panel {
    height: 64vh;
  }
  .panel-open {
    width: min(76vw, 320px);
  }
  .panel-content {
    width: min(76vw, 320px);
    padding: 3vh 16px;
  }
  .toggle-button {
    width: 32px;
    height: 64px;
  }
  .announcement-item h3 { font-size: 1rem; }
  .announcement-item h4 { font-size: 0.9rem; }
  .announcement-item p { font-size: 0.82rem; line-height: 1.7; }
}

/* 触摸设备：把侧边开关的点击区再放大一点（手指没那么准） */
@media (hover: none) and (pointer: coarse) {
  .toggle-button {
    width: 40px;
    height: 72px;
  }
  .toggle-button:hover {
    background: var(--surface);
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
  }
}
</style>
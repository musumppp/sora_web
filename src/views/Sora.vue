<template>
    <div id="home_app">
    <img id="im00001" :src='img_url' alt="NPC变态！" draggable="false">

    <!-- 看板娘组件-->
    <div id="container">
           <!-- 对话框 -->
         <div id="dialogue-bubble">
                <p id="dialogue-text"></p>
            </div>
        <!-- 看板娘容器 -->
        <div id="character-container" >        
            <!-- 显示立绘 -->
            <img id="character-sprite" alt="水无月空" src='' crossorigin="anonymous" draggable="false">
        </div>
    </div>
    
    
    
    <!-- 资料卡 -->
     <div id="info_card_container">
         <div id="info_card_header" style="font-size:clamp(17px,0.4rem + 1vw,3rem);text-align:center">资料卡——游戏设定</div>
    
         <div class="default_info">
            <span class="info_category">本名：</span>  <span class="info_content">水无月 空</span><span class="info_content">みなづき そら</span>
         </div>
         <div class="default_info">
            <span class="info_category">罗马音：</span>  <span class="info_content">Minazuki Sora</span>
         </div>
         <div class="default_info">
            <span class="info_category">发色：</span>  <span class="info_content">亚麻色/淡金色/淡粉色</span>
         </div>
         <div class="default_info">
            <span class="info_category">瞳色：</span>  <span class="info_content">红色</span>
         </div>
         <div class="default_info">
            <span class="info_category">经典发型：</span>  <span class="info_content">双马尾+长散发</span>
         </div>
         <div class="default_info">
            <span class="info_category">身高：</span>  <span class="info_content">162cm</span>
         </div>
         <div class="default_info">
            <span class="info_category">体重：</span>  <span class="heimu" @mouseenter="minisora_act(1)">47kg</span>
         </div>
         <div class="default_info">
            <span class="info_category">三围：</span>  <span class="heimu" @mouseenter="minisora_act(2)">B:87 W:51 H:85</span>
         </div>
         <div class="default_info">
            <span class="info_category">生日：</span>  <span class="info_content">2月25日</span>
         </div>
         <div class="default_info">
            <span class="info_category">星座：</span>  <span class="info_content">双鱼座</span>
         </div>
         <div class="default_info">
            <span class="info_category">游戏画师：</span>  <span class="info_content">菊池政治</span>
         </div>
         <div class="default_info">
            <span class="info_category">游戏声优：</span>  <span class="info_content">生天目仁美</span>
         </div>
         <div class="default_info" style="display: flex;flex-direction: row;">
            <span class="info_category">游戏人设：</span>  <span style="display: flex;flex-direction: column;"><span class="info_content" >学园篇：正义、傲娇、毒舌</span><span class="info_content">世界0：感伤、沉稳</span></span>
         </div>
         
        </div>
   
   
   
     <!-- 签到系统组件     -->
    <div id="check_label_system">
      <div id="check_head" :style="{backgroundColor:head_color}"> 
      <div @click="get_last_month" class="calendar_arror"><img src="@/assets/svg/向左箭头.svg" class="arrow"></div><div>{{show_month}}{{p_year}}</div><div @click="get_next_month" class="calendar_arror"><img src="@/assets/svg/向右箭头.svg" class="arrow"></div>
      </div>
      
      <div id="background">
        
      <div id="calendar_container">
      <div class="p_week">日</div><div class="p_week">一</div><div class="p_week">二</div><div class="p_week">三</div>
      <div class="p_week">四</div><div class="p_week">五</div><div class="p_week">六</div>
      <div v-for="(date,index) in p_date" :key="date.id" :class="{'today': isToday(date.day) && date.isCurrentMonth, 'checked_day': isCheckedDate(date.day) && date.isCurrentMonth, 'other-month': !date.isCurrentMonth}" class="p_date" >{{date.day}}</div>
      </div>
     
      </div>
      <!-- 这块区域登陆后显示 -->
      <div v-if="userStore.log_status ==='on'">
      <button v-if="userStore.check_status ==='off'" id="check_button" @click="check_in">签到</button>
      <p v-else-if="userStore.check_status ==='on'" id="checked_text">已签到</p>
      <p id="check_info_text">连续签到{{constant_check_times}}天，累计签到{{total_check_times}}天</p>
      <div id="check_info"></div>
      </div>
      <div v-else>
      <p id="check_log_request">使用签到功能请先登录</p>
      </div>
    </div>
    <div id="videoshare-contianer"> 
    <videoshare/>
    </div>
    <div style="position: absolute;bottom: 0;width:100%"> 
    <bottom/>
     </div>
    </div>

</template>
<script setup>
import { onMounted, nextTick, onBeforeUnmount, computed } from 'vue';
import { ref } from 'vue';
import dayjs from 'dayjs';
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';
import bottom from '@/components/bottom.vue'
import videoshare from '@/components/videoshare.vue'
const p_month = ref(dayjs().month()+1);
const p_year = ref(dayjs().year());
const userStore = useUserStore();
const check_date = ref([]);
const constant_check_times = ref(0);
const total_check_times = ref(0);
const lastest_check_time = ref('');
const router = useRouter();
const img_url = new URL('@/assets/images/im00001.jpeg', import.meta.url).href;

const head_color = computed(() => {
  // 定义月份与颜色的映射关系 (1-12月)
  const monthColors = [
    "#E0F7FA", // 1月: 冰雪蓝 (Ice Blue) - 皑皑白雪与清冷天空
    "#FFCDD2", // 2月: 初梅粉 (Plum Pink) - 寒梅初绽，冬末春初
    "#C8E6C9", // 3月: 新芽绿 (Sprout Green) - 万物复苏，嫩芽萌发
    "#F8BBD0", // 4月: 樱花粉 (Sakura Pink) - 樱花盛开，浪漫满溢
    "#A5D6A7", // 5月: 青叶翠 (Fresh Leaf) - 绿意盎然，初夏清新
    "#81D4FA", // 6月: 晴空蓝 (Clear Sky) - 梅雨间隙的湛蓝天空
    "#FFF59D", // 7月: 盛夏金 (Summer Gold) - 阳光灿烂，向日葵色
    "#FFAB91", // 8月: 晚霞橙 (Sunset Orange) - 夏日傍晚的火烧云
    "#CE93D8", // 9月: 紫苑紫 (Aster Purple) - 秋意渐浓，彼岸花开
    "#FFCC80", // 10月: 银杏黄 (Ginkgo Yellow) - 金秋时节，落叶纷飞
    "#BCAAA4", // 11月: 枯茶褐 (Withered Tea) - 深秋萧瑟，大地回归本色
    "#CFD8DC"  // 12月: 银雪白 (Silver White) - 冬日静谧，等待初雪
  ];
  return monthColors[p_month.value - 1];
});
const show_month =computed(()=>{
  if(p_month.value==1){return"一月 ";}
  if(p_month.value==2){return"二月 ";}
  if(p_month.value==3){return"三月 ";}
  if(p_month.value==4){return"四月 ";}
  if(p_month.value==5){return"五月 ";}
  if(p_month.value==6){return"六月 ";}
  if(p_month.value==7){return"七月 ";}
  if(p_month.value==8){return"八月 ";}
  if(p_month.value==9){return"九月 ";}
  if(p_month.value==10){return"十月 ";}
  if(p_month.value==11){return"十一月 ";}
  if(p_month.value==12){return"十二月 ";}
})
async function veryfy_if_log_expired(){
  if(userStore.log_status==='off'){
    return;
  }
  try{
     const res = await fetch('/log/veryfyexpired',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',

      }
     )
      if (res.status === 401 ) {
      userStore.setLoginStatus('off');
      userStore.setCheckStaus('off');
      alert('登录已过期,请重新登录');
      router.push('/login');
      return;
    }
     const data = await res.json();
     if (data.status === 200) {
      userStore.setCheckStaus('on');
      return;
    }
    
  }
  catch(error){
    console.error(error)
    alert('服务器或网络错误');
  }
}
async function get_history_check_date(){
    
  try{
      const res=await fetch('/log/get_history_check_date', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status === 200 ) {
        check_date.value=data.check_date;
        constant_check_times.value=data.constant_check_times;
        total_check_times.value=data.total_check_times;
        lastest_check_time.value=data.lastest_check_time;
        if_today_check_in();
      }
      else if (res.status === 401) {
        console.log(data.detail);

        userStore.setCheckStaus('off');
      }
      else if (res.status === 404) {
        console.log('没有历史记录');
        userStore.setCheckStaus('off');
      }
    }

    catch(error){
      console.log('服务器或网络错误');
    }
    
}


function if_today_check_in(){
  userStore.setCheckStaus('off');
  

  if (!lastest_check_time.value || lastest_check_time.value.trim() === '') {
    return;
  }
  const lastCheckDate = dayjs(lastest_check_time.value);

  const is_today = lastCheckDate.isSame(dayjs(), 'day');
  if(is_today){
    console.log('今天已签到');
    userStore.setCheckStaus('on');
  }
}
onMounted(()=>{
  get_history_check_date();

  
});
async function check_in(){ 
  try{
    const res=await fetch('/log/check_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      credentials: 'include',
    });
    const data = await res.json();
    if (data.status_code === 200) {
      console.log(data.message);
      userStore.setCheckStaus('on');
      await get_history_check_date();
      
    }
    else if (res.status === 500) {
      console.log(data.detail);
    }
  }
  catch(error){
  console.log('服务器或网络错误');
}

}

function isCheckedDate(day){
  if(!day || !check_date.value || check_date.value.length === 0) {
    return false;
  }
  const fullDate = `${p_year.value}-${String(p_month.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  for(let i = 0; i < check_date.value.length;i++){
    if(check_date.value[i] === fullDate){
      return true;
    }
   
  }
  return false;
}
function isToday(day){ 
  if (!day) return false;
  const today = dayjs();
  const currentYear = today.year();
  const currentMonth = today.month() + 1;
  const currentDay = today.date();
  
  return p_year.value === currentYear && 
         p_month.value === currentMonth && 
         parseInt(day) === currentDay;
}

const p_date = computed(()=>{
    const date_list = [];
   
   // 获取本月第一天是星期几 (0-6, 0代表星期日)
   const firstDayOfWeek = dayjs(`${p_year.value}-${p_month.value}-01`).day();
   
   // 计算上个月需要显示的天数
   const prevMonthDays = firstDayOfWeek;
   
   // 获取上个月的天数
   const prevMonth = dayjs(`${p_year.value}-${p_month.value}-01`).subtract(1, 'month');
   const prevMonthLastDay = prevMonth.daysInMonth();
   
   // 填充上个月的日期
   for(let i = prevMonthLastDay - prevMonthDays + 1; i <= prevMonthLastDay; i++){
     date_list.push({
       id: `prev-${i}`,
       day: i,
       isCurrentMonth: false,
       
     });
   }
   
   // 填充本月的日期
   const currentMonthDays = dayjs(`${p_year.value}-${p_month.value}`).daysInMonth();
   for(let i = 1; i <= currentMonthDays; i++){
     date_list.push({
       id: `current-${i}`,
       day: i,
       isCurrentMonth: true,
       
     });
   }
   
   // 计算还需要填充多少个下个月的日期（总共42个格子）
   const remainingCells = 42 - date_list.length;
   
   // 获取下个月的日期
   const nextMonth = dayjs(`${p_year.value}-${p_month.value}-01`).add(1, 'month');
   for(let i = 1; i <= remainingCells; i++){
     date_list.push({
       id: `next-${i}`,
       day: i,
       isCurrentMonth: false,
       
     });
   }
   
   return date_list;
  
  });


function get_last_month(){
  if(p_month.value==1){
    p_month.value=12;
    p_year.value=p_year.value-1;
  }else{
    p_month.value=p_month.value-1;
  }
  // 添加翻转动画
  const container = document.getElementById('calendar_container');
  container.classList.add('flip');
  setTimeout(() => {
    container.classList.remove('flip');
  }, 300);
}
function get_next_month(){
  if(p_month.value==12){
    p_month.value=1;
    p_year.value=p_year.value+1;
  }else{
    p_month.value=p_month.value+1;
  }
  // 添加翻转动画
  const container = document.getElementById('calendar_container');
  container.classList.add('flip');
  setTimeout(() => {
    container.classList.remove('flip');
  }, 300);
}

function minisora_act(id){
  if(id ===1){
    window.infoCard(1)
  }
  else if(id ===2){
    window.infoCard(2)
  }
  else {
    return;
  }
}
















// 依赖重新初始化来覆盖状态。
onMounted(() => {
  veryfy_if_log_expired();
  nextTick(() => {
    if (typeof window.initMiniSora === 'function') {
      console.log('Re-initializing MiniSora for new DOM elements');
      // 强制重新初始化。这会重新获取新的 DOM 元素引用，并重新绑定事件
      window.initMiniSora();
    } 
  });
});


</script>
<style scoped>
#check_label_system{
   margin-top: 35vh;
    width: 35vw;
    margin-left: 60vw;
    /* margin-bottom: 20vh; */
    
}
#calendar_container{
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: min-content;  
    gap: 8px; 
    width: 100%;
    
    background-color: transparent;
    cursor: default;
    box-sizing: border-box;  
    padding: 2vh 0 1vh 4vw; 

    transition: transform 0.3s ease;
}
@keyframes flip {
    0% { transform: rotateY(0deg); }
    50% { transform: rotateY(90deg); }
    100% { transform: rotateY(180deg); }
}

#calendar_container.flip {
    animation: flip 0.5s ease forwards;
}
#check_head{
    width: 100%;
    height: 8vh;
    max-height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    cursor: default;
    font-size: 1.5vw;
}
.p_week{
  font-size: 1vw;
    width: calc((100% - 48px) / 7);
    height: 6vh;
    max-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: -5px;
    margin-top: -15px;
}
.p_date{
    width: calc((100% - 48px) / 7);
    height: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Quicksand', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    border-radius: 8vw;
    font-size: 1vw;
}
#background{
    background-color: var(--surface-2);
    z-index: -3;
}
#check_log_request{
    text-align: center;
    margin-top: 20px;
    font-size: 1vw;
    color: var(--info);
    cursor: default;
    font-weight: 500;
    font-family: 'microsoft yahei' ;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
.today{
    color: var(--info);
    z-index: 1; 
}
.today::before {
    content: '';
    position: absolute;
    width: 3vw;
    height: 3vh;
    min-height: 25px;
    transition: background-color 0.8s ease-in-out;  
    background-color: var(--info-soft);
    z-index: -1;
}
.checked_day{
    color: var(--ok); 
}
.checked_day::before {
    content: '';
    position: absolute;
    width: 3vw;
    height: 3vh;
    min-height: 25px;
    background-color: var(--ok-soft);
    transition: background-color 0.8s ease-in-out;
    z-index: -2;
}

.today.checked_day::before {
    background-color: var(--info-soft);
    transition: background-color 0.8s ease-in-out;
    z-index: -1;
}
#check_info_text{
    text-align: center;
    font-size: 1vw;
    font-weight: 400;
    color: var(--ink-2);
    font-family: 'Quicksand', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    letter-spacing: 0.5px;  
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.12);
}
#checked_text{
    margin-left: 20px;
    margin-bottom: 6px;
    font-size: 1.1vw;
    font-weight: 500;
    color: var(--ok);
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.12);
    font-family: 'Quicksand', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
#check_button{
    text-align: center;
    width: 4vw;
    height: 2vh;
    min-height: 25px;
    border-width: 0;
    border-radius: 0.5vw;
    font-size: 0.8vw;
    background-color: var(--brand);
    font-weight: 500;
    font-family: 'Quicksand', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.arrow{
    width: 3vw;
    height: 2vh;
    min-height: 20px;
    position: relative;
    top: 3px;
}
.other-month{
    color: var(--ink-4);
    opacity: 0.7;
}
#home_app{
    position: relative;
    min-height: 180vh;
}
#character-sprite {
    width: 100%;
    height: 100%;
    object-fit: contain;
}




#info_card_container{
  border-radius: 1vw;
  color: var(--ink-2);
  position:absolute;
  top: 25vh;
  left: 70vw;
  background-color: var(--surface-2);
  min-width: 20vw;
  
  max-width: 25vw;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  font-family: 'Quicksand', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.info_category{
  
  margin-left:0.5vw;
  font-size: clamp(13px, 0.4rem + 0.9vw, 2vw);
}
.info_content{
  word-break: keep-all;
  margin-right:1vw;
  font-size: clamp(13px, 0.3rem + 0.8vw, 1.5vw);
}
.default_info{
  
  padding: 0.25vw 0 0.25vw 0.5vw; 
}
.heimu{
  word-break: keep-all;
  margin-right:1vw;
  font-size: clamp(13px, 0.3rem + 0.8vw, 1.5vw);
  background-color: var(--ink-2);
  transition:all 0.3s ease-in-out;
}
.heimu:hover{
  background-color: transparent;
  
}
#videoshare-contianer{
  position: absolute;
  top: 100vh;
  left:2vw;
}
</style>
<template>
    <div id="home_app">

    <div class="home-wrap">
    <div class="home-main">

    <!-- 左栏：头像 + 站名 + 看板娘 -->
    <div class="col-main">
    <div class="stage">

      <!-- 头像 -->
      <img id="im00001" :src='img_url' alt="NPC变态！" draggable="false">

      <!-- 站名 -->
      <p class="stage-roman">Minazuki Sora</p>

      <!-- 看板娘容器：对话框与立绘装同一个盒子里，保证对接 -->
      <div id="container">
          <!-- 看板娘容器（position:relative，对话框以它为参照物） -->
          <div id="character-container">
              <!-- 对话框（依赖 #dialogue-bubble / #dialogue-text，勿改） -->
              <div id="dialogue-bubble">
                  <p id="dialogue-text"></p>
              </div>
              <!-- 立绘裁剪层：容器本身 overflow:visible 给对话框用，这里单独裁立绘 -->
              <div class="sprite-clip">
                  <!-- 显示立绘（依赖 #character-sprite，勿改） -->
                  <img id="character-sprite" alt="水无月空" src='' crossorigin="anonymous" draggable="false">
              </div>
          </div>
      </div>

    </div>
    </div><!-- /.col-main -->

    <!-- 右栏：资料卡、日历卡（两张独立卡片，各自高度由内容决定） -->
    <div class="col-side">

     <!-- 资料卡 -->
     <div class="info-card">

       <div class="info-header">资料卡</div>

       <div class="info-body">

         <div class="group">
           <div class="group-title">身份</div>
           <div class="default_info">
             <span class="info_category">本名</span>
             <span class="info_content">水无月 空 <span class="info_sub">みなづき そら</span></span>
           </div>
           <div class="default_info">
             <span class="info_category">罗马音</span>
             <span class="info_content">Minazuki Sora</span>
           </div>
           <div class="default_info">
             <span class="info_category">生日</span>
             <span class="info_content"><span class="pill">2 月 25 日</span></span>
           </div>
           <div class="default_info">
             <span class="info_category">星座</span>
             <span class="info_content">双鱼座</span>
           </div>
         </div>

         <div class="group">
           <div class="group-title">设定 · 外貌</div>
           <div class="default_info">
             <span class="info_category">发色</span>
             <span class="info_content">亚麻色 / 淡金色 / 淡粉色</span>
           </div>
           <div class="default_info">
             <span class="info_category">瞳色</span>
             <span class="info_content">红色</span>
           </div>
           <div class="default_info">
             <span class="info_category">经典发型</span>
             <span class="info_content">双马尾 + 长散发</span>
           </div>
         </div>

         <div class="group">
           <div class="group-title">设定 · 档案</div>
           <div class="default_info">
             <span class="info_category">身高</span>
             <span class="info_content">162cm</span>
           </div>
           <div class="default_info">
             <span class="info_category">体重</span>
             <span class="heimu" @mouseenter="minisora_act(1)">47kg</span>
           </div>
           <div class="default_info">
             <span class="info_category">三围</span>
             <span class="heimu" @mouseenter="minisora_act(2)">B:87 W:51 H:85</span>
           </div>
         </div>

         <div class="group">
           <div class="group-title">出场作品</div>
           <div class="default_info">
             <span class="info_category">游戏</span>
             <span class="info_content">BALDR SKY DIVE 系列</span>
           </div>
           <div class="default_info">
             <span class="info_category">画师</span>
             <span class="info_content">菊池政治</span>
           </div>
           <div class="default_info">
             <span class="info_category">声优</span>
             <span class="info_content">生天目仁美</span>
           </div>
           <div class="default_info">
             <span class="info_category">人设</span>
             <span class="info_content">学园篇：正义 / 傲娇 / 毒舌<br>世界 0：感伤 / 沉稳</span>
           </div>
         </div>

       </div>

     </div>

     <!-- 日历卡：独立成卡，高度只由自己的内容决定 -->
     <div class="calendar-card">

       <div id="check_head" :style="{backgroundColor:head_color}">
         <div class="cal-nav">
           <div @click="get_last_month" class="calendar_arror"><img src="@/assets/svg/向左箭头.svg" class="arrow"></div>
           <span class="month">{{show_month}}{{p_year}}</span>
         </div>
         <div class="cal-nav">
           <div @click="get_next_month" class="calendar_arror"><img src="@/assets/svg/向右箭头.svg" class="arrow"></div>
         </div>
       </div>

       <div class="check-column">

         <div id="background">
           <div id="calendar_container">
             <div class="p_week">日</div><div class="p_week">一</div><div class="p_week">二</div><div class="p_week">三</div>
             <div class="p_week">四</div><div class="p_week">五</div><div class="p_week">六</div>
             <div v-for="(date,index) in p_date" :key="date.id" :class="{'today': isToday(date.day) && date.isCurrentMonth, 'checked_day': isCheckedDate(date.day) && date.isCurrentMonth, 'other-month': !date.isCurrentMonth}" class="p_date" >{{date.day}}</div>
           </div>
         </div>

         <!-- 生日倒计时（登录与否都显示） -->
         <div class="birthday">
      
           <div class="bd-text">
             <div class="bd-title">距离空的生日 · 2 月 25 日</div>
             <div class="bd-days" v-if="days_to_birthday > 0">还有<b>{{days_to_birthday}}</b>天</div>
             <div class="bd-days" v-else><b>今天</b>是空的生日</div>
           </div>
         </div>

         <!-- 登录后显示签到区 -->
         <template v-if="userStore.log_status ==='on'">
           <div class="stats">
             <div class="stat"><div class="num">{{constant_check_times}}</div><div class="lab">连续签到</div></div>
             <div class="stat"><div class="num">{{total_check_times}}</div><div class="lab">累计签到</div></div>
           </div>
           <div class="check-action">
             <button v-if="userStore.check_status ==='off'" id="check_button" class="btn-check" @click="check_in">签 到</button>
             <p v-else id="checked_text">已签到</p>
           </div>
         </template>

         <!-- 未登录 -->
         <template v-else>
           <div class="check-action">
             <p id="check_log_request">登录后可以签到打卡</p>
           </div>
         </template>

       </div>

     </div>

    </div><!-- /.col-side -->
    </div><!-- /.home-main -->

    <!-- 底部：站内动态 + 视频推荐 -->
    <div class="home-feed">
      <div class="feed-title">站内动态</div>
      <div class="bottom-grid">

        <div class="timeline-card">
          <table class="timeline-table" v-if="activities.length > 0">
            <thead>
              <tr>
                <th class="col-kind">类型</th>
                <th>内容</th>
                <th class="col-time">时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in activities" :key="index">
                <td><span class="kind-tag" :class="item.type">{{ kindLabel(item.type) }}</span></td>
                <td class="tl-title">{{ item.title }}</td>
                <td class="tl-meta">{{ item.time }}</td>
              </tr>
            </tbody>
          </table>
          <p class="tl-empty" v-else-if="activity_loading">动态加载中…</p>
          <p class="tl-empty" v-else>暂无动态</p>
        </div>

        <div class="feed-box">
          <div class="side-head">
            <span>视频推荐</span>
          </div>
          <videoshare/>
        </div>

      </div>
    </div>
    </div><!-- /.home-wrap -->

    <footer class="home-footer">
      <bottom/>
    </footer>
    </div>

</template>
<script setup>
import { onMounted, nextTick, computed } from 'vue';
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

// ===== 最近动态 =====
const activities = ref([]);
const activity_loading = ref(false);
const kindMap = { img:'图片', res:'资源', msg:'留言', sys:'站务' };
function kindLabel(t){ return kindMap[t] || '其他'; }
async function getRecentActivity(){
  activity_loading.value = true;
  try{
    const res = await fetch('/resource/getRecentActivity',{
      method:'GET',
      headers:{ 'Content-Type':'application/json' }
    });
    const data = await res.json();
    if(data.status === 200 && Array.isArray(data.list)){
      activities.value = data.list;
    }
  }
  catch(error){
    // 接口未就绪时静默降级，不影响页面
    console.log('最近动态暂不可用');
  }
  finally{
    activity_loading.value = false;
  }
}

// ===== 生日倒计时（2 月 25 日）=====
const days_to_birthday = computed(() => {
  const today = dayjs().startOf('day');
  let target = dayjs(`${today.year()}-02-25`).startOf('day');
  if (target.isBefore(today, 'day')) {
    target = dayjs(`${today.year() + 1}-02-25`).startOf('day');
  }
  return target.diff(today, 'day');
});

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
  getRecentActivity();

  
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
#home_app{
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* ===== 首页栅格：全站唯一的左右基准线 ===== */
/* ===== 首页栅格：四周基准 =====
   不再设 max-width —— 内容宽度 = 视口宽 − 左右边距，
   分辨率越高，内容越向四周扩散；边距本身也随分辨率小幅增长。 */
.home-wrap {
    width: 100%;
    box-sizing: border-box;
    padding: clamp(32px, 2.4vw, 60px) clamp(28px, 2.6vw, 88px) 0;
    flex: 1;
}

.home-main {
    display: grid;
    /* 左栏跟着看板娘的实际需要走（素材上限 694px），右栏吃掉剩余空间 */
    grid-template-columns: clamp(320px, 30vw, 720px) minmax(0, 1fr);
    gap: clamp(28px, 2.4vw, 72px);
    align-items: start;
}

.col-main { min-width: 0; }

/* 右栏：屏幕越宽列越多（列数在文件末尾的媒体查询里递增） */
.col-side {
    min-width: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(20px, 1.6vw, 32px);
    align-content: start;
}

/* ===== 左栏：头像 + 站名 + 看板娘 ===== */
.stage {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stage-name {
    margin: 10px 0 0;
    font-size: clamp(1.1rem, 0.85rem + 0.55vw, 2rem);
    font-weight: 600;
    color: var(--ink);
    letter-spacing: 2px;
}

.stage-roman {
    margin: 2px 0 0;
    font-size: clamp(0.6rem, 0.52rem + 0.2vw, 0.9rem);
    color: var(--ink-3);
    letter-spacing: 3px;
    text-transform: uppercase;
}

/* #container 只做居中；margin-top 是留给对话框弹出的净空（对话框挂在容器上沿） */
#container {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 96px;
}

/* 看板娘容器：受立绘素材分辨率限制，必须封顶
   position:relative 是 #dialogue-bubble 的定位参照物（对话框挂在容器上沿） */
#character-container {
    position: relative;
    width: 100%;
    max-width: 694px;      /* 2.5K 下 1080p 同款比例 */
    max-height: 852px;
    aspect-ratio: 115 / 141;
    margin: 0 auto;
    background: linear-gradient(180deg, rgba(232,138,168,0.10) 0%, rgba(155,138,196,0.10) 100%);
    border: 1px solid var(--line);
    border-radius: 14px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: visible;     /* 允许对话框溢出到容器上方 */
    box-shadow: var(--shadow-card);
}

/* 立绘裁剪层：铺满容器，单独 overflow:hidden 收住立绘的溢出部分 */
.sprite-clip {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    border-radius: 14px;
}

/* ===== 两张独立卡片：资料卡 / 日历卡 =====
   日历内容比资料卡少，若合并成一张卡必然出现空白。
   各自独立成卡，高度只由自己的内容决定。 */
.info-card,
.calendar-card {
    border-radius: var(--radius-card);
    background: var(--surface-2);
    box-shadow: var(--shadow-card);
    overflow: hidden;
}

/* 资料卡：撑满右栏 */
.info-card { width: 100%; }

/* 日历卡：宽度由固定尺寸的日历网格撑开，不跟随资料卡，避免左右大片空白。
   注意 col-side 现在是 grid：水平居中用 justify-self，align-self 只管垂直方向 */
.calendar-card {
    justify-self: center;
    align-self: start;
    width: fit-content;
    max-width: 100%;
}

/* 资料卡头部：整行通栏，不再左右分栏 */
.info-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 64px;
    font-size: clamp(15px, 0.4rem + 0.9vw, 22px);
    font-weight: 600;
    color: var(--ink);
    letter-spacing: 1px;
}
.info-header small {
    font-size: 0.5em;
    font-weight: 400;
    color: var(--ink-4);
    letter-spacing: 2px;
    margin-top: 3px;
}

/* 日历卡的月份条：整行通栏 */
#check_head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 64px;
    padding: 0 18px;
    cursor: default;
}
#check_head .month {
    font-size: clamp(14px, 0.4rem + 0.85vw, 21px);
    font-weight: 600;
    color: var(--ink);
    letter-spacing: 1px;
}

/* 资料卡内容区：容器放开后卡片会变宽，这里让 4 组信息在够宽时排成两列，
   否则「值靠右对齐」的写法会在左侧空出一大片 */
.info-body {
    padding: 0px 20px 20px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px 36px;
    align-content: start;
}
@media (min-width: 1400px) {
    .info-body { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

/* 日历卡内容区：白底只包住自己的内容 */
.check-column {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px 18px 18px;
    background: var(--surface);
}

/* 资料卡分组（组间距交给 .info-body 的 gap） */
.group { margin-top: 0; }
.group-title {
    font-size: clamp(12px, 0.35rem + 0.55vw, 15px);
    color: var(--brand-strong);
    font-weight: 600;
    letter-spacing: 1px;
    padding-bottom: 5px;
    margin-bottom: 6px;
    border-bottom: 1px solid var(--line);
}

.default_info {
    display: flex;
    align-items: baseline;
    padding: 2px 0;
}
.info_category {
    flex: 0 0 auto;
    width: 5.6em;
    font-size: clamp(12px, 0.35rem + 0.55vw, 15px);
    color: var(--ink-3);
}
.info_content {
    flex: 1;
    text-align: right;
    font-size: clamp(12px, 0.35rem + 0.6vw, 16px);
    color: var(--ink);
    line-height: 1.7;
    word-break: keep-all;
}
.info_sub {
    color: var(--ink-3);
    font-size: 0.85em;
    margin-left: 6px;
}

.pill {
    display: inline-block;
    background: var(--brand-soft);
    color: var(--brand-strong);
    border: 1px solid var(--brand-light);
    border-radius: var(--radius-pill);
    padding: 1px 12px;
    font-weight: 600;
}

.heimu {
    display: inline-block;
    margin-left: auto;      /* 宽度由内容决定，但仍靠右对齐 */
    text-align: right;
    background-color: var(--ink-2);
    color: var(--ink-2);
    border-radius: 3px;
    padding: 0 4px;
    font-size: clamp(12px, 0.35rem + 0.6vw, 16px);
    word-break: keep-all;
    transition: all 0.3s ease-in-out;
    cursor: help;
}
.heimu:hover {
    background-color: transparent;
}

/* 日历 */
.cal-nav { display: flex; align-items: center; gap: 12px; }
.calendar_arror { cursor: pointer; display: flex; align-items: center; }
.arrow {
    width: 3vw;
    height: 2vh;
    min-height: 20px;
    max-width: 34px;
}

/* 日历网格：列宽固定（不随容器拉伸），网格总宽 = 7×格子 + 6×间隙
   → 日历卡宽度由它撑开，不会有大片空白 */
#calendar_container {
    display: grid;
    grid-template-columns: repeat(7, clamp(40px, 2.4vw, 54px));
    gap: 4px;
    margin: 0 auto;
    box-sizing: border-box;
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

.p_week {
    text-align: center;
    font-size: clamp(11px, 0.3rem + 0.45vw, 13px);
    color: var(--ink-3);
    padding-bottom: 2px;
}
.p_date {
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: clamp(11px, 0.3rem + 0.45vw, 13px);
    color: var(--ink-2);
    cursor: default;
    position: relative;
}
.other-month {
    color: var(--ink-4);
    opacity: 0.7;
}
.today { color: var(--info); z-index: 1; }
.today::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--info-soft);
    transition: background-color 0.8s ease-in-out;
    z-index: -1;
}
.checked_day { color: var(--ok); }
.checked_day::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--ok-soft);
    transition: background-color 0.8s ease-in-out;
    z-index: -1;
}
.today.checked_day::before {
    background-color: var(--info-soft);
}

/* 统计 */
.stats {
    display: flex;
    gap: 10px;
}
.stat {
    flex: 1;
    text-align: center;
    border-radius: 10px;
    padding: 8px 4px;
}
.stat .num {
    font-size: clamp(15px, 0.5rem + 0.7vw, 19px);
    font-weight: 600;
    color: var(--brand-strong);
    line-height: 1.1;
}
.stat .lab {
    font-size: clamp(10px, 0.28rem + 0.4vw, 12px);
    color: var(--ink-3);
    margin-top: 3px;
    letter-spacing: 0.5px;
}

/* 生日倒计时 */
.birthday {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--brand-soft) 0%, var(--accent-soft) 100%);
    border: 1px solid var(--brand-light);
}
.bd-icon {
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
    border-radius: 50%;
    background: var(--brand);
    color: var(--surface);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 600;
}
.bd-text { line-height: 1.35; }
.bd-title {
    font-size: clamp(11px, 0.3rem + 0.45vw, 13px);
    color: var(--brand-strong);
    font-weight: 600;
    letter-spacing: 0.5px;
}
.bd-days {
    font-size: clamp(12px, 0.35rem + 0.5vw, 15px);
    color: var(--ink);
}
.bd-days b {
    font-size: 1.35em;
    color: var(--brand-strong);
    font-weight: 600;
    margin: 0 2px;
}

/* 签到 */
.check-action {
    text-align: center;
}
.btn-check {
    border: none;
    cursor: pointer;
    background: var(--brand);
    color: var(--surface);
    font-family: inherit;
    font-weight: 600;
    font-size: clamp(12px, 0.35rem + 0.5vw, 15px);
    letter-spacing: 2px;
    padding: 9px 0;
    width: 100%;
    border-radius: var(--radius-pill);
    box-shadow: 0 4px 12px rgba(196, 106, 135, 0.28);
    transition: all 0.2s;
}
.btn-check:hover {
    background: var(--brand-strong);
    transform: translateY(-1px);
}
#checked_text {
    margin: 0;
    font-size: clamp(12px, 0.35rem + 0.5vw, 15px);
    font-weight: 600;
    color: var(--ok);
}
#check_log_request {
    margin: 0;
    font-size: clamp(12px, 0.35rem + 0.5vw, 15px);
    color: var(--ink-2);
}

/* ===== 底部：站内动态 + 视频推荐 ===== */
.home-feed { margin-top: 40px; }
.feed-title {
    font-size: clamp(1rem, 0.7rem + 0.8vw, 1.8rem);
    color: var(--brand-strong);
    margin-bottom: 16px;
    font-weight: 600;
    letter-spacing: 1px;
}

.bottom-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    gap: clamp(20px, 1.8vw, 40px);
    align-items: start;
}

.timeline-card {
    background: var(--surface-glass);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 18px 20px;
    backdrop-filter: blur(10px);
}
.timeline-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}
.timeline-table th {
    text-align: left;
    font-weight: 600;
    font-size: clamp(10px, 0.28rem + 0.4vw, 12px);
    color: var(--brand-strong);
    letter-spacing: 1px;
    padding: 0 10px 8px 0;
    border-bottom: 1px solid var(--line);
}
.timeline-table td {
    padding: 11px 10px 11px 0;
    border-bottom: 1px dashed var(--line);
    vertical-align: middle;
    font-size: clamp(12px, 0.35rem + 0.5vw, 14px);
    color: var(--ink);
}
.timeline-table tr:last-child td {
    border-bottom: none;
    padding-bottom: 2px;
}
.timeline-table .col-kind { width: 70px; }
.timeline-table .col-time { width: 110px; text-align: right; padding-right: 0; }

.kind-tag {
    display: inline-block;
    padding: 2px 9px;
    border-radius: var(--radius-pill);
    font-size: clamp(10px, 0.28rem + 0.4vw, 12px);
    font-weight: 600;
    color: var(--surface);
    white-space: nowrap;
}
.kind-tag.img { background: var(--brand); }
.kind-tag.res { background: var(--accent); }
.kind-tag.msg { background: var(--info); }
.kind-tag.sys { background: var(--ink-4); }

.tl-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.tl-meta {
    font-size: clamp(10px, 0.28rem + 0.4vw, 12px);
    color: var(--ink-3);
    white-space: nowrap;
}
.tl-empty {
    font-size: clamp(12px, 0.35rem + 0.5vw, 14px);
    color: var(--ink-3);
    padding: 14px 0 4px;
    text-align: center;
}

.feed-box {
    background: var(--surface-glass);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 18px 20px;
    backdrop-filter: blur(10px);
}
.side-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
    margin-bottom: 4px;
    border-bottom: 1px solid var(--line);
}
.side-head > span:first-child {
    font-size: clamp(13px, 0.4rem + 0.6vw, 17px);
    font-weight: 600;
    color: var(--brand-strong);
    letter-spacing: 1px;
}
.side-head .live {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: clamp(10px, 0.28rem + 0.4vw, 12px);
    color: var(--ok);
}
.side-head .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ok);
}

.home-footer { width: 100%; margin-top: 40px; }

/* ===== 响应式 ===== */
@media (max-width: 1100px) {
    .home-wrap { padding: 28px 22px 0; }
    .home-main {
        grid-template-columns: 1fr;
        gap: 28px;
    }
    #container { margin-top: 88px; }
    .bottom-grid { grid-template-columns: 1fr; }
}
@media (max-width: 820px) {
    .home-wrap { padding: 22px 16px 0; }
    #container { margin-top: 76px; }
    .timeline-card,
    .feed-box { padding: 14px 14px; }
    .info-body { padding: 0 14px 14px; }
    .check-column { padding: 12px 14px 14px; }
    .info_category { width: 5em; }
    .timeline-table .col-kind { width: 54px; }
    .timeline-table .col-time { width: 76px; }
    .tl-title { font-size: 0.82rem; }
    .tl-meta { font-size: 0.7rem; }
    .kind-tag { font-size: 0.68rem; padding: 2px 7px; }
    .birthday { padding: 8px 10px; gap: 8px; }
    .bd-icon { width: 26px; height: 26px; flex: 0 0 26px; font-size: 13px; }
    .bd-title { font-size: 0.7rem; }
    .bd-days { font-size: 0.82rem; }
    .stat .num { font-size: 1rem; }
    .stat .lab { font-size: 0.65rem; }
}

/* ===== 宽屏：右栏列数递增，让多出来的空间真正被用上
   （原来这里是把 max-width 从 1400 加到 1700，结果只是整块内容放大一点、
   依旧缩在屏幕中间） ===== */
@media (min-width: 2000px) {
    .col-side { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 2700px) {
    .col-side { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
</style>

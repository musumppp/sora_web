<template>
    <div class="user">
        <div class="user-info">
        <div id="user_info_container">
        <div class="info"><span class="type">用户名：</span><span  class="content">{{username}}</span></div>   
        <div class="info"><span class="type">注册时间：</span><span  class="content">{{register_time}}</span></div>   
        <div class="info"><span class="type">签到总天数：</span><span  class="content">{{total_check_times}}</span></div>   
        <div class="info"><span class="type">连续签到天数：</span><span  class="content">{{constant_check_times}}</span></div>   
        <!-- <div class="info"><span class="type">看板娘说话的次数：</span><span  class="content">{{speaking_times}}</span></div>    -->
        
        <button @click="logout" id="log_out_button">退出登录</button>
        </div>
        </div>
    </div>
</template>
<script setup>

import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { onMounted } from 'vue';
const router = useRouter();
const userStore = useUserStore();
const username = ref('');
const register_time = ref('');
const total_check_times = ref('');
const constant_check_times = ref('');
async function getUserInfo() {
    try{
      const res=await fetch('/log/getuserinfo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

        },
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status === 200) {
        username.value = data.username;
        register_time.value = data.first_enter_time;
        total_check_times.value = data.total_check_times;
        constant_check_times.value = data.constant_check_times;
        get_check_info()
        return;
      }
       else if (res.status === 500){
        console.log('data.detail');
        return;
       }

}
    catch (error) {
      console.log('网络异常');
        return;
    }
}
async function get_check_info(){
  try{
      const res=await fetch('/log/get_history_check_date',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status === 200) {
        total_check_times.value = data.total_check_times;
        constant_check_times.value = data.constant_check_times;
        return;
      }
      else {
        console.log('数据请求失败');
        return;
      }
      }
      catch (error) {
        console.log('网络异常');
        return;
      }
}
async function logout() {
    if(confirm('确定注销登录吗?')){
    try{
      const res=await fetch('/log/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

        },
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status_code === 200) {
        alert('Logout successful');
        localStorage.removeItem('user-store');
        
        
        router.push('/');
        userStore.setLoginStatus('off');
        return;
      }
       else if (res.status === 500){
        alert('服务器错误');
        return;
       }
    }
    catch (error) {
      alert('网络异常');
        return;
    }   
}
    
}
onMounted(()=>{
    getUserInfo();
 
})
</script>
<style scoped>
.user {
    width: 100%;
    height: 100%;  
    align-items: center;
}
.user-info {
    width: 90vw;
    max-width: 60vw;
    min-width: 320px;
    height: 40vh;
    display: flex;
    margin-top: 30vh;
    margin-left: auto;
    margin-right: auto;
    flex-direction: column;
    letter-spacing: 0.5px;
    justify-content: center;
}
.type {
    font-size: clamp(17px, 0.6rem + 0.7vw, 2.3rem);
    margin-top: 3vh;
    color: var(--ink-2);
    font-weight: 500;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.content {
    font-size: clamp(15px, 0.5rem + 0.6vw, 2.2rem);
    margin-top: 3vh;
    color: var(--ink);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
    letter-spacing: 0.06vw;
}
#log_out_button{
    width: 2.5vw;
    height: 2.5vh;
    min-width: 70px;
    min-height: 30px;
    margin-left: calc(50% - 2.5vw);
    
    margin-top: 10vh;
    border-radius: 4px;
    border-width: 0;
    font-size: clamp(14px, 0.3rem + 0.5vw, 1.3rem);
    background: linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%);
    color: var(--surface);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(232, 138, 168, 0.4);
}

#log_out_button:hover {
    background: linear-gradient(135deg, var(--accent) 0%, var(--brand-strong) 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(232, 138, 168, 0.5);
}

#log_out_button:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(232, 138, 168, 0.4);
}
.info{
    display: flex;
    flex-direction: row;
    padding: 0 0 0 20vw;
}
</style>
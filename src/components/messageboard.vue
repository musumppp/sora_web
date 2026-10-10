<template>
   <div id="message_board">
     <div id="message_board_header">留言板</div>
     <div id="message_board_body" >
     <div id="single_message_container" v-for="message in MessageList" :key="message.id" @mouseenter="show_time(message.id)" @mouseleave="hide_time()">
        <div id="single_message_time" :style="{ color: show_message_time === message.id ? 'var(--ink-4)' : 'transparent' }">{{dayjs(message.time).format('YYYY-MM-DD HH:mm:ss')}}</div>
        <div id="single_message_container_line" >
        <div id="single_message_container_username">{{message.username}}：</div>
        <span id="single_message_container_content">{{message.content}}</span>
        </div> 
    </div>  
     </div>
     <div>
        <div id="no_log_message" v-if="log_status ==='off'">登陆后可以发表留言</div>
     <div v-else ref="message_board_ref" id="message_board_footer" >
        <textarea id="message_board_textarea" v-model="message_content" placeholder="留个言吧..." @focus="show_buttom = true"></textarea>
        <button  v-show="show_buttom" id="message_board_button" @click="postMessage()">提交</button>

     </div>
   </div>
   </div>
</template>
<script setup>
import { ref,onMounted,onUnmounted,computed} from 'vue'
import dayjs  from 'dayjs'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const log_status = computed(() => userStore.log_status);

const MessageList=ref([])
const message_content=ref('')
const show_buttom = ref(false)
const show_message_time = ref(null)
const message_board_ref = ref(null)
const showToast = (msg) => {
  const div = document.createElement('div')
  div.textContent = msg
  div.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: var(--ink);
    color: var(--surface);
    padding: 6px 12px;
    border-radius: 8px;
    font-size: clamp(12px, 0.3rem + 0.3vw, 1.5rem);
    z-index: 9999;
    opacity: 0.9;
  `
  document.body.appendChild(div)
  setTimeout(() => div.remove(), 1500)
}
function show_time(id){
    show_message_time.value= id
}
function hide_time(){
    show_message_time.value=null
}
const handleClickOutside = (e) => {
  // 如果点击不在Ref 元素内，就隐藏
  if (message_board_ref.value && !message_board_ref.value.contains(e.target)) {
    hidden_buttom()
  }
}
async function getMessageList(){
    try{
        const res = await fetch('/resource/getMessageList',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data =await res.json()
        if(data.status===200){
            for(let i = 0;i<data.content.length;i++){
                MessageList.value.push({'id':i+1,'content':data.content[i],'time':data.time[i],'username':data.username[i]})
            }
            return;
        }
        if(data.status===500){
            console.log('服务器错误')
            return;
        }
    }
    catch(error){
        console.log(error)
        return;
    }
}

async function postMessage(){
    if(!message_content.value){ 
         showToast('请输入内容');
         return;
    }
    try{
        const res = await fetch('/resource/addMessage',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'content':message_content.value,'time':dayjs().format('YYYY-MM-DD HH:mm:ss')}),
            credentials:'include'
        })
        const data =await res.json()
        if(data.status===200){
            console.log('留言提交成功')
            message_content.value=''
            return;
        }
    }
    catch(error){
        console.log(error)
        return;

    }

    }
function hidden_buttom(){
    
   
  show_buttom.value=false
    
}
onMounted(()=>{
    getMessageList();
    document.addEventListener('click',handleClickOutside)
})
onUnmounted(()=>{
    document.removeEventListener('click',handleClickOutside)
})
</script>
<style scoped>
#message_board{
    width:20vw;
    /* max-width: 700px; */
    font-family: 'Quicksand', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    
   
}
#message_board_header{
    width:100%;
    
    
    color: var(--ink-2);
    text-align: center;
    font-size: clamp(1rem, 0.8rem + 0.7vw, 3rem);
    font-weight: bold;

}
#message_board_body{
    width:100%;
    background-color: var(--surface-2);
    overflow-y: auto;
    overflow-x: hidden;
     min-height: 40vh;
    max-height: 60vh;
    display: flex;
    flex-direction: column;
     word-wrap: break-word;
  word-break: break-all;
  border-radius: 0.5vw;
}
#message_board_button{
    position: relative;
    transition: all 0.5s ease;
    cursor: pointer;
    border-radius: 4px;
    outline: none;
    border-width: medium;
    border-style: none;
    border-color: currentcolor;
    border-image: initial;
    width: 5vw;
    height: 4vh;
    max-width: 100px;
    max-height: 50px;
    font-size: clamp(12px, 0.3rem + 0.3vw, 1.5rem);
    color: var(--brand-strong);
    background-color: var(--brand-soft);
    left:20vw;
    transform:translateX(-100%);
}


#single_message_container{
    /* margin-top: 1vh;
    margin-bottom: 1vh; */
    padding: 1vh 0 1vh 0.5vw;
}
#message_board_body::-webkit-scrollbar {
  width: 5px;
}

#message_board_body::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

#message_board_body::-webkit-scrollbar-thumb {
  background: var(--line-2);
  border-radius: 3px;
}

#message_board_body::-webkit-scrollbar-thumb:hover {
  background: var(--ink-4);
}
#single_message_time{
   
  font-size: clamp(12px, 0.3rem + 0.3vw, 1.5rem);
  
}
#single_message_container_line{
   font-size: clamp(15px, 0.4rem + 0.6vw, 2rem); 
}
#message_board_textarea {
    margin-top: 0.5vh;
    width: 100%;
    height: 9vh;
    max-height: 100px;
    font-size: clamp(14px, 0.4rem + 0.5vw, 2rem);
    resize: none;  
    
    
    padding: 12px 16px;
    border-radius: var(--radius-card);
    
   
    border: 1.5px solid var(--line);
    background-color: var(--bg);
    
   
    transition: all 0.2s ease;
    
  
    font-family: inherit;
    line-height: 1.5;
    
    
    min-height: 40px;
}


#message_board_textarea:focus {
    outline: none;
    border-color: var(--line-2);
    background-color: var(--surface);
    box-shadow: 0 0 0 3px rgba(155, 138, 196, 0.12);
}


#message_board_textarea::placeholder {
    color: var(--ink-4);
    font-weight: 400;
}


#message_board_textarea::-webkit-scrollbar {
    width: 8px;
}

#message_board_textarea::-webkit-scrollbar-track {
    background: var(--bg);
    border-radius: 10px;
}

#message_board_textarea::-webkit-scrollbar-thumb {
    background: var(--line-2);
    border-radius: 10px;
}

#message_board_textarea::-webkit-scrollbar-thumb:hover {
    background: var(--ink-4);
}


#message_board_textarea {
    scrollbar-width: thin;
    scrollbar-color: var(--line-2) var(--bg);
}
#no_log_message {
    text-align: center;
    color: var(--ink-3); 
    font-size: clamp(12px, 0.3rem + 0.3vw, 1rem);
    background-color: var(--surface-glass); 
    margin: 1.5vh 1vw;
    padding: 1.5vh 1vw;
    border-radius: 10px;
    border: 1px dashed var(--line-2); 
    font-weight: 500;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}




#no_log_message:hover {
    background-color: var(--surface);
    border-color: var(--ink-4);
    color: var(--ink-2);
    
    box-shadow: var(--shadow-card);
}
</style>
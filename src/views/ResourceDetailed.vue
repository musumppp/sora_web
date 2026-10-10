<template>
    <div class="recource_detailed_container"> 
      <RouterLink to="/Recource" id="returnButton">返回</RouterLink>
      <div id="content-container">
      <p class="detailed_name">{{show_title}}</p>
      <div id="description">
      <p id="description_detailed">详细介绍</p>
      <p class="detailed_content_instruction">{{show_content_instruction}}</p>
      </div>
      <div id="download_text_continaer"> 
      <p id="download_text">前往下载</p>  
      <a class="detailed_content" :href="show_url" target="_blank">百度云</a>
      </div>
    </div>
     
    </div>   
</template>
<script setup>
import { ref,onMounted } from 'vue'
import { useRoute } from 'vue-router';
const route =useRoute();


const show_title =ref("")
const show_content_instruction =ref('')
const show_url = ref('')
async function get_show_title(){
  
    try{
      const res =await fetch('/resource/get_detail_info',{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({'resource_name':route.params.detail,
                              'id':route.params.id   
        })
      });
      const data =await res.json();
      if(data.status ===200){
        show_title.value=data.title;
        show_content_instruction.value=data.description;
        show_url.value=data.resource_url;
      }    
    }
    catch(error){
         console.log('网络或服务器错误')
    }
}

onMounted(()=>{
  get_show_title();
})

</script>
<style  scoped>
.recource_detailed_container{
  display:flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
}
.detailed_name{
  display:flex;
  margin-top:10vh;
 font-size: clamp(35px, 1rem + 1vw, 3.5rem);
 max-width: 80vw;
  color: var(--ink);
  justify-content: center;
  align-items: center;
}
#description{
  margin-top:5vh;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  color: var(--ink-2);
}
.detailed_content_instruction{
  margin-top: 5vh;
  font-size: clamp(20px, 0.8rem + 0.8vw, 2.5rem);
  max-width: 80vw;
  cursor: default;
  
  /* 增加行高*/
  line-height: 1.8; 
  
  
  color: var(--ink-2); 
  
  /* 字间距*/
  letter-spacing: 0.06vw;
  
 
  white-space: pre-wrap; /* 保留换行符 */
  word-break: break-word; 
  text-align: justify; /* 两端对齐*/
  
  
  padding: 0 1vw;
}


#description_detailed{
  font-size: clamp(25px, 0.9rem + 0.9vw, 3.4rem);
  cursor: default;
  color: var(--ink);
  font-weight: 600; 
  border-left: 0.3vw solid var(--brand); /* 装饰条 */
  padding-left: 0.8vw;
  margin-bottom: 2vh;
}
.detailed_content{
  display: flex;
  margin-top:clamp(15px, 0.8rem + 1vw, 3rem);
  /* margin-left:310px; */
  width:3vw;
  height: 2.5vh;
  min-width: 70px;
  min-height: 30px;
  text-decoration: none;
  background-color: var(--surface-2);
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: var(--ink-2);
  font-weight: 500;
  transition: all 0.2s ease;
  font-size :clamp(0.6rem, 0.5rem + 0.5vw, 1.5rem);
}
.detailed_content:hover{
box-shadow: 0 0 10px rgba(232, 138, 168, 0.3), 0 0 20px rgba(232, 138, 168, 0.15);
}
#returnButton{
  position: absolute;
  left:2vw;
  top:10vh;
  text-decoration: none;
  color: var(--ink-2);
  font-size: clamp(16px, 0.6rem + 0.8vw, 2.5rem);
  transition: transform 0.1s ease;
}
#returnButton:hover{
   
    font-weight: 600;
    transform: translateY(-1px);
}
#download_text{
  /* margin-left:310px; */
  margin-top:8vh;
  margin-bottom: 0;
  color: var(--ink);
  font-size:clamp(16px, 0.6rem + 0.8vw, 2.5rem);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
  cursor: default;
}
#content-container{
  min-width: 80vw;
  margin-left: auto;
  margin-right: auto;
}
#download_text_continaer{
 
  margin-bottom: 10vh;;
}
</style>

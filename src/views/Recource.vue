<template>
    <div id="resource">
      <div id="page_concrol" >
        <div @click="choicePage(0)" :class="{'isShowHead':page===0}">AI模型</div>
        <div @click="choicePage(1)" :class="{'isShowHead':page===1}">游戏资源</div>
        <div @click="choicePage(2)" :class="{'isShowHead':page===2}">同人社区</div>
      </div>
      <div id="page">
      <div class="page_0" v-show="page==0">
       <p class="resource_kind">绘画模型</p>
     
       <RouterLink v-for="DrawModelName in DrawModelNameList" :key="DrawModelName.id" :to="{name:'ResourceDetailed',params:{detail:DrawModelName.detail,id:DrawModelName.id}}" class="ResourceListTitle">{{DrawModelName.name}}</RouterLink>
  
       <p class="resource_kind">语音模型</p>
       <p class="ResourceListTitle">暂无</p>
       <RouterLink v-for="VoiceModelName in VoiceModelNameList" :key="VoiceModelName.id" :to="{name:'ResourceDetailed',params:{detail:VoiceModelName.detail,id:VoiceModelName.id}}" class="ResourceListTitle">{{VoiceModelName.name}}</RouterLink>
      </div>

      <div class="page_1" v-show="page==1">
      <p class="resource_kind">游戏资源</p>
      <RouterLink v-for="GameResourceName in GameResourceNameList" :key="GameResourceName.id" :to="{name:'ResourceDetailed',params:{detail:GameResourceName.detail,id:GameResourceName.id}}" class="ResourceListTitle">{{GameResourceName.name}}</RouterLink>
      </div>

      <div class="page_2" v-show="page==2">
      <p class="resource_kind">同人社区</p>
      <RouterLink v-for="CommunityName in CommunityNameList" :key="CommunityName.id" :to="{name:'ResourceDetailed',params:{detail:CommunityName.detail,id:CommunityName.id}}" class="ResourceListTitle">{{CommunityName.name}}</RouterLink>
      </div>
      </div>
      <div id="upload-resource-buttom" @click="show_upload_item()">上传资源或图片</div>
      <div v-if="if_upload_resource" ><Upload @cancel_upload_resource="hiden_upload"/></div>
    </div>
    <div id="messageboard"><Messageboard/></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router';
import Upload from '@/components/upload.vue'
import Messageboard from '@/components/messageboard.vue'
const page = ref(0)
const DrawModelNameList= ref([])
const VoiceModelNameList= ref([])
const GameResourceNameList= ref([])
const CommunityNameList= ref([])
const if_upload_resource = ref(false)

function show_upload_item(){
    if_upload_resource.value = true
}
function hiden_upload(){
    if_upload_resource.value = false
}
function choicePage(page_num){
    page.value = page_num
}

//资源名称获取
async function getResourceListName(){ 
    DrawModelNameList.value = []
    VoiceModelNameList.value = []
    GameResourceNameList.value = []
    CommunityNameList.value = []
   getDrawModel();
   getVoiceModel();
   getGameResource();
   getCommunityResource();
}
async function getDrawModel(){
     try {
        const res = await fetch('/resource/getDrawModel',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        if (data.status === 200) {
            console.log('资源列表获取成功')
            for (let i = 0; i < data.draw_model_title.length; i++) {
            DrawModelNameList.value.push({id:i,name:data.draw_model_title[i],detail:data.resource_name[i]})
                
            }

        }
        else if (res.status === 404) {
            console.log('语音模型资源为空')
        }
    } catch (error) {
        console.log(error)
        console.log('资源列表获取失败')
    }

}
async function getVoiceModel(){
     try {
        const res = await fetch('/resource/getVoiceModel',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        if (data.status === 200) {
            console.log('资源列表获取成功')
            for (let i = 0; i < data.voice_model_title.length; i++){
                VoiceModelNameList.value.push({id:i,name:data.voice_model_title[i],detail:data.resource_name[i]})
            }
        }
        else if (res.status === 404) {
            console.log('语音模型资源为空')
        }
     }
     catch (error) {
       
        console.log('资源列表获取失败')
    }
}
async function getGameResource(){ 
    try {
        const res = await fetch('/resource/getGameResource',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        if (data.status === 200) {
            console.log('游戏资源列表获取成功')
            for (let i = 0; i < data.game_resource_title.length; i++) {
           GameResourceNameList.value.push({id:i,name:data.game_resource_title[i],detail:data.resource_name[i]})
            }
        }
        else if (res.status === 404) {
            console.log('游戏资源为空')
        }
    }
    catch (error) {
        console.log('资源列表获取失败')
    }
}

async function getCommunityResource(){
    try {
        const res = await fetch('/resource/getCommunityResource',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        if (data.status === 200) {
            console.log('同人资源列表获取成功')
            for (let i = 0; i < data.community_resource_title.length; i++)
           {
             CommunityNameList.value.push({id:i,name:data.community_resource_title[i],detail:data.resource_name[i]})
           }
           console.log(CommunityNameList.value)
        }
        else if (res.status === 404) {
            console.log('同人社区资源为空')
        }
    }
    catch (error) {
        console.log('资源列表获取失败')
    }
}

     
onMounted(()=>{
    getResourceListName()
})

</script>
<style scoped>
#resource{
    overflow: hidden;
    width: 90%;
    max-width: 1200px;
    min-width: 320px;
    /* margin: 0 auto; */
}
#page_concrol{
    position: relative;
    display: flex;
    gap: 3vw;
    left: 10vw;
    top: 10vh;
    font-size: clamp(1rem, 0.8rem + 0.7vw, 2.5rem);
    font-weight: 500;
    color: var(--ink);
    cursor: pointer;
    margin-bottom: 3vh;
}
#page{
    width: 100%;
    height: 70vh;
    display: flex;
    padding: 14vh 0 0 13vw;
}
.isShowHead{
    color: var(--ink) !important;
    font-weight: 600;
}
.ResourceListTitle{
    display: flex;
    flex-direction: column;
    margin-left: 2vw;
    text-decoration: none;
    color: var(--ink);
    transition: transform 0.1s ;
    font-size: clamp(15px, 0.5rem + 0.8vw, 2rem);
    letter-spacing: 0.06vw;
}
.ResourceListTitle:hover{
    font-weight: 600;
    transform: translateY(-0.3vh);
}
.page_0,.page_1,.page_2{
    display: flex;
    gap: 4vh;
    flex-direction: column;
    align-items: flex-start;
}
.resource_kind{
    font-size: clamp(17px, 0.6rem + 0.7vw, 2.3rem);
    font-weight: 500;
    color: var(--ink);
    margin-bottom: 0.93vh;
}
#messageboard{
    position:absolute;
    right: 5vw;
    top: 10vh;
}

/* ============================================================
 * 窄屏：创作资源页在手机上几乎全部塌掉，逐块收拾
 * ============================================================ */
@media (max-width: 820px) {
    #resource {
        width: 100%;
        max-width: none;
        min-width: 0;
        padding: 0 16px;
        box-sizing: border-box;
    }
    /* 原来 left:10vw + top:10vh 把三个分类标签顶到右边、压到下面 */
    #page_concrol {
        left: 0;
        top: 0;
        gap: 1.2rem;
        margin: 0.9rem 0 1rem;
        font-size: 1rem;
    }
    /* 原来固定 70vh + padding 14vh 0 0 13vw（顶部空掉 134px、左边 57px） */
    #page {
        height: auto;
        min-height: 30vh;
        padding: 1rem 0 0;
    }
    .ResourceListTitle {
        margin-left: 0;
        font-size: 0.95rem;
    }
    /* 留言板从「绝对定位在右侧、20vw 宽」改回正常流 —— 不然就是一条面条 */
    #messageboard {
        position: static;
        margin: 2.5rem 0 3rem;
        padding: 0 16px;
    }
}
</style>
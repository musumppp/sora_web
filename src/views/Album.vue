<template>
            <div v-if="if_upload_resource">
            <upload @cancel_upload_resource="hiden_upload"/>
            </div>
    <div id="album">
        <div class="album_container">
            <vue-easy-lightbox
             :visible="visible"
             :imgs="imgs"
             :index="index"
             @hide="handleHide"
             style="z-index: 10001;"
             />
           <div v-for="imgContainer in imgContainerList" :key="imgContainer.id" class="img_container">
                <img v-lazy="imgContainer.show_img" class="show_image" :data-original="imgContainer.origin_img" @click="showImg(imgContainer.origin_img)" draggable="false">
           </div>
           
           <div id="sentinel"></div>
        </div>

        <div id="upload-resource-buttom" @click="show_upload_item()">上传资源或图片</div>
    </div>
    <button id="notice_button" @mouseenter="show_notice_item()" @mouseleave="hide_notice_item()">Look Here</button>
    <div id="notice-container" v-show="show_notice">
    <p id="notice">一些图片无法在页面内展示，空的图片全集，可以在创作资源-同人社区-空图收集里面寻找</p>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { onMounted,onUnmounted } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import Upload from '@/components/upload.vue'

const  imgContainerList = ref([])
const observer = ref(null)
const correct_page=ref(1)
const hasMore = ref(true)
const visible = ref(false)
const imgs = ref([]) // 图片列表（支持多图预览）
const index = ref(0) // 当前显示图片的索引
const if_upload_resource = ref(false)
const show_notice = ref(false)
function show_notice_item(){
    show_notice.value = true
}
function hide_notice_item(){
    show_notice.value = false
}
function hiden_upload(){
    if_upload_resource.value = false
}
function show_upload_item(){
    if_upload_resource.value = true

}
// 点击图片
const showImg = (imgUrl) => {
  imgs.value = [imgUrl] 
  index.value = 0
  visible.value = true
}

// 关闭预览
const handleHide = () => {
  visible.value = false
}

function setupObserver(){
    
    const option ={
        root: null,
        rootMargin: '0px 0px 100px 0px',
        threshold: 0
    }
    observer.value = new IntersectionObserver(function(entries){
        entries.forEach(entry => {
            if(entry.isIntersecting){
                if(hasMore.value){
                correct_page.value++
                getImgContainerList()
                }
            else{observer.value.unobserve(sentinel);
                    return;
                }
            }
        })
    },option)
    const sentinel = document.getElementById('sentinel');
    observer.value.observe(sentinel);           
}
async function getImgContainerList(){
    try{
    const response = await fetch(`/album/albumresource?page=${correct_page.value}&size=10`)
    const data = await response.json()
    if(data.status === 200){
        if(data.original_url.length < 10){
            hasMore.value=false
        }
        for(let i=0;i<data.original_url.length;i++){
         const id =(correct_page.value-1)*10+i   
         imgContainerList.value.push({id:id,origin_img:data.original_url[i],show_img:data.show_url[i]})
          }
        

          return;
        }
    if(res.status === 404){
        console.log('获取图片失败')
    }
    }catch(error){
        console.log(error)
 
    }    
}
onMounted(async ()=>{
    await getImgContainerList()
    setupObserver()

})
onUnmounted(()=>{
    observer.value.disconnect()
})
</script>
<style scoped>
#album{
    width: 100%;
}
.album_container{
    margin-left: auto;
    margin-right: auto;
    width: 75%;
    
    min-width: 320px;
    background-color: var(--surface-glass);
    min-height: 100vh;
    box-shadow: var(--shadow-card);
    border-radius: 0 0 10px 10px;
    display: grid;
    /* grid-template-columns: 45% 45%; */
    /* gap: 40px; */
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 4vw;
    padding: 4vw; 
    justify-content: center;
}
.img_container{
    background-color: var(--surface-glass);
    border-radius: 10px;
    box-shadow: var(--shadow-card);
    width: 350px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: all 0.1s ease;
    margin-left: auto;
    margin-right: auto;
}
.img_container:hover {
    transform: scale(1.05); 
    cursor: pointer; 
}
.show_image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
#notice_button {
    position: absolute;
    right: 2vw;
    top: 10vh;
    background-color: var(--brand); 
    color: var(--surface);
    border: none;
    padding: 8px 16px;
    border-radius: var(--radius-pill);
    font-size: clamp(0.4rem, 0.4rem + 0.4vw, 1.5rem);
    font-weight: bold;
    cursor: pointer;
    box-shadow: var(--shadow-card); 
    transition: all 0.3s ease; 
    z-index: 10; 
}
#notice_button:hover {
    background-color: var(--brand-strong);
    transform: translateY(-0.5vw); 
    box-shadow: var(--shadow-pop);
}
#notice-container {
    position: absolute;
    right: 2vw;
    top: calc(10px + 13vh);
    max-width: 10vw; 
    background-color: var(--surface); 
    border-radius: var(--radius-card); 
    padding: 0.6vw; 
    box-shadow: var(--shadow-pop);
    border: 1px solid var(--line); 
    backdrop-filter: blur(5px); 
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform-origin: top right; 
}
#notice {
    text-align: justify;
    color: var(--ink-2); 
    font-size: clamp(0.4rem, 0.4rem + 0.4vw, 1.5rem);
    line-height: 1.6; 
    margin: 0; 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
    letter-spacing: 0.5px; 
}
</style>

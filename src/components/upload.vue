<template>
    <Teleport to="body">
    <div id="container">
    <div id="upload_component_container">
        <div id="head"><span id="choice-category-text">类别</span><span class="category_text" :class="{ 'if_current_category': resource_category === 'create' }" @click="change_resource_category('create')">创作资源</span><span class="category_text" :class="{ 'if_current_category': resource_category === 'image' }" @click="change_resource_category('image')">图片</span></div>
        <div class="detail_content" v-if="resource_category === 'create'">
            <input type="file" class="upload_resource_buttom" style="display: none;" ref="getUploadFile" @change="show_upload_file">
            
            
            <button class="choice_upload_file" @click="get_upload_file">选择文件</button>          
          
              <div id="description-text-contianer"><p id="description-text">资源介绍</p></div>
            <textarea id="create_resource_textarea" placeholder="请对资源做下描述" v-model="description"></textarea>
              <div class="showed_file_name_container"><p class="showed_file_name">{{file_name}}</p></div>
            <button class="input_the_resource" @click="submit_upload_file">上传</button>
        </div>
        <div v-else-if="resource_category === 'image'">
            <input type="file" class="upload_resource_buttom" style="display: none;" ref="getUploadFile" @change="show_upload_file">
            
            <button class="choice_upload_file" @click="get_upload_file">选择文件</button>           
            
            <div id="preview_image_container"><img :src="preview_image" v-if='preview_image' id="preview_image"></div>
            <div class="showed_file_name_container"><p class="showed_file_name">{{file_name}}</p></div>
            <button class="input_the_resource" @click="submit_upload_file">上传</button>
        </div>
        <div v-if="if_uploading" id="is-uploading-text">...上传中...</div>
        
        <button id="cancel_upload_resource" @click="cancel_upload_resource()"><img id="cancel-buttom" src="@/assets/svg/叉号.png"></button>
    </div>
    </div>
    </Teleport>
</template>
<script setup>
import { ref } from 'vue'

const resource_category = ref('create')
const description = ref('')
const emit = defineEmits(['cancel_upload_resource'])
const getUploadFile = ref(null)
const file_name= ref('请选择文件')
const upload_file = ref(null)
const formData = new FormData()
const preview_image = ref('')
const if_uploading = ref(false)
function change_resource_category(category) {
    if (resource_category.value === category) {
        return
    }
    file_name.value = '请选择文件'
    upload_file.value = null
    preview_image.value = ''
    formData.delete('file')
    if (getUploadFile.value) {
        getUploadFile.value.value = ''
    }
    resource_category.value = category
}

function cancel_upload_resource(){
    emit('cancel_upload_resource')
}
function get_upload_file(){
       getUploadFile.value.click();
}
function show_upload_file(e){
    const file = e.target.files[0]
    file_name.value = file?.name || ''
    upload_file.value = file || null
    if (!file) return
    if (resource_category.value === 'image')
    {
        /* 换图前先释放上一张的 blob URL，否则反复选图会持续占内存 */
        if (preview_image.value) URL.revokeObjectURL(preview_image.value)
        preview_image.value = URL.createObjectURL(file)
    }
    /* 必须先 delete 再 append —— formData 是复用的同一个对象，
       连续选文件会累积出多个同名 file 字段，上传时一起发给后端 */
    formData.delete('file')
    formData.append('file', file)
}
async function submit_upload_file(){
    if (if_uploading.value === true)
    {
        alert('正在上传中，请勿重复提交')
        return
    }
    if (!upload_file.value) {
            alert('请选择文件！')
            return
        }
    try{
        const res = await fetch('/resource/uploadInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file_name: upload_file.value.name,
                file_size: upload_file.value.size,
                file_type: upload_file.value.type,
                description: description.value,})})
        const data = await res.json()
        
        if (data.status === 200) {
            console.log('资源信息上传成功')
        }
        else {
            alert('上传失败！服务器可能出错')
            return
        }
    }
        catch (error) {
            console.log(error)
            alert('上传失败，服务器错误')
            return
        }

        if_uploading.value = true
    try {
            const res = await fetch('/resource/upload', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            
            if (data.status === 200) {
                alert('上传成功！感谢你的贡献！资源经审核后将在网站中更新')
                if_uploading.value = false
               
            }
            else {
                alert('上传失败！服务器可能出错')
            }
        } catch (error) {
            console.log(error)
            alert('上传失败，服务器错误')
        }
        finally{
            if_uploading.value = false
        }
               
}
</script>
<style scoped>
#container{ 
   width:100%;
   height:100%;
   top:0;
   left:0;
   position:fixed;
   z-index: 9999;
   background-color: var(--surface-glass);
   font-family: 'Microsoft YaHei';
   color: var(--ink-2);
}
#upload_component_container{
    position:fixed;
    top:50%;
    left:50%;
    width:40%;
    height: 50%;
    
 
    transform:translate(-50%,-50%);
    background-color: var(--bg);
    border-radius: 10px;
    border: 3px solid var(--line-2);
 
}
#head{
    width:100%;
    margin-top: 3%;
    display: flex;
    flex-direction: row;
    margin-bottom: 3%;
}
#cancel_upload_resource{
    position:fixed;
    top:1.5%;
    right:1.5%;
    width: 3%;
    max-width: 25px;
    min-width: 15px;
    height: auto;
    cursor: pointer;
    border: none;
    background-color: transparent;
}
#cancel-buttom{
    width: 100%;
    height: auto;
}
.upload_resource_buttom{
    margin-left: auto;
    margin-right: auto;
}
#create_resource_textarea{
    width:80%;
    height:40%;
    margin-left: auto;
    margin-right: auto;
    resize: none;
    display: block;
}
.detail_content{
    width:100%;
    height: 80%;
}
#choice-category-text{
    font-size:calc(14px + 0.5vw);
    margin-right:5%;
    cursor:default;
    margin-left: 5%;
}
.category_text{
    font-size:calc(13px + 0.4vw);
    margin-right:5%;
    cursor: pointer;
    margin-left: 5%;
    transition: all 0.1s ease;
    display: block;
}
.category_text:hover{
    transform: translateY(-2px);
}
.if_current_category{
    font-weight: 600;
}
#preview_image_container{
    width:100%;
    height:20vh;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
#preview_image{
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-height: 100%;
    max-width: 100%;
}
.showed_file_name{
     font-size:calc(12px + 0.3vw);
     max-width:100%;
     overflow: hidden;
}
.showed_file_name_container{
    width:100%;
    max-height:20%;
     
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
}
.choice_upload_file{
    position:fixed;
    bottom:5%;
    left:66%;
    cursor: pointer;
    width: 20%;
    max-width: 120px;
    min-width: 80px;
    transform:translate(-50%,-50%);
     background-color: var(--brand);
    border-radius: 5px;
    border:none;
    height: 8%;
    max-height: 35px;
    min-height: 25px;
    font-size: calc(12px + 0.3vw);
}
.input_the_resource{    
    position:fixed;
    bottom:5%;
    left:33%;
    cursor: pointer;
    width: 20%;
    max-width: 120px;
    min-width: 80px;
    transform:translate(-50%,-50%);
        background-color: var(--brand);
    border-radius: 5px;
    border:none;
    height: 8%;
    max-height: 35px;
    min-height: 25px;
    font-size: calc(12px + 0.3vw);
}
#create_resource_textarea{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", sans-serif;
    font-size: calc(12px + 0.5vw);
    font-weight: 400;
    line-height: 1.6;
    color: var(--ink);
    padding: 2%;
    width: 80%;
    height: 40%;
    margin-left: auto;
    margin-right: auto;
    resize: none;
    display: block;
    border: 1px solid var(--line);
    border-radius: var(--radius-btn);
    outline: none;
    transition: all 0.3s ease;
    background-color: var(--bg);
}
#create_resource_textarea:focus {
    border-color: var(--line-2);
    background-color: var(--surface);
    box-shadow: 0 0 0 3px rgba(155, 138, 196, 0.12);
}
#create_resource_textarea::placeholder {
    color: var(--ink-4);           
    font-style: italic;       
    font-size: calc(11px + 0.4vw);          
    letter-spacing: 0.5px;    
    opacity: 1;               
}
#description-text-contianer{
     width:100%;
     height:10%;
}
#is-uploading-text{
    position:fixed;
    bottom:1%;
    left:50%;
    transform:translate(-50%,-50%);
    font-size: calc(12px + 0.3vw);
}
#description-text{
    margin-left: 6%;
    font-size: calc(12px + 0.3vw);
}
</style>

<template>
    <div id="register">
       <div id="logres__container">
        <div class="logAndReg" style="margin-left: auto;margin-right: auto;">注册</div>
    <div>
    <div class="reg_user">
        <label for="username">用户名 </label>
        <input  v-model="username" type="text" id="username" name="username"  placeholder="请输入用户名" >
    </div>
    <div class="reg_password">
        <label for="password">密码 </label>
        <input  v-model="password" type="password" id="password" name="password"  placeholder="请输入密码" >
    </div>
     <div class="reg_password">
        <label for="password1">确认密码 </label>
        <input  v-model="password1" type="password" id="password1" name="password"  placeholder="请确认密码" >
    </div>
      <div> <button class="reg_submit" type="button" @click="register">注册</button>
       <div><RouterLink to="/Login" class="to_log">注册好了？ 去登陆！</RouterLink></div></div>
    </div>
  </div>
    </div>
</template>
<script setup>
 import { ref } from 'vue'
const username = ref('')
const password = ref('')
const password1 = ref('')
async function register(){
     try{
        if(username.value === '' || password.value === '' || password1.value === ''){
            alert("请填写完整信息")
            return
        }
        if(password.value !== password1.value){
            alert("密码不一致")
            return
        }
        const res = await fetch('/log/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:username.value,
                password:password.value
            })
        })
        const data = await res.json()
        if(data.status_code === 200){
            alert("注册成功")
            username.value = ''
            password.value = ''
            password1.value = ''
            return
        }
        else if(res.status === 400){
            alert(data.detail)
            return
        }
        else if(res.status === 500){
            alert(data.detail)
            return
            }
     }
     catch(err){
        console.log(err)
        alert('服务器或网络错误！')
        return
     }
    

}
</script>
<style scoped>
#register{
    width: 20vw;
    max-width: 450px;
    min-width: 280px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10vw;
 
}
#logres__container{ 
   display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
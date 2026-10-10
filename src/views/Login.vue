<template>
    <div id="login">
        <div id="logres__container">
    <div class="logAndReg" style="margin-left: auto;margin-right: auto;">登录</div>
    <div>
    <div class="log_user">
        <label for="username">用户名 </label>
        <input  v-model="username"  type="text" id="username" name="username"  placeholder="请输入用户名" required>
    </div>
    <div class="log_password">
        <label for="password">密码 </label>
        <input v-model="password" type="password" id="password" name="password"  placeholder="请输入密码" required>
    </div>
        <div><button class="log_submit" type="button" @click="login">登录</button>
            <div><RouterLink to="/Register" class="to_reg">没有账号？ 点我注册！</RouterLink></div></div>
    </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import {useRouter} from 'vue-router'
import { useUserStore } from '@/stores/user'
    const username = ref('')
    const password = ref('')
    const log_status =ref('')
    const router = useRouter()
    const userStore = useUserStore()
    async function login(){
        try{
            const res = await fetch('/log/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username:username.value,
                    password:password.value
                }),
                credentials:'include'
            })
            const data = await res.json()
            if(data.status_code === 200){
           alert(data.message)
            userStore.setLoginStatus('on')
            router.push('/')
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
#login{ 
    width: 20vw;
    max-width: 450px;
    min-width: 280px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20vh;  
}
#logres__container{ 
     display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
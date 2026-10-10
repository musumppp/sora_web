import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const username = ref("");
  const log_status = ref("off");
  const check_status = ref("off");
  function setLoginStatus(status) {
    log_status.value = status;
  }
  function setCheckStaus(status){
    check_status.value = status;
  }
  function logOut(){
    setLoginStatus("off");
  }
  return { username, log_status, check_status,setLoginStatus, logOut,setCheckStaus }

},{
  
  persist: {
    key: 'user-store',  
    storage: localStorage, 
    paths: ['log_status'] 
  }

})
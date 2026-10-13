import { createWebHistory,createRouter } from "vue-router";
import Sora from "../views/Sora.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Album from "../views/Album.vue";
import Recource from "../views/Recource.vue";
import User from "../views/User.vue";
import ResourceDetailed from "../views/ResourceDetailed.vue";
const routes = [
  {
    path: "/",
    name: "Sora",
    component: Sora,
  },
  {
    path: "/About",
    name: "About",
    component: About,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  }
  ,
  {
    path: "/Album",
    name: "Album",
    component: Album,
  },
  {
    path: "/Recource",
    name: "Recource",
    component: Recource,
  },
  {
    path: "/User",
     name: "User",
    component: User,

  },
  {
    path: "/ResourceDetailed/:detail/:id",
    name: "ResourceDetailed",
    component: ResourceDetailed,
  },
  {
    /* 兜底路由：访问不存在的地址时回首页，而不是白屏 */
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    /* 切换路由时回到页面顶部 —— 否则在首页滚到底部再点导航，会停在上个页面的位置 */
    scrollBehavior() {
        return { top: 0 }
    },
})


export default router;
  






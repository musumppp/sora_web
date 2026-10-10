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
]

const router = createRouter({
    history: createWebHistory(),
    routes,

})


export default router;
  






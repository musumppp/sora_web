import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import piniapluginpersistedstate from 'pinia-plugin-persistedstate'
import Vue3Lazyload from 'vue3-lazyload'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniapluginpersistedstate)

app.use(pinia)
app.use(router)
app.use(Vue3Lazyload,{
    preload: 1.2,      
  threshold: 0.05,
    immediate: true,
    error: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmMGYwIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTAsIDUwKSI+PHBhdGggZD0iTTE1IDBoMjBsLTEwIDM1eiIgZmlsbD0iI2Y1NmM2YyIvPjxyZWN0IHg9IjE4IiB5PSI0MCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjEwIiByeD0iMiIgZmlsbD0iI2Y1NmM2YyIvPjwvZz48dGV4dCB4PSI1MCUiIHk9Ijg1JSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZjU2YzZjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7lm77niYfkuK3kvqE8L3RleHQ+PC9zdmc+',
    loading: 'data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
    attempt: 3,
    observerOptions: {
    rootMargin: '200px 0px',  
    threshold: 0.01
  },
})
app.mount('#app')





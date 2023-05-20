import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'element-plus/dist/index.css'

import router from './router'
import pinia from './store'
//将路由关联到vue3项目
createApp(App).use(pinia).use(router).mount('#app')

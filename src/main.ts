import { createApp } from 'vue'
import App from './App.vue'
import router from '@/modules/router'
import store from '@/modules/pinia'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

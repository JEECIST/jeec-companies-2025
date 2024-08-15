
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import './global.css'

createApp(App)
  .use(createPinia())
  .use(i18n)
  .use(router)
  .mount('#app')

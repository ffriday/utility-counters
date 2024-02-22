import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { loadEnv } from './functions'

const app = createApp(App)

app.use(createPinia())
app.use(router)

console.log(loadEnv());

app.mount('#app')

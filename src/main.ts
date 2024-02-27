import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

import { loadEnv } from './functions'
import App from './App.vue'
import router from './router'

const app = createApp(App)
export const firebase = initializeApp(loadEnv());

app.use(createPinia())
app.use(router)
app.use(createVuestic())

app.mount('body')

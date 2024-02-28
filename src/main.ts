import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

import { loadEnv } from './functions'
import App from './App.vue'
import router from './router'
const app = createApp(App)
export const firebase = initializeApp(loadEnv());
export const auth = getAuth()
export const db = getFirestore(firebase)

app.use(createPinia())
app.use(router)
app.use(createVuestic())

app.mount('body')

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { useKakao } from 'vue3-kakao-maps/@utils';

import { LoadingPlugin } from "vue-loading-overlay"
import 'vue-loading-overlay/dist/css/index.css';
const {VITE_API_MAP} = import.meta.env

// useKakao('238f4cfe387659db36737b184be4ffc2');
// useKakao('49c41bd6197ebea05e29425dd6780f25');
useKakao(VITE_API_MAP)
const app = createApp(App)

app.use(LoadingPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')

export default app;
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'

import router from "../pages/index.js"
import i18n from '../lang/index.js'



(()=>{window.base = 'http://192.168.100.11:4100'})();

(()=>{
    console.log(localStorage.lang)
    if(!localStorage.lang) localStorage.setItem('lang','uz')
        i18n.global.locale = localStorage.lang;
    })()
let app = createApp(App);
app.use(router);
app.use(naive);
app.use(i18n);
app.mount('#app');

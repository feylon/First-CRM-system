import {createRouter, createWebHistory} from "vue-router"

export default

createRouter({
    history:createWebHistory(),
    routes : [
        {path:"/admin/login", component : ()=>import('../src/components/admin/login.vue')},
        {path:"/admin", component:()=>import ("../src/components/admin/dashtboard.vue")}
    ]
});
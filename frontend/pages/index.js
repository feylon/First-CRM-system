import {createRouter, createWebHistory} from "vue-router"

export default

createRouter({
    history:createWebHistory(),
    routes : [
        {path:"/admin/login", component : ()=>import('../src/components/admin/login.vue')},
        {path:"/", component : ()=>import('../src/components/admin/login.vue')},
        {path:"/admin", component:()=>import ("../src/components/admin/dashtboard.vue"),
         children : 
         [
            {path:"/admin/Add_worker", component : ()=>import('../src/components/admin/worker/worker.vue')}
         ]   
        }
    ]
});
<template>
    <div>
        <div class=" mt-4 ms-2 mb-3 font-bold text-[18px] select-none">
            {{ $t('Workers') }}



            <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th>Abandon</th>
        <th>Abnormal</th>
        <th>Abolish</th>
        <th>...</th>
        <th>It's hard to learn words</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>放弃</td>
        <td>反常的</td>
        <td>彻底废除</td>
        <td>...</td>
        <td>Damn it! I can't remember those words.</td>
      </tr>
      <tr>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
      </tr>
    </tbody>
  </n-table>



            <n-pagination v-model:page="page" :page-count="total" />
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import i18n from "../../../../../lang";
import { useMessage } from "naive-ui";
import { useRouter } from "vue-router";
const router = useRouter();
let data = ref([]);
let page = ref(1);
let total = ref(100)
let token = localStorage.token;
let get_worker = async function(){
    let backend = await fetch(`${window.base}/admin/get_worker?${new URLSearchParams({
        page :1,
        size : 10
    }).toString()}`,
        {
            method : "GET",
            headers:{
                "Content-type" : "application/json",
                "-x-token" : token
            }
        }
    );
    console.log(backend.status);
    if(backend.status == 200) {
        backend = await backend.json();
        console.log(backend)
    }
}
onMounted(async()=>{
    get_worker()
})

</script>

<style lang="scss" scoped>

</style>
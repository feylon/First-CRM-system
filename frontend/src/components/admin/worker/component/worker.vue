<template>
    <div>
        <div class=" mt-4 ms-2 mb-3 font-bold text-[18px] select-none">
            {{ $t('Workers') }}



            <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th>№</th>
        <th>{{$t("firstname")}}</th>
        <th>{{$t("lastname")}}</th>
        <th>{{$t("email")}}</th>
        <th>{{$t("phone")}}</th>
        <th>{{$t("birthday")}}</th> 
        <th>{{$("viloyat")}}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td></td>
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



            <n-pagination @change = "console.log(page);get_worker()" v-model:page="page" :page-count="total" />
"        </div>
"    </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import i18n from "../../../../../lang";
import { useMessage } from "naive-ui";
import { useRouter } from "vue-router";
const router = useRouter();
let data = ref([]);
const {t} = i18n.global;
let page = ref(1);
let total = ref(1)
let token = localStorage.token;
let get_worker = async function(){
    let backend = await fetch(`${window.base}/admin/get_worker?${new URLSearchParams({
        page :page.value,
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
        total.value = Math.trunc(backend[0].total / 10 + 1); 
        console.log(backend)
    }
}
onMounted(async()=>{
    get_worker()
});
</script>

<style lang="scss" scoped>

</style>
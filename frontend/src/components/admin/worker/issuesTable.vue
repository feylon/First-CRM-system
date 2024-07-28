<template>
    <div class=" mx-auto">
        <div class="font-bold text-[18px]">
            Davomat
        </div>
        <div class="mt-3 w-full overflow-auto">


            <n-table :bordered="true" :single-line="false">
    <thead>
      <tr>
        <th class="w-[150px]">Rollar</th>
        <th class="w-[220px]"> Sana</th>
        <!-- <th>Admin</th> -->
        <th class="w-[170px]">Sabab</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
        <td  class="w-[80px]"><n-select placeholder="Rollarni tanlang" v-model:value="roleId" size="medium" :options="roleList" /></td>
        <td><n-date-picker v-model:value="rangetime" type="daterange" clearable /></td>
        <!-- <td ></td> -->
        <td class="p-5"><n-select v-model:value="reason" :options="reasonOption"></n-select></td>
        <td>
            <div class="flex justify-center">
                <n-button @click="search" :disabled="!rangetime?true:false" type="primary">
                <span class="material-symbols-outlined">
search
</span>     Izlash
            </n-button>
            </div>
        </td>
    </tbody>
</n-table>
        </div>
    


        <div class="mt-3">
          <n-table :bordered="true" :single-line="false">
            <thead>
              <tr>
                <th  class="w-[20px]">№</th>
            <th  class="w-[100px]">F.I</th>
            <th class="w-[20px]" v-for="(i,j) in thead" :key="j">

              <div class="text-center  ">
                {{ (new Date(i.time)).toISOString().split('T')[0] }} 
              </div>
            </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i,j) in workers" :key="j">
                <td>
                  {{  j + 1 }}
                </td>
                <td class="font-bold">{{ i.lastname }} {{ i.firstname }}</td>
                <td v-for="(ii, jj) in thead.length"><span v-if="i.time.includes(thead[jj].time)">
                  <span v-if="!Array.isArray(i.reason)"class="font-bold" :class="i.reason?'text-green-600':'text-red-600'">{{i.detail}} </span>
                  <span v-else class="font-bold" :class="i.reason?'text-green-600':'text-red-600'">{{i.detail}} </span>
                </span></td>
              </tr>
            </tbody>
          </n-table>


        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage, NCheckbox } from 'naive-ui';
import { options } from 'joi';
const router = useRouter();
const message = useMessage();

let roleId = ref(null);
const roleList = ref([]);
let rangetime = ref([118313526e4, Date.now()]);
let reason = ref(null);
let workers = ref([]);
let thead = ref([]);
let reasonOption = ref([
        {
          label: "Hammasi",
          value: undefined,
          disabled: false
        },
        {
          label: "Sababli",
          value: "true"
        },
    {
        label : "Sababsiz",
        value : "false"
    }])


watch(roleId, async (roleId, old)=>{
  
 console.log(roleId)
})


const getRole = async function (){
  try {
    const token = localStorage.token;
    let backend = await fetch(`${window.base}/admin/get_role`,
        {
            method:  "GET",
            headers : {
                "Content-type" : "application/json",
                "-x-token" : token
                }
        }
    );
    if(backend.status == 401){
      return  router.push("/admin/login")
    }
    if (backend.status == 200){
      roleList.value = [
      {
          label: "Roleni tanglang",
          value: "-1",
          disabled: true
        }
      ]
      backend = await backend.json()
      backend.forEach(element => roleList.value.push({label : element.name, value : element.id }));
    }
    
  } catch (error) {
    console.log(error)
  }
   
}
onMounted(async () => {
   await  getRole();
    
});

watch(rangetime,(watchtime, old)=>{
      
});

let search = async () => {

let arr = []
rangetime.value.forEach((i,j)=>{
    const date = new Date(i);
    const month = String(date.getMonth() + 1).padStart(2, '0');
const year = date.getFullYear();

const day = String(date.getDate()).padStart(2, '0');


arr[j] = `${year}-${month}-${day}`; 

});
console.log(roleId.value)
console.log(arr);
console.log(reason.value);

if(reason.value == null) reason.value = undefined;
const token = localStorage.token;

let backend = await fetch(`${window.base}/admin/get_issues/find`,{
  method : "POST",
  headers : {
                "Content-type" : "application/json",
                "-x-token" : token
                },
  body : JSON.stringify({
  timeBegin : arr[0],
  "timeEnd" : arr[1],
  "roleID" : roleId.value,
  "reason" : reason.value
})
});

if(backend.status == 401){
      return  router.push("/admin/login")
    }
    if (backend.status == 200){
      workers.value = []; 
      thead.value = ([]);
      backend = await backend.json()
      console.log(backend)
      
      backend.forEach(el=>{
        el.time.forEach(i=>{thead.value.push({time : i})})
      });
      
      backend.forEach(el=>workers.value.push(el));
      console.log(thead.value)
    }
}

</script>


<template>
    <div class="container">
        <div class="font-bold text-[18px]">
            Davomat
        </div>
        <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th class="w-[40px]">№</th>
        <th>F.I</th>
        <th class="w-[150px]">    <n-select placeholder="Rollarni tanlang" v-model:value="roleId" size="medium" :options="roleList" />
        </th>
        <th>Mavjud</th>
        <th>Sana

        </th>
        <th>Sabab</th>
        <th>Tasnif</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(i, j) in workers" v-if="workers.length > 0" :key="i.id">
        <td>{{  ++ j }}</td>
        <td>{{  i.lastname }} {{ i.firstname }}</td>
        <td class="text-center">{{ i.role_name}}</td>
        <td><n-switch v-model:value="i.active">
      <template #checked>
        Kelmagan
      </template>
      <template #unchecked>
        Kelgan
      </template>
    </n-switch></td>
        <td><n-date-picker :disabled="!i.active" v-model:value="i.time" :max-value="i.time"  type="date" />
        </td>

        <td>
          <n-switch :disabled="!i.active" v-model:value="i.reason">
      <template #checked>
        Sababli
      </template>
      <template #unchecked>
        Sababsiz
      </template>
    </n-switch>
        </td>


        <td>
          <n-input v-if="i.reason"
      v-model:value="i.detail"
      type="textarea"
      placeholder="Basic Textarea"
    />
        </td>
      </tr>
<tr v-if="workers.length == 0">
  <td colspan="7">
    <div class="flex h-[70px] flex-col select-none items-center h-4 selected" >
      <span class=""><span class="text-[30px]  text-red-500 font-bold material-symbols-outlined">
close
</span></span>
      <span>

     Ma'lumot mavjud emas
    </span>
  </div>
  </td>
</tr>
    </tbody>
  </n-table>

  <div class="flex justify-end mt-3 w-full p-4">
    <n-button v-if="workers.length > 0" @click="save">
      <span class="material-symbols-outlined">
save
</span>  Saqlash
    </n-button>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage, NCheckbox } from 'naive-ui';
const router = useRouter();
const message = useMessage();

let roleId = ref(null);
let workers = ref([]);
let searchdate = ref(Date.now())

watch(roleId, async (roleId, old)=>{
  
  const token = localStorage.token;

  let backend = await fetch(`${window.base}/admin/get_worker_search/all/?${new URLSearchParams({role_id:roleId}).toString()}`,
    {
      method:  "GET",
            headers : {
                "Content-type" : "application/json",
                "-x-token" : token
                }
    }
  );
  if(backend.status == 200){
    backend = await backend.json();
    workers.value = [];
    if(backend.length){
      backend.forEach(i =>{
      workers.value.push(
        { active : false,
          worker_id : i.id,
          reason : false,
          detail : "Sababsiz",
          time : Date.now(),
          lastname : i.lastname,
          firstname : i.firstname,
          role_name : i.role_name

        });
            
    });
    }    
    

  }
})
const roleList = ref([]);

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



let save = async function (){
 let validate = true; 
 workers.value.forEach(i=>{
    let validateTime = new Date(i.time)
    if (validateTime.getTime() > (new Date()).getTime()) {
  message.warning(`${i.lastname} ${i.firstname}ning davomatida vaqt oshib ketdi`)
  validate = false;
}
  })
if(!validate) return;

workers.value.forEach(i=>{
  if(i.detail.length < 5 ) {
    message.warning(`${i.lastname} ${i.firstname}ning davomatida sababligi 5 ta belgidan kam bo'lmasligi lozim`)
    validate = false;
  };
})
if(!validate) return;



let rebody = [];
workers.value.forEach((el, index)=>{
  if(el.active) rebody.push(
    {
reason : el.reason,
detail : el.detail,
worker_id : el.worker_id,
time : el.time
    })

});

rebody.forEach((i, j)=>{
  const date = new Date(i.time);

const year = date.getFullYear();
const month = date.getMonth() + 1; 
const day = date.getDate();

rebody[j].time = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

});



let token = localStorage.token 
try {
  let backend = await fetch(`${window.base}/admin/add_issues`,{
  method : "POST",
  headers:{
    "Content-type" : "application/json",
                "-x-token" : token
  },
  body : JSON.stringify(rebody)
});

if(backend.status == 201){
  workers.value = [];
  roleId.value = null;
  message.success ("Ma'lumotlar qo'shildi")

}
if(backend.status == 401){
      return  router.push("/admin/login")
    }
if(backend.status == 203){
  backend = await backend.json();
  
  let arr = backend.error;

arr = arr.split("Key");

arr = arr.toString();
arr = arr.split(",");

arr = arr.toString();
arr = arr.split("worker_id");

arr = arr.toString();
arr = arr.split('"("');

arr = arr.toString();
arr = arr.split(")");

arr = arr.toString();
arr = arr.split(" already exists.");

arr = arr.toString();
arr = arr.split('"time"');

arr = arr.toString();
arr = arr.split("=");

arr = arr.toString();
arr = arr.split("(");

arr = arr.toString();


arr = arr.toString();
arr = arr.split(" ");

arr = arr.toString();
arr = arr.split(",");
arr = arr.filter((i) => {
  return i.length > 0;
});

const token = localStorage.token;

let backend1 = await fetch(`${window.base}/admin/get_worker_search/byid/${eval(arr[0])}`,
  {
    method:  "GET",
          headers : {
              "Content-type" : "application/json",
              "-x-token" : token
              }
  }
);
if(backend1.status == 200){
  backend1 = await backend1.json();
    return  message.error(`${backend1.lastname} ${backend1.firstname} ${arr[1]} sanada davomatdan o'tgan`)
  
}
}  
} catch (error) {
  console.log(error)
}  
}
</script>
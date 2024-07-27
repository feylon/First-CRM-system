<template>
    <div>
        <div class="container mt-4 ms-2 mb-3 font-bold text-[18px] select-none">
            {{ $t('Workers') }}



            <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th>№</th>
        <th>{{$t("lastname")}}</th>
        <th>{{$t("firstname")}}</th>
        <th>{{$t("email")}}</th>
        <th>{{$t("phone")}}</th>
        <th>{{$t("birthday")}}</th> 
        <th>{{$t("viloyat")}}</th>
        <th>{{ $t('tuman') }}</th>
        <th>{{ $t("active") }}</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(i,j) in data" :key="i.id">
        <td>{{ ++ j  }} {{ i.id }}</td>
        <td>{{ i.lastname }}</td>
        <td>{{ i.firstname }}</td>
        <td>{{ i.email }}</td>
        <td>{{ i.phone }}</td>
        <td>{{ new Date(i.brithday).toISOString().split('T')[0] }}</td>
        <td>{{ i.name_uz }}</td>
        <th>{{ i.tuman_lotin }}</th>
        <th>    <n-switch v-model:value="i.active" :disabled="true" /></th>
        <th>
<editWorker :id ="i.id" />

        </th>
      </tr>    </tbody>
  </n-table>



            <n-pagination @change = "get_worker()" v-model:page="page" :page-count="total" />
<div class="flex justify-end">
  <n-button @click="AddWorkerModal = true">
    {{ $t("addWorker") }}
  </n-button>
</div>        
</div>
    </div>


    <n-modal  v-model:show="AddWorkerModal" class="custom-card"
    preset="card"
    :style="bodyStyle"
    :title="t('addWorker')"
    :bordered="false"
    size="huge"
    :segmented="segmented"
    aria-modal="true"
    >
    <template #header>
      <div>
    {{ $t("addWorker") }}
        
      </div>
    </template>
    <template #action>
      
      <div class="">
        <form>
        <div class="flex justify-around">
          <div class="w-[50%] gap-4 flex justify-around items-center">
          <div class="font-bold text-[13px]" >Ismi </div>
          <div class="w-[70%]">
          <n-input v-model:value="firstname" ></n-input>

          </div>
        </div>


        <div class="w-[50%] gap-4 flex justify-around items-center">
          <div class="font-bold text-[13px]" >Familiya </div>
          <div class="w-[70%]">
          <n-input v-model:value="lastname" ></n-input>

          </div>
        </div>
        </div>



        <div class="flex justify-around mt-3">
          <div class="w-[50%] gap-4 flex justify-around items-center">
          <div class="font-bold text-[13px]" >Email </div>
          <div class="w-[70%]">
          <n-input v-model:value="email" ></n-input>

          </div>
        </div>


        <div class="w-[50%] gap-4 flex justify-around items-center">
          <div class="font-bold text-[13px]" >Parol </div>
          <div class="w-[70%]">
            <n-input v-model:value="password"  type="password" show-password-on="mousedown"   placeholder="Password"  :maxlength="100"  />

          </div>
        </div>
        </div>



        <div class="flex justify-around mt-4">
          <div class="w-[50%] gap-4 flex justify-around items-center">
          <div class="font-bold text-[13px]" >Tug'ilgan kun </div>
          <div class="w-[70%]">
            <n-date-picker v-model:value="brithday" type="date" />

          </div>
        </div>


        <div class="w-[50%] gap-4 flex justify-around items-center">
          <div class="font-bold text-[13px]" >Viloyat </div>
          <div class="w-[70%]">
            <n-select v-model:value="viloyatID" size="medium" :options="viloyat" />


          </div>
        </div>
        </div>


        <div class="flex justify-around mt-4">
          


        <div class="w-[50%] gap-4 flex justify-around items-center">
          <div class="font-bold text-[13px]" >Tuman </div>
          <div class="w-[70%]">
            <n-select :disabled="!disabledtumanSection?false:true" v-model:value="tumanID" size="medium" :options="tuman" />


          </div>
        </div>


        <div class="w-[50%] gap-4 flex justify-around items-center">
          <div class="font-bold text-[13px]" >Role </div>
          <div class="w-[70%]">
            <n-select v-model:value="role_id"  size="medium" :options="role" />


          </div>
        </div>

        </div>

        <div class="flex justify-around mt-4">
          


          <div class="w-[50%] gap-4 flex justify-around items-center">
            <div class="font-bold text-[13px]" >Telefon </div>
            <div class="w-[70%]">
              <n-input v-model:value="phone"></n-input>
  
  
            </div>
          </div>
  
  
          
  
          </div>

<div class="flex justify-end mt-3">
<n-button  @click="add_data" dashed>Qo'shish</n-button>

</div>
      </form>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import {ref, onMounted, watch} from "vue";
import i18n from "../../../../../lang";
import { backTopDark, useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import editWorker from "../component/propsEditWorker.vue"

const joiPassword = Joi.extend(joiPasswordExtendCore);


let bodyStyle = {
        width: "600px"
      };
    let  segmented = {
        content: "soft",
        footer: "soft"
      };
const message = useMessage();      
const router = useRouter();
let data = ref([]);
let AddWorkerModal = ref(false);
const {t} = i18n.global;
const viloyat = ref([]);
const tuman = ref([]);
let disabledtumanSection = ref (false);
let role = ref([]);


// for backend
let email = ref(null)
let firstname = ref(null)
let lastname = ref(null)
let brithday = ref(null)
let phone = ref(null)
let role_id = ref(null)
let password = ref(null)
let viloyatID = ref([]);
let tumanID = ref(null);

async  function add_data (){
  
  const date = new Date(brithday.value);


const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

  let data = {
    email: email.value,
    firstname: firstname.value, 
    lastname: lastname.value,
    brithday: formattedDate,
    phone: phone.value,
    role_id: (role_id.value),
    password: password.value,
    viloyat: (viloyatID.value),
    tuman: (tumanID.value)
  };
  token
  try {
    let backend = await fetch (`${window.base}/admin/add_worker`,
  {
    method : "POST",
    headers:{
      "Content-type" : "application/json",
      "-x-token" : localStorage.token
    },
    body:JSON.stringify(data)
  }
  );
  if(backend.status == 202){
    backend = await backend.json();
    return message.warning(backend.error)
  }
  if(backend.status == 201){
    message.success(`${firstname.value} muvaqiyatli yaratildi`);
    
email.value = null;
firstname.value = null;
lastname.value = null;
brithday.value = null;
phone.value = null;
role_id.value = null;
password.value = null;
viloyatID.value = null;
tumanID.value = null;
AddWorkerModal.value = false;
get_worker();
  }
  } catch (error) {
    console.log(error)
  }
  
}


// *backend
watch(viloyatID, async function (newvalue, oldValue){
  disabledtumanSection.value = true;
  tuman.value = [];
  tumanID.value = null;
  let backend = await fetch(`${window.base}/admin/regions/districts/${(viloyatID.value)}`);
  backend = await backend.json();
  backend.forEach((el)=>{
tuman.value.push({label : el.name_uz, value : el.id.toString()});
});
  disabledtumanSection.value = false;

})
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
    if(backend.status == 200) {
        backend = await backend.json();
        total.value = Math.trunc(backend[0].total / 10 + 1); 
        data.value = [];
        backend.forEach(element => data.value.push(element));
      }

    }
onMounted(async()=>{
    get_worker();
    let backend = await fetch(`${window.base}/admin/regions`);
  backend = await backend.json();

  backend.forEach((el)=>{
viloyat.value.push({label : el.name_uz, value : el.id.toString()});
});

let token = localStorage.token; 
let backend1 = await fetch(`${window.base}/admin/get_role`,
  {
    method : "GET",
    headers:{
      "Content-type" : "application/json",
      "-x-token" : token
    }
  }
);


if(backend1.status == 200){
  backend1 = await backend1.json();
  
  backend1.forEach((el)=>{
    role.value.push({label : el.name, value : el.id.toString()});
  });
}
});
</script>

<style lang="scss" scoped>

</style>
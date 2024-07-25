<template>
    <div class="mb-6">
        <div class="font-bold text-[20px] select-none">
            {{ $t('workersAndRoles') }}

        </div>
        <add_worker/>

        <div class=" mt-4 ms-2 mb-3 font-bold text-[18px] select-none">
            {{ $t('roles') }}

        </div>

        <n-table class="w-[90%]  mx-auto">
            <thead>
                <tr>
                    <th>№</th>
                    <th>{{ $t("NameOfRole") }} </th>
                    <th>{{ $t('CreatedAtRole') }}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i, j) in worker_role" :key="i.id">
                    <td>{{ j + 1 }}</td>
                    <td>{{ i.name }}</td>
                    <td :title="i.created_at">{{ new Date(i.created_at).toISOString().split('T')[0] }}</td>
                    <td><n-button dashed  @click="showModal = true; EditRole = i.name;EditID = i.id"><span class="material-symbols-outlined">
edit
</span></n-button></td>

                </tr>

                <tr>
                    <td>
                        <span class="text-green-600 font-bold">
                            {{ worker_role.length + 1 }}

                        </span>
                    </td>
                    <td>
                        <div class="w-[70%]">

                            <n-input v-model:value="newRole" :placeholder="$t('addNewRole')"></n-input>
                        </div>
                    </td>
                    <td><n-button @click="addRole()" :disabled="newRole.length > 3 ? false : true"
                            dashed>{{ $t('addRole') }}</n-button></td>
                </tr>

            </tbody>
        </n-table>
    </div>
    <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
    <template #header>
      <div>{{ $t('editrole') }}</div>
    </template>
    <div>
        <n-input  v-model:value="EditRole"></n-input>
    </div>
    <template #action>
      <div><n-button @click="EditRole_func(EditID, EditRole)" :disabled="EditRole.length > 3 ? false : true" type="primary">
        <span class="material-symbols-outlined">
edit
</span> {{ $t('editrole') }}
      </n-button></div>
    </template>
  </n-modal>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import i18n from '../../../../lang';
import add_worker from "./component/worker.vue"
const { t } = i18n.global;

let EditRole = ref('');
let EditID = ref();
let showModal = ref(false);
let message = useMessage();
let router = useRouter();
let token;
let newRole = ref('')
let worker_role = ref([])
if (localStorage.getItem("token"))
    token = localStorage.getItem('token');
let getRole = async function () {
    let datarole = await fetch(`${window.base}/admin/get_role`,
        {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "-x-token": token
            }
        }
    );
    if (datarole.status == 200) {
        worker_role.value = [];
        datarole = await datarole.json();
        datarole.forEach(element => {
            worker_role.value.push(element);
        });

    }
    if (datarole.status == 401) { localStorage.clear(); return router.push('/admin/login'); }

}
const addRole = async function () {

    token = localStorage.getItem('token');

    let backend = await fetch(`${window.base}/admin/add_role`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "-x-token": token
            },
            body: JSON.stringify({ name: newRole.value.trim() })
        }
    );
    if (backend.status == 201) {
        message.success(t('successAddRole'));
        newRole.value = '';
        await getRole();
    }
    if (backend.status == 401) { localStorage.clear(); return router.push('/admin/login'); }
    if (backend.status == 400) {
        message.error(newRole.value + t("errorAddRole"));
        newRole.value = "";
    }

}

const EditRole_func = async function (id, str){
token = localStorage.getItem('token');

let backend = await fetch(`${window.base}/admin/edit_roles/${id}`,{
    method : "POST",
    headers: {
                "Content-type": "application/json",
                "-x-token": token
            },
            body: JSON.stringify({ name: str.trim() })
});
if(backend.status == 200){
   message.success(t('editRoleSuccess')); 
   getRole()
   return showModal.value = false;


}
if( backend.status == 400){
    message.error(str + t("errorAddRole"));

}
if (backend.status == 401) { localStorage.clear(); return router.push('/admin/login'); }

 }
onMounted(async () => {
    await getRole();
});
</script>

<style scoped></style>
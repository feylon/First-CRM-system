<template>
    <div
        class="bg-blue-700 overflow-hidden select-none  bg-center flex items-center justify-center overflow-hidden bg-no-repeat bg-cover md:bg-[url('/public/login_background.jpg')] min-h-screen min-w-screen">



        <div class="w-[400px] 
          rounded-[20px] overflow-hidden pb-[60px] bg-white">
            <div class="h-[250px] relative bg-blue-600 bg-no-repeat bg-cover bg-[url('/public/wp-create-user.png')]">
                <n-space class="absolute  right-4 top-4">
                    <n-dropdown trigger="hover" :options="options" @select="changeLang">
                        <n-button>
                            <img :src="i18n.global.locale == 'uz' ? '../../../public/1670868198_grizly-club-p-flag-uzbekistana-png-9.png' : '../../../public/EM7LidKw8aA.jpg'"
                                class="w-[25px]" lt="">
                        </n-button>
                    </n-dropdown>

                </n-space>
                <span
                    class="absolute text-white select-none text-[28px] flex items-center gap-1 top-[10px] left-[10px] font-semibold">
                    <span class="text-[13px] rotate-45 duration-100"><i class="fas fa-square"></i></span>
                    {{ $t('Airleet') }}
                </span>
                <span class="bottom-[5px]   absolute text-center w-[400px] text-[10px] text-white">
                    {{ $t('Login_dectiption') }}
                </span>
            </div>

            <form @submit.prevent="login_func">
                <div class="text-center mt-3 text-[17px] font-bold">
                    {{ $t('Login') }}
                      <!-- <img src="../../../public/" alt=""> -->
                </div>
                <div class="w-[90%] mx-auto flex justify-center gap-3 mt-4 items-center">
                    <label for="login" class="text-blue-600"><i class="fas fa-user-large"></i></label>
                    <div class="w-[70%]">
                        <n-auto-complete :disabled="loading" :status="loginStatus" v-model:value="login" id="login" type="text"
                            :placeholder="$t('EnterYourLogin')" />

                    </div>
                </div>

                <div class="w-[90%] mx-auto flex justify-center gap-3 mt-4 items-center">
                    <label for="password" class="text-blue-600"><i class="fas fa-key"></i></label>
                    <div class="w-[70%]">
                        <n-input :disabled="loading" type="password" show-password-on="mousedown" placeholder="Password" :maxlength="100"
                            :status="passwordStatus" v-model:value="password" id="password"
                            :placeholder="$t('EnterYourLogin')" />

                    </div>
                </div>


                <button :disabled="loading?true:false" :class="loading?'bg-blue-400 animate-bounce':'bg-blue-600'" class="text-white  rounded-sm mx-auto block mt-5 w-[70%] h-[30px]">
                    <span v-if="!loading">{{$t('loginbutton') }}</span>
                    <span v-else><i class="fas fa-spinner animate-spin"></i></span>
                </button>
            </form>
        </div>

    </div>
</template>

<script setup>
import  {useRouter} from "vue-router"
import i18n from '../../../lang';
import { ref } from 'vue';
import { useMessage } from "naive-ui";
const message = useMessage();
const {t} = i18n.global;
const router = useRouter();
const loginStatus = ref('success');
const passwordStatus = ref('success'); 

let login = ref("jamshid14092002@gmail.com");
let password = ref("!Jamshid14092002");
let loading = ref(false);
let options = [{ label: "O'zb", key: "uz" }, { label: "En", key: 'en' }]
function changeLang(key) {
    if (String(key) == 'en') {localStorage.setItem('lang','en');return i18n.global.locale = 'en';}
    if (String(key) == 'uz') {localStorage.setItem('lang','uz');return i18n.global.locale = 'uz';}
}
async function login_func (){

if(!password.value) {loginStatus.value = 'error';return message.warning(t('enteryourlogin'));}
if(!password.value) {passwordStatus.value = 'error';return message.warning(t('enteryourpassword'));}
try {

loading.value = true;
let data = await fetch(
    `${window.base}/admin/login`,
    {method:"POST",
        headers:{
            "Content-type" : "application/json"
        },
        body:JSON.stringify(
            {
                email:login.value,
                password:password.value
            }
        )
    }
);
if(data.status == 401){
    loginStatus.value = 'error';
    passwordStatus.value = 'error';
    message.error(t('errorLoginPassword'))
    login.value = "";
    password.value = "";
    loading.value = false;

    return;   
}
if(data.status == 200){
    loading.value = false;
    data = await data.json();
    console.log(data.token);
    localStorage.setItem('token',data.token);
    router.push("/admin")
    return ;
}

} catch (error) {
    message.info(t('errorCatchLogin'));
    loading.value = false;

}
    }
</script>

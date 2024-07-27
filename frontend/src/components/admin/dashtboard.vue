<template>
  <div class="bg-gray-200  overflow-hidden w-[100vw] h-[100vh]">
      <div class="w-full h-[50px] flex justify-between items-center bg-gray-900">
  <div class="text-white"> 
    <span
                    class="me-5 flex justify-center w-[240px]  block absolute text-white select-none text-[28px] flex items-center gap-1 top-[10px] left-[10px] font-semibold">
                    <span class="text-[13px] rotate-45 duration-100"><i class="fas fa-square"></i></span>
                    {{ $t('Airleet') }}
                </span>
  </div>
  
  <div class="flex gap-3 items-center">
    <n-dropdown trigger="hover" :options="notification_list" @select="changeLang">
      <n-badge class="me-3" :value="notification" :max="100">
        <span class="text-white material-symbols-outlined">
notifications
</span>

</n-badge>
</n-dropdown>
    <n-dropdown trigger="hover" :options="options_lang" @select="changeLang">
                          <n-button>
                              <img :src="i18n.global.locale == 'uz' ? '../../../public/1670868198_grizly-club-p-flag-uzbekistana-png-9.png' : '../../../public/EM7LidKw8aA.jpg'"
                                  class="w-[25px]" lt="">
                          </n-button>
                      </n-dropdown>
    
    <div class="h-full w-[200px] cursor-pointer me-4">
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <div class="h-full ps-3 flex items-center w-full border-s-[1px]">
        <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG" class="w-[50px] rounded-[50%]" alt="">
        <div class="flex flex-col">
          <span class="text-white font-bold ps-3">Ergashev Jamshid</span>
          <span class="text-white text-[12px] text-center">Admin</span>
        </div>
      </div>
    </n-dropdown>
  </div>
  
  </div>
      </div>
      
      
      
      
      <n-layout class="h-full" has-sider>
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          show-trigger
          :inverted="inverted"
        >
          <n-menu
            class=""
            :inverted="inverted"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout>
          <div class="p-3 pb-[100px]">
              
            <RouterView></RouterView>
  
</div>
        </n-layout>
      </n-layout>
  </div>
  
  </template>
  
  <script setup>
  import { ref,h } from 'vue';
  import i18n from '../../../lang';
  
  
  
  import { RouterLink, useRouter } from "vue-router";
  import { useMessage } from "naive-ui";
  import {v4 as uuidv4} from 'uuid';



let options_lang = [{ label: "O'zb", key: "uz" }, { label: "En", key: 'en' }];
const {t} = i18n.global;
const router = useRouter();
let delete1 = ref(0);
let notification = ref(0);
let notification_list = ref([]);
let time = setInterval(()=>{notification.value ++;
  let date = new  Date();
  notification_list.value.push({label : `${date.toLocaleTimeString()} : ${uuidv4()}`, key : `${uuidv4()}`});
  delete1.value ++;
  if(delete1.value == 15) clearInterval(time); 
}, 1000)

  function changeLang(key) {
    if (String(key) == 'en') {localStorage.setItem('lang','en');window.location.reload();}
    if (String(key) == 'uz') {localStorage.setItem('lang','uz');window.location.reload();}
}
  function renderIcon(className) {
    return () => h("i", {class:className});
  }
  
  function renderIconSpan(name) {
    return () => h("span", {class:"material-symbols-outlined"},{default:()=>name});
  }
  
  let inverted = ref(true)
  const menuOptions = [
    
    {
      label: t("Curriculum"),
      key: "pinball-1973",
       icon: renderIconSpan("group"),
      disabled: false,
      children: [
        {
          label: () => h(
        RouterLink,
        {
          to:"/admin/Add_worker"
        },
        { default: () => t('addWorker') }),
          key: "addWorker",
          icon: renderIconSpan("group_add")
        },
        {
          label: () => h(
        RouterLink,
        {
          to:"/admin/issues"
        },
        { default: () => "Davomat" }),
          key: "issues ",
          icon: renderIcon("fas fa-receipt")
        },
        {
          label: () => h(
        RouterLink,
        {
          to:"/admin/login"
        },
        { default: () => "Davomat" }),
          key: "Davomat",
          icon: renderIcon("far fa-calendar-xmark")
        },
        {
          label: () => h(
        RouterLink,
        {
          to:"/admin/login"
        },
        { default: () => "Jurnal" }),
          key: "Jurnal",
          icon: renderIconSpan("book_5")
        },
        {
          label: () => h(
        RouterLink,
        {
          to:"/admin/login"
        },
        { default: () => "Topshiriqlar" }),
          key: "Topshiriqlar",
          icon: renderIconSpan("contract_edit")
          
        }
      ]
    },
    {
      label:"Tizim",
      key:"Tizim",
      icon: renderIconSpan("engineering"),
      children:[
        {
          label: () => h(
        RouterLink,
        {
          to:"/admin/login"
        },
        { default: () => "Kirish tarixi" }),
          key:"Kirish tarixi",
          icon: renderIconSpan("manage_history"),
  
        },
        {
          label: () => h(
        RouterLink,
        {
          to:"/admin/login"
        },
        { default: () => "Profil" }),
          key:"Profil",
          icon: renderIconSpan("account_circle"),
  
        }
      ]
      },
    {
      label: "To'lov",
        key:"tulov",
        icon: renderIconSpan("payments"),
        children:[
          {
            label: () => h(
        RouterLink,
        {
          to:"/admin/login"
        },
        { default: () => "Kontrakt" }),
        key:"kontrakt",
        icon: renderIconSpan("credit_card"),
  
          },
          {
            label: () => h(
        RouterLink,
        {
          to:"/admin/login"
        },
        { default: () => "Kutubxona" }),
        key:"payment_for_book",
        icon: renderIconSpan("dictionary"),
  
          }
        ]
  
    },
    {
      label:"Ishchi ma'lumotlari",
      key:"student-information",
      icon: renderIconSpan("dictionary"),
      children:[
        {
          label:() => h(
        RouterLink,
        {
          to:"/admin/login"
        },
        { default: () => "Kutubxona" }),
        key:""
        }
      ]
    }
  ];
  
  
  
  
  const message = useMessage();
  
  const options = ref([
   
    {
            key: "header",
            type: "render",
            render:()=> h("div",{class:"flex p-3 pb-0 ps-2 w-[215px]"},
            [
            h("div", {class:"flex items-center select-none"},[
            h("img", {
          round: true,
          style: "margin-right: 8px;",
          src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG',
          class:"w-[60px] rounded-md m-3",
          title: `Ergashev Jamshid`
        }),
  
        h('div',
        [
        h("div",{class:"text-[13px] font-bold"},h("div",
        {innerHTML :`Ergashev Jamshid`}
        )),
        
        h("div",{class:"text-[13px] text-center"},h("div",
        {innerHTML :`Admin `}
        )),
            ])
        ])
  
          ]
            )
          },
    {
      key: "header-divider",
      type: "divider"
    },
    {
      label: "lpsum1",
      key: "stmt1"
    },
    {
            key: "profil",
            type: "render",
            label:"salom",
            render:()=>{
              return h("div",{class:"ps-4 duration-700 flex items-center hover:bg-blue-200 cursor-pointer flex border-t-[1px] border-solid"},[
                h("span",
           
              {innerHTML:`<span class="text-[20px] text-blue-950"><span class="material-symbols-outlined">admin_panel_settings</span></span>` },
              {class:""}
              ),
              h("div",
              {class:"text-black ps-3"},
              {default:()=>"Profil"}
              )
            ])
            },
            props:{onClick:()=>{
              console.log("salom")
            }}
          },
    {
            key: "Own_info",
            type: "render",
            label:"salom",
            render:()=>{
              return h("div",{class:"ps-4 duration-700 flex items-center hover:bg-blue-200 cursor-pointer flex border-t-[1px] border-solid"},[
                h("span",
           
              {innerHTML:`<span class="text-[20px] text-blue-950"><i class="fas fa-user-check"></i></span>` },
              {class:""}
              ),
              h("div",
              {class:"text-black ps-3"},
              {default:()=>"Shaxsiy ma'lumotlar"}
              )
            ])
            },
            props:{onClick:()=>{
              console.log("salom")
            }}
          },
    {
            key: "update_photo",
            type: "render",
            label:"salom",
            render:()=>{
              return h("div",{class:"ps-4 duration-700 flex items-center hover:bg-blue-200 cursor-pointer flex border-t-[1px] border-solid"},[
                h("span",
           
              {innerHTML:`<span class="text-[20px] text-blue-950"><i class="fas fa-camera-rotate"></i></span>` },
              {class:""}
              ),
              h("div",
              {class:"text-black ps-3"},
              {default:()=>"Profil rasmini yangilash"}
              )
            ])
            },
            props:{onClick:()=>{
              console.log("salom")
            }}
          },
          {
            key: "sign_out",
            type: "render",
            label:"salom",
            render:()=>{
              return h("div",{class:"ps-4 duration-700 flex items-center hover:bg-red-200 cursor-pointer flex border-t-[1px] border-solid"},[
                h("span",
           
              {innerHTML:`<span class="text-[20px] text-red-800"><i class="fas fa-arrow-right-from-bracket"></i></span>` },
              {class:""}
              ),
              h("div",
              {class:"text-red-800 ps-3"},
              {default:()=>"Tizimdan chiqish"}
              )
            ])
            },
            props:{onClick:()=>{
              router.push("/admin/admin/login")
            }}
          }
  ]);
  
  function handleSelect(key) {
    message.info(String(key));
    console.log(key)
  }
  </script>
  
  <style>
  .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
  }
  ::-webkit-scrollbar-track {
  border: 1px solid white;
  /* border color does not support transparent on scrollbar */
  /* border-color: transparent; */
  background-color: #b2bec3;
}

::-webkit-scrollbar {
  width:8px;
  background-color: #dfe6e9;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(0, 20, 40);
  border-radius: 5px;
}

  </style>
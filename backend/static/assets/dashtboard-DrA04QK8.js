import{i as T,a as J,r as m,k as e,u as A,c as K,b as a,e as P,t as q,d as i,w as d,g as p,R as r,j as u,o as $}from"./index-BC6Xn69q.js";var o=[];for(var f=0;f<256;++f)o.push((f+256).toString(16).slice(1));function B(t,n=0){return(o[t[n+0]]+o[t[n+1]]+o[t[n+2]]+o[t[n+3]]+"-"+o[t[n+4]]+o[t[n+5]]+"-"+o[t[n+6]]+o[t[n+7]]+"-"+o[t[n+8]]+o[t[n+9]]+"-"+o[t[n+10]]+o[t[n+11]]+o[t[n+12]]+o[t[n+13]]+o[t[n+14]]+o[t[n+15]]).toLowerCase()}var b,N=new Uint8Array(16);function O(){if(!b&&(b=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!b))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return b(N)}var G=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const I={randomUUID:G};function z(t,n,g){if(I.randomUUID&&!n&&!t)return I.randomUUID();t=t||{};var c=t.random||(t.rng||O)();return c[6]=c[6]&15|64,c[8]=c[8]&63|128,B(c)}const W={class:"bg-gray-200 overflow-hidden w-[100vw] h-[100vh]"},F={class:"w-full h-[50px] flex justify-between items-center bg-gray-900"},Q={class:"text-white"},X={class:"me-5 flex justify-center w-[240px] block absolute text-white select-none text-[28px] flex items-center gap-1 top-[10px] left-[10px] font-semibold"},Y=a("span",{class:"text-[13px] rotate-45 duration-100"},[a("i",{class:"fas fa-square"})],-1),Z={class:"flex gap-3 items-center"},ee=a("span",{class:"text-white material-symbols-outlined"}," notifications ",-1),te=["src"],ne={class:"h-full w-[200px] cursor-pointer me-4"},oe=a("div",{class:"h-full ps-3 flex items-center w-full border-s-[1px]"},[a("img",{src:"https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG",class:"w-[50px] rounded-[50%]",alt:""}),a("div",{class:"flex flex-col"},[a("span",{class:"text-white font-bold ps-3"},"Ergashev Jamshid"),a("span",{class:"text-white text-[12px] text-center"},"Admin")])],-1),ae={class:"p-3 pb-[100px]"},ie={__name:"dashtboard",setup(t){let n=[{label:"O'zb",key:"uz"},{label:"En",key:"en"}];const{t:g}=T.global,c=J();let h=m(0),_=m(0),v=m([]),L=setInterval(()=>{_.value++;let l=new Date;v.value.push({label:`${l.toLocaleTimeString()} : ${z()}`,key:`${z()}`}),h.value++,h.value==15&&clearInterval(L)},1e3);function y(l){String(l)=="en"&&(localStorage.setItem("lang","en"),window.location.reload()),String(l)=="uz"&&(localStorage.setItem("lang","uz"),window.location.reload())}function k(l){return()=>e("i",{class:l})}function s(l){return()=>e("span",{class:"material-symbols-outlined"},{default:()=>l})}let w=m(!0);const U=[{label:g("Curriculum"),key:"pinball-1973",icon:s("group"),disabled:!1,children:[{label:()=>e(r,{to:"/admin/Add_worker"},{default:()=>g("addWorker")}),key:"addWorker",icon:s("group_add")},{label:()=>e(r,{to:"/admin/issues"},{default:()=>"Davomat olish"}),key:"issues ",icon:k("fas fa-receipt")},{label:()=>e(r,{to:"/admin/issuesTable"},{default:()=>"Davomat jadvali"}),key:"Davomat",icon:k("far fa-calendar-xmark")},{label:()=>e(r,{to:"/admin/login"},{default:()=>"Jurnal"}),key:"Jurnal",icon:s("book_5")},{label:()=>e(r,{to:"/admin/login"},{default:()=>"Topshiriqlar"}),key:"Topshiriqlar",icon:s("contract_edit")}]},{label:"Tizim",key:"Tizim",icon:s("engineering"),children:[{label:()=>e(r,{to:"/admin/login"},{default:()=>"Kirish tarixi"}),key:"Kirish tarixi",icon:s("manage_history")},{label:()=>e(r,{to:"/admin/login"},{default:()=>"Profil"}),key:"Profil",icon:s("account_circle")}]},{label:"To'lov",key:"tulov",icon:s("payments"),children:[{label:()=>e(r,{to:"/admin/login"},{default:()=>"Kontrakt"}),key:"kontrakt",icon:s("credit_card")},{label:()=>e(r,{to:"/admin/login"},{default:()=>"Kutubxona"}),key:"payment_for_book",icon:s("dictionary")}]},{label:"Ishchi ma'lumotlari",key:"student-information",icon:s("dictionary"),children:[{label:()=>e(r,{to:"/admin/login"},{default:()=>"Kutubxona"}),key:""}]}],D=A(),R=m([{key:"header",type:"render",render:()=>e("div",{class:"flex p-3 pb-0 ps-2 w-[215px]"},[e("div",{class:"flex items-center select-none"},[e("img",{round:!0,style:"margin-right: 8px;",src:"https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG",class:"w-[60px] rounded-md m-3",title:"Ergashev Jamshid"}),e("div",[e("div",{class:"text-[13px] font-bold"},e("div",{innerHTML:"Ergashev Jamshid"})),e("div",{class:"text-[13px] text-center"},e("div",{innerHTML:"Admin "}))])])])},{key:"header-divider",type:"divider"},{label:"lpsum1",key:"stmt1"},{key:"profil",type:"render",label:"salom",render:()=>e("div",{class:"ps-4 duration-700 flex items-center hover:bg-blue-200 cursor-pointer flex border-t-[1px] border-solid"},[e("span",{innerHTML:'<span class="text-[20px] text-blue-950"><span class="material-symbols-outlined">admin_panel_settings</span></span>'},{class:""}),e("div",{class:"text-black ps-3"},{default:()=>"Profil"})]),props:{onClick:()=>{console.log("salom")}}},{key:"Own_info",type:"render",label:"salom",render:()=>e("div",{class:"ps-4 duration-700 flex items-center hover:bg-blue-200 cursor-pointer flex border-t-[1px] border-solid"},[e("span",{innerHTML:'<span class="text-[20px] text-blue-950"><i class="fas fa-user-check"></i></span>'},{class:""}),e("div",{class:"text-black ps-3"},{default:()=>"Shaxsiy ma'lumotlar"})]),props:{onClick:()=>{console.log("salom")}}},{key:"update_photo",type:"render",label:"salom",render:()=>e("div",{class:"ps-4 duration-700 flex items-center hover:bg-blue-200 cursor-pointer flex border-t-[1px] border-solid"},[e("span",{innerHTML:'<span class="text-[20px] text-blue-950"><i class="fas fa-camera-rotate"></i></span>'},{class:""}),e("div",{class:"text-black ps-3"},{default:()=>"Profil rasmini yangilash"})]),props:{onClick:()=>{console.log("salom")}}},{key:"sign_out",type:"render",label:"salom",render:()=>e("div",{class:"ps-4 duration-700 flex items-center hover:bg-red-200 cursor-pointer flex border-t-[1px] border-solid"},[e("span",{innerHTML:'<span class="text-[20px] text-red-800"><i class="fas fa-arrow-right-from-bracket"></i></span>'},{class:""}),e("div",{class:"text-red-800 ps-3"},{default:()=>"Tizimdan chiqish"})]),props:{onClick:()=>{c.push("/admin/admin/login")}}}]);function V(l){D.info(String(l)),console.log(l)}return(l,le)=>{const j=u("n-badge"),x=u("n-dropdown"),C=u("n-button"),M=u("n-menu"),E=u("n-layout-sider"),H=u("RouterView"),S=u("n-layout");return $(),K("div",W,[a("div",F,[a("div",Q,[a("span",X,[Y,P(" "+q(l.$t("Airleet")),1)])]),a("div",Z,[i(x,{trigger:"hover",options:p(v),onSelect:y},{default:d(()=>[i(j,{class:"me-3",value:p(_),max:100},{default:d(()=>[ee]),_:1},8,["value"])]),_:1},8,["options"]),i(x,{trigger:"hover",options:p(n),onSelect:y},{default:d(()=>[i(C,null,{default:d(()=>[a("img",{src:p(T).global.locale=="uz"?"../../../public/1670868198_grizly-club-p-flag-uzbekistana-png-9.png":"../../../public/EM7LidKw8aA.jpg",class:"w-[25px]",lt:""},null,8,te)]),_:1})]),_:1},8,["options"]),a("div",ne,[i(x,{trigger:"hover",options:R.value,onSelect:V},{default:d(()=>[oe]),_:1},8,["options"])])])]),i(S,{class:"h-full","has-sider":""},{default:d(()=>[i(E,{bordered:"","collapse-mode":"width","collapsed-width":64,width:240,"show-trigger":"",inverted:p(w)},{default:d(()=>[i(M,{class:"",inverted:p(w),"collapsed-width":64,"collapsed-icon-size":22,options:U},null,8,["inverted"])]),_:1},8,["inverted"]),i(S,null,{default:d(()=>[a("div",ae,[i(H)])]),_:1})]),_:1})])}}};export{ie as default};

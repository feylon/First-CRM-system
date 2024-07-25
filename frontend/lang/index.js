import { createI18n, useI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "uz",
  //   allowComposition: true,
  messages: {
    en: {
      // login page
      Airleet: "Airleet",
      Login: "Admin panel",
      Login_dectiption:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum a, facilis quo repudiandae officiis asperiores autem maiores .",
      EnterYourLogin: "Enter your email",
      loginbutton: "Enter",
      enteryourpassword: "Enter your password",
      enteryourlogin: "Enter your login",
      errorLoginPassword: "Login or password incorrect",

      // main page
      Curriculum: "Worker",
      addWorker: "Add worker",
      addNewRole: "Add new Role",
      NameOfRole: "Name of Role",
      CreatedAtRole: "Created at",
      workersAndRoles: "Workers and roles",
      roles : "Roles",
      addRole : "Add role",
      successAddRole : "Added role success",
      errorAddRole : " is already added",
      editrole : "Edit role",
      editRoleSuccess : "Role edided successfully",

      // worker page
      Workers : "Workers"
    },
    uz: {
      Airleet: "Airleet",
      Login: "Admin panel",
      Login_dectiption:
        "tizimga kirish uchun qandaydir ishlarni boshlash kerak",
      EnterYourLogin: "Emailni kiriting",
      loginbutton: "Kirish",
      enteryourpassword: "Enter your password",
      enteryourpassword: "Parolni kiriting",
      errorLoginPassword: "Login yoki parol xato",
      errorCatchLogin: "Kutilmagan xatolik",

      //main page
      Curriculum: "Ishchilar",
      addWorker: "Ishchi qo'shish",
      addNewRole: "Yangi rol qo'shish",
      NameOfRole: "Rolning nomi",
      CreatedAtRole: "Yaratilgan vaqt",
      workersAndRoles: "Ishchilar va rollar",
      roles : "Rollar",
      addRole : "Rol qo'shish",
      successAddRole : "Yangi rol muvaqiyatli qo'shildi",
      errorAddRole : " bunday rol mavjud",
      editrole : "Rolni tahrirlash",
      editRoleSuccess : "Rol muvaqiyatli tahrirlandi",
    
      // Worker page  
      Workers : "Ishchilar"
    },
  },
});
export default i18n;

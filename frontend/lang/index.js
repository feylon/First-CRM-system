import { createI18n, useI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'uz',
//   allowComposition: true, 
  messages: {
    en: {
// login page
    Airleet: 'Airleet',
    Login:"Admin panel",
    Login_dectiption  : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum a, facilis quo repudiandae officiis asperiores autem maiores .",  
    EnterYourLogin:"Enter your email",
    loginbutton : "Enter",
    enteryourpassword : "Enter your password",
    enteryourlogin : "Enter your login",
    errorLoginPassword : "Login or password incorrect",
    


    },
    uz: {
        Airleet: 'Airleet',
        Login:"Admin panel",
        Login_dectiption  : "tizimga kirish uchun qandaydir ishlarni boshlash kerak",  
        EnterYourLogin:"Emailni kiriting",
        loginbutton : "Kirish",
        enteryourpassword : "Enter your password",
        enteryourpassword : "Parolni kiriting",
        errorLoginPassword : "Login yoki parol xato",
        errorCatchLogin : "Kutilmagan xatolik"
    }
  }
});
 export default i18n;
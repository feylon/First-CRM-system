import login from "./login/index.js";
import get_login_history from "./get_login_history/index.js"



// profil
import UpdatePhoto from "./Profil/UpdatePhoto.js"




import get_issues from "./get_issues/index.js"
export default 
[
[login, "login"],
[get_login_history,"get_login_history"],

[get_issues, "get_issues"],

// profil
[UpdatePhoto, "UpdatePhoto"]
];
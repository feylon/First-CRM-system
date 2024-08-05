
import login from "./login.js";
import add_caterogies from "./cors caterogies/add_caterogies.js";
import get_caterogies from "./cors caterogies/get_categogies.js";
import edit_caterogies from "./cors caterogies/edit_categogies.js";
import delete_caterogies from "./cors caterogies/delete_categories.js";

import add_product_types from "./cors product_types/add_product_types.js";
import get_product_types from "./cors product_types/get_product_types.js";
import edit_product_types from "./cors product_types/edit_product_types.js";
import delete_product_types from "./cors product_types/delete_product_types.js";

// product
import add_product from "./cors product/add product_middware.js";
import get_product from "./cors product/get_product.js";
import updatephotoproduct from "./cors product/upload.js"


import add_worker from "./cors worker/add worker.js";
import add_role from "./cors worker/add_role.js";
import get_role from "./cors worker/get_roles.js"
import get_worker from "./cors worker/get_worker.js";
import edit_roles from "./cors worker/edit_roles.js";
import edit_worker from "./cors worker/edit_worker.js";


// Tasks Selection

import createTask from "./tasks/create.js";
import get_task from "./tasks/get_task.js"
import taskupdatefile from "./tasks/UploadFile.js"


// issues
import add_issues from "./Issues/add.js";
import get_issues from "./Issues/get_Issues.js"


// date rate
import add_date_rate from "./date_rate/add.js"

// Another router
import regions from "./another_router/get_regios.js"
import get_worker_search from "./another_router/get_worker.js"



// appeals
import get_appeal from "./apeal/get.js";
import edit_appeal from "./apeal/edit.js";


// profil admin

import edit_section_profil from "./profil/edit.js";
import get_section_profil from "./profil/get.js";
import UpdateProfilAdmin from "./profil/updatePhoto.js";
import signOutAdmin from "./profil/signOut.js";
import get_login_history from "./login_history/get_login.js";
import changepassword from "./profil/changepassword.js"
export default 

[
[login,"login"],
[add_caterogies,"add_caterogies"],
[get_caterogies, "get_caterogies"],
[edit_caterogies,"edit_caterogies"],
[delete_caterogies,"delete_caterogies"],

[add_product_types, "add_product_types"],
[get_product_types,"get_product_types"],
[edit_product_types,"edit_product_types"],
[delete_product_types, "delete_product_types"],

// product
[add_product,"add_product"],
[get_product,"get_product"],
[updatephotoproduct, "updatephotoproduct"],


[add_worker, "add_worker"],
[add_role, "add_role"],
[get_worker, "get_worker"],
[get_role,"get_role"],
[edit_roles, "edit_roles"],
[edit_worker, "edit_worker"],


// Task
[createTask,"createTask"],
[get_task, "get_task"],
[taskupdatefile, "task_updatefile"],

// Issues

[add_issues, "add_issues"],
[get_issues,"get_issues"],

// date rate

[add_date_rate, "add_date_rate"],

// 
[regions, "regions"],

// profoil
[get_worker_search,"get_worker_search"],
[edit_section_profil, "edit_section_profil"],
[get_section_profil, "get_section_profil"],
[UpdateProfilAdmin, "UpdateProfilAdmin"],
[signOutAdmin, "signOutAdmin"],
[get_login_history, "get_login_history"],
[changepassword, "changepassword"],


// apeals
[get_appeal, "get_appeal"],
[edit_appeal, "edit_appeal"]
];
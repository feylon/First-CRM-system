import login from "./login.js";
import add_caterogies from "./cors caterogies/add_caterogies.js";
import get_caterogies from "./cors caterogies/get_categogies.js";
import edit_caterogies from "./cors caterogies/edit_categogies.js";
import delete_caterogies from "./cors caterogies/delete_categories.js";

import add_product_types from "./cors product_types/add_product_types.js"
import get_product_types from "./cors product_types/get_product_types.js"
export default 
[
[login,"login"],
[add_caterogies,"add_caterogies"],
[get_caterogies, "get_caterogies"],
[edit_caterogies,"edit_caterogies"],
[delete_caterogies,"delete_caterogies"],

[add_product_types, "add_product_types"],
[get_product_types,"get_product_types"]
];
import Joi from "joi";
import req_checker from "./add_product.js"
import { Router } from "express";
import file_Upload from "../../../Functions/upload.js"
import { token_check } from "../../../Functions/jwt.js";

const router = Router();
router.post("/",[token_check, req_checker,], async function (req, res){
    
const {
    product_type_id,
    category_id,
    state,
    name,
    price,
    discount_price,
    discount,
    quantity,
    filename
} = req.body;

try {
    const data = await global.pool.query(
`
insert into product (
product_type_id,
category_id,
state,
name,
price,
discount_price,
discount,
quantity,
urlpic) values
($1, $2, $3, $4, $5, $6, $7, $8, $9)
`,
[
    product_type_id,
    category_id,
    state,
    name,
    price,
    discount_price,
    discount,
    quantity,
    filename
]        
    );
return res.status(201).send("Created :)")
} catch (error) {
    if(error.code == "23505") 
        return res.status(400).send(error.detail);
    if(error.code == "23503") 
        return res.status(400).send(error.detail);
    
    console.log(error)
}

});

export default router;
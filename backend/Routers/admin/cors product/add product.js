import Joi from "joi";
import { Router } from "express";
import file_Upload from "../../../Functions/upload.js"

const router = Router();
router.post("/",[file_Upload.single("picture")], async function (req, res){
    // return
    const Schema = Joi.object
(
{
    product_type_id : Joi.number().required().min(0),
    category_id : Joi.number().required(),
    state : Joi.boolean(),
    name : Joi.string().trim().required(),
    price : Joi.number().required(),
    discount_price : Joi.number().required(),
    discount : Joi.number().required(),
    quantity : Joi.number().required()       
}
);
;

console.log(req.body)

const checkValidate = Schema.validate(req.body);
if(checkValidate.error)
    return res.status(400).send(checkValidate.error.message);

const {
    product_type_id,
    category_id,
    state,
    name,
    price,
    discount_price,
    discount,
    quantity,
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
quantity) values
($1, $2, $3, $4, $5, $6, $7, $8)
`,
[
    product_type_id,
    category_id,
    state,
    name,
    price,
    discount_price,
    discount,
    quantity
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
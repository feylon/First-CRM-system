import Joi from "joi";
import { Router } from "express";

const router = Router();
router.post("/", async function (req, res){
    console.log(req.body)
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
intsert into products (product_type_id,
category_id,
state,
name,
price,
discount_price,
discount,
quantity,)
`        
    )
} catch (error) {
    
}

});

export default router;
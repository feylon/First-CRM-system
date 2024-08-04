import Joi from "joi";
// import req_checker from "./add_product.js"
import { Router } from "express";
import file_Upload from "../../../Functions/upload.js"
import { token_check } from "../../../Functions/jwt.js";

const router = Router();
router.post("/",[token_check ], async function (req, res){
    const Schema = Joi.object
    (
    {
        product_type_id : Joi.number().required().min(0),
        category_id : Joi.number().required().min(0),
        state : Joi.boolean(),
        name : Joi.string().min(5).trim().required(),
        price : Joi.number().required().min(0),
        discount_price : Joi.number().required().min(0),
        discount : Joi.number().required().min(0),
        quantity : Joi.number().required().min(0),
        description : Joi.string().min(5).trim().required()
    }
    );
    ;
    
    console.log(req.body)
    console.log(req.body)
    
    const checkValidate = Schema.validate(req.body);
    if(checkValidate.error)
        return res.status(400).send(checkValidate.error.message);
      try {
        const {
            product_type_id,
            category_id,
            state,
            name,
            price,
            discount_price,
            discount,
            quantity,
            description} = req.body
            await global.pool.query(`
                insert into product 
(product_type_id, category_id, state, name, price, discount_price, discount, quantity,description)
values ($1, $2,  $3, $4, $5, $6, $7,  $8, $9 );`, [
    product_type_id,
    category_id,
    state,
    (name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).trim(),
    price,
    discount_price,
    discount,
    quantity,
    description])
return res.status(201).send({created : true})
      } catch (error) {
        if(error.code == '23505') return res.status(400).send({error : error.detail})
        if(error.code == '23503') return res.status(400).send({error : error.detail})

        console.log(error)
      }
});

export default router;
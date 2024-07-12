import Joi from "joi";
import { token_check } from "../../../Functions/jwt.js";

export default function(req, res, next){
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
      next();
}
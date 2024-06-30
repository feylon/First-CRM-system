import Joi from "joi";
import { Router } from "express";

const router = Router();
router.post("/", async function (req, res){
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
    return req.statusCode(400).send(checkValidate.error.message);

res.statusCode(400).send(req.body);
return;


});

export default router;
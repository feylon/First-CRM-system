Error
// import Joi from "joi";
// import { token_check } from "../../../Functions/jwt.js";

// export default function(req, res, next){
//     const Schema = Joi.object
//     (
//     {
//         product_type_id : Joi.number().required().min(0),
//         category_id : Joi.number().required(),
//         state : Joi.boolean(),
//         name : Joi.string().min(5).trim().required(),
//         price : Joi.number().required(),
//         discount_price : Joi.number().required(),
//         discount : Joi.number().required(),
//         quantity : Joi.number().required(),
//         description : Joi.string().min(5).trim().required(),

//     }
//     );
//     ;
    
//     console.log(req.body)
    
//     const checkValidate = Schema.validate(req.body);
//     if(checkValidate.error)
//         return res.status(400).send(checkValidate.error.message);
//       try {
//         const {product_type_id,
//             category_id,
//             state,
//             name,
//             price,
//             discount_price,
//             discount,
//             quantity,
//             description} = req.body
//             await global.pool.query

//       } catch (error) {
//         console.log(error)
//       }
// }
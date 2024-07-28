import Joi from "joi";
import { Router } from "express";
import { token_check, get_id } from "../../../Functions/jwt.js";


const router = Router();


router.post("/", [token_check], async function(req, res, next){
    let Schema = Joi.object(
        {
            firstname : Joi.string().required(),
            lastname : Joi.string().required(),
            phone : Joi.string().required(),
            brithday : Joi.date().required(),

        }
    );
    let checkScheme = Schema.validate(req.body);
    if(checkScheme.error) return res.status(400).send({error : checkScheme.error.message});
    let admin_id = get_id(req,res,next);
    try {
        let data = await global.pool.query(
            `UPDATE admin SET
              firstname = $1,
              lastname = $2,
              phone = $3,
              brithday = $4
              where id = $5
            `, 
            [
            req.body.firstname,
            req.body.lastname,
            req.body.phone,
            req.body.brithday,
            admin_id
            ]
        );
        res.status(200).send("Edited");
    } catch (error) {
        console.log(error)
    }
})

export default router;
import Joi from "joi";
import { token_check, get_id } from "../../../Functions/jwt.js";
import { Router } from "express";
import md5 from "md5";

const router = Router ();

router.post("/", token_check, async (req, res, next)=>{
    const Schema = Joi.object({
        signOut : Joi.boolean().required()
    });
    let checkSchema = Schema.validate(req.body);
    if(checkSchema.error)return res.status(400).send(checkSchema.error.message)
        const admin_id = get_id(req, res, next);
    try {
        
        const data = await global.pool.query (
            `
            UPDATE jwt_Admin set 
            jwt = $2 where admin_id = $1
            `, [admin_id, md5(Date.now())]
        );  
        
        res.status(200).send({SignOut : true});
        
    } catch (error) {
        res.status(500).send({SignOut : false});
        console.log(error )
        
    }
})

export default router;
import Joi from "joi";
import { Router } from "express";
import { token_check, get_id } from "../../../Functions/jwt.js";

const router = Router();

router.get('/', [token_check], async (req, res, next)=>{

    let admin_id = get_id(req,res,next);
    try {
     
        let data = await global.pool.query(`
            Select
            email,
            firstname, 
            lastname,
            phone,
            brithday,
            profil_url
             from 
             admin where id = $1
            `, [admin_id])
            res.status(200).send(data.rows[0])

    } catch (error) {
        console.log(error)
    }


});


export default router;
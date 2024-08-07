import Joi from "joi";
import { Router } from "express";
import { check, get_id } from "../../../Functions/jwt_worker.js";

const router = Router();

router.get('/', [check], async (req, res, next)=>{

    let worker_id = get_id(req,res,next);
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
             worker where id = $1
            `, [worker_id])
            res.status(200).send(data.rows[0])

    } catch (error) {
        console.log(error)
    }


});


export default router;
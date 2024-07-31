import Joi from "joi";
import  {Router} from "express";
import fs from "fs";
import { token_check, get_id } from "../../../Functions/jwt.js";
import  dotenv  from "dotenv";
dotenv.config();
const router = Router();


router.get("/worker/byID/:id", token_check, async function (req, res, next){
    console.log(req.params.id);
    

    try{

    let data  = await global.pool.query(`
                SELECT * FROM public.task
                where task.id = $1
                ORDER BY id ASC ;
        `,[req.params.id]);
        
        return res.status(200).send(data.rows)
    }
    catch(err){
        console.log(err)
    }
});


export default router;


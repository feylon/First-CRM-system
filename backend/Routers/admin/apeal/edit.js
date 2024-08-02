import { token_check } from "../../../Functions/jwt.js";
import {Router} from 'express';
import Joi from "joi";

const router = Router();

router.post("/:id", token_check, async function(req, res){
    const Schema = Joi.object(
        {
checked : Joi.boolean().required()
        }
    );
    const checkSchema = Schema.validate(req.body);
    if(checkSchema.error) return res.status(400).send(checkSchema.error.message)
        try {
            await global.pool.query(`Update appeal set checked = $1 where id = $2`, [req.body.checked, req.params.id]);
    return  res.send("Update :)")
        } catch (error) {
            console.log(error)
        }


    });

    export default router;
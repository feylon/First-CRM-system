import { get_id, token_check } from "../../../Functions/jwt.js";
import {Router} from 'express';
import Joi from "joi";

const router = Router();

router.get("/all",  [token_check], async function (req, res, next){
    const Schema = Joi.object(
        {
            page : Joi.number().required().min(1),
            size : Joi.number().required().min(1)
        }
    );
    const checkSchema = Schema.validate(req.query);
    if(checkSchema.error) return res.status(400).send(checkSchema.error.message)
try {
const id = get_id(req, res, next);
    const {page, size} = req.query;
        const data = await global.pool.query(
    `
    Select * from appeal
    ORDER BY appeal.created_at DESC 


LIMIT $1 OFFSET ($2 - 1)  *  $3;	
	
    `,
    [size, page, size]
        )

return res.status(200).send(data.rows);
} catch (error) {
    res.status(500).send("Serverda xatolik : (");
    console.log("! Error : get_caterogies: ", error)
}


});


router.get("/all/checked",  [token_check], async function (req, res, next){
    const Schema = Joi.object(
        {
            page : Joi.number().required().min(1),
            size : Joi.number().required().min(1),
            checked : Joi.boolean().required()
        }
    );
    const checkSchema = Schema.validate(req.query);
    if(checkSchema.error) return res.status(400).send(checkSchema.error.message)
try {
const id = get_id(req, res, next);
    const {page, size, checked} = req.query;
        const data = await global.pool.query(
    `
    Select * from appeal
    where checked = $4
    ORDER BY appeal.created_at DESC 

LIMIT $1 OFFSET ($2 - 1)  *  $3;	
	
    `,
    [size, page, size, checked]
        )

return res.status(200).send(data.rows);
} catch (error) {
    res.status(500).send("Serverda xatolik : (");
    console.log("! Error : get_caterogies: ", error)
}


});













export default router;
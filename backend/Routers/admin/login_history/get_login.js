import { get_id, token_check } from "../../../Functions/jwt.js";
import {Router} from 'express';
import Joi from "joi";

const router = Router();

router.get("/",  [token_check], async function (req, res, next){
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
    Select p.email, login_history_admin.created_at,
login_history_admin.IP,  
login_history_admin.status
from login_history_admin
inner join admin p on login_history_admin.id_admin = p.id

WHERE 
    id_admin = $4
    ORDER BY login_history_admin.created_at DESC 


LIMIT $1 OFFSET ($2 - 1)  *  $3;	
	
    `,
    [size, page, size, id]
        )

return res.status(200).send(data.rows);
} catch (error) {
    res.status(500).send("Serverda xatolik : (");
    console.log("! Error : get_caterogies: ", error)
}


});

export default router;
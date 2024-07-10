import { Router } from "express";
import Joi from "joi";
import { check } from "../../../Functions/jwt_worker.js";

const router = Router();

router.get("/",[check], async function (req, res){

    const Schema = Joi.object(
        {
            page : Joi.number().required().min(1),
            size : Joi.number().required().min(1)
        }
    );
    const checkSchema = Schema.validate(req.query);
    if(checkSchema.error) return res.status(400).send(checkSchema.error.message)
try {

    const {page, size} = req.query;
        const data = await global.pool.query(
    `
    Select p.email, login_history_worker.created_at,
login_history_worker.IP,  
login_history_worker.status
from login_history_worker
inner join worker p on login_history_worker.id_worker = p.id

WHERE 
    id_worker = $4
    ORDER BY login_history_worker.created_at DESC 


LIMIT $1 OFFSET ($2 - 1)  *  $3;	
	
    `,
    [size, page, size, req.body.jwt_id]
        )

return res.status(200).send(data.rows)
} catch (error) {
    res.status(500).send("Serverda xatolik : (");
    console.log("! Error : get_caterogies: ", error)
}

});

export default router;   
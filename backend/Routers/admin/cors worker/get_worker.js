import { Router } from "express";
import Joi from "joi";
import { token_check } from "../../../Functions/jwt.js";

const router = Router();

router.get("/",[token_check], async function (req, res){

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
        WITH ActiveUsers AS (
    SELECT 
        email,
        firstname,
        lastname,
        brithday,
        phone,
        viloyat,
        tuman,
        p.name AS role_name
    FROM worker
    INNER JOIN role_worker p ON worker.role_id = p.id
    WHERE worker.state = true
)

SELECT COUNT(*) OVER () AS total, *
FROM ActiveUsers
LIMIT $1 OFFSET ($2 - 1)  *  $3;	
    `,
    [size, page, size]
        )

return res.status(200).send(data.rows)
} catch (error) {
    res.status(500).send("Serverda xatolik : (");
    console.log("! Error : get_caterogies: ", error)
}

});

export default router;
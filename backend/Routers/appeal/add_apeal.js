import Joi from "joi";
import { Router } from "express";
const router = Router();

router.post("/", async function(req, res){
    const Schema = Joi.object(
        {
            firstname : Joi.string().min(3).max(15).required(),
            lastname : Joi.string().min(3).max(15).required(),
            phone : Joi.string().min(7).max(14),
            text : Joi.string().min(3).max(100).required()
        }
    );
    const checkValidate = Schema.validate(req.body);
    if(checkValidate.error) return res.status(202).send(checkValidate.error.message);
    const {firstname, lastname, phone, text} = req.body;
    try {
        await global.pool.query(
            `insert into appeal (firstname, lastname, phone, text) values
            ($1, $2, $3, $4)
            `, [firstname, lastname, phone, text] 
        );
        res.status(201).send("Created : )")
    }
    catch(error) {
        console.log(error)
    }
});

export default router;

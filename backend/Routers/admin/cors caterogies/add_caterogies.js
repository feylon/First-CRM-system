import Joi from "joi";
import { Router } from "express";
import { token_check } from "../../../Functions/jwt.js";

const router = Router();

router.post("/", [token_check], async function(req, res){
    const Scheme = Joi.object({ name : Joi.string().min(3).max(50).trim().required() });
    const checkSchema = Scheme.validate(req.body);
    if(checkSchema.error) return res.status(400).send(checkSchema.error.message);
    try {
        let data = await global.pool.query(`
        insert into categories(name) values
        ('${req.body.name}');`);
        let backend  = await global.pool.query(
            `
            Select * from categories where name = '${req.body.name}';
            `
        )
        res.status(201).send(backend.rows[0])
        
    } catch (error) {
        if (error.code == '23505') 
            return res.status(400).send(error.detail)
        console.log(error);

    }
});

export default router
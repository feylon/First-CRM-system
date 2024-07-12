import Joi from "joi";
import { Router } from "express";
import { token_check } from "../../../Functions/jwt.js";

(async()=>{
    try {
        await global.pool.query(`
            create table role_worker (
        id bigserial primary key unique,
        name varchar(50) unique not null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

            `)
    } catch (error) {
        if(error.code == "42P07") return;
    
        console.log(error)
    }
})();

export default Router().post("/", [token_check], async(req, res)=>{
const Schema = Joi.object({
    name :Joi.string().trim().required().min(3)
});
    const checkValidate = Schema.validate(req.body);
    if(checkValidate.error) return res.status(400).send(checkValidate.error.message);
    try {
    await global.pool.query("insert into role_worker (name) values ($1);",[req.body.name]);
        res.status(201).send("Created :)")
    } catch (error) {
        if(error.code == "23505")
            return res.status(400).send(error.detail)
       
        console.log(error)
    }
});
import Joi from "joi";
import { Router } from "express";
import {joiPasswordExtendCore } from "joi-password"
import { hash } from "../../Functions/bcryptr.js";

const joiPassword = Joi.extend(joiPasswordExtendCore);
const router = Router();

router.post("/", async function(req, res){

    const Schema = Joi.object({
        firstname : Joi.string().min(3).max(15).required().trim(),
        lastname : Joi.string().min(3).max(15).required().trim(),
        // login : Joi.string().min(5).max(10).required().trim(),
        email : Joi.string().min(3).max(25).required().trim().email(),
        phone : Joi.string().min(3).max(15).required().trim(),
        viloyat : Joi.string().min(3).max(15).required().trim(),
        tuman : Joi.string().min(3).max(15).required().trim(),
        password : joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .doesNotInclude(['password'])
        .required(),
        

    });
    let check = Schema.validate(req.body);

    if( check.error) return res.status(401).send(check.error.message)
    req.body.password = await hash(req.body.password);
    try {
        const {email, password, firstname, lastname, phone, viloyat, tuman} = req.body;

        
        await global.pool.query(`

            insert into users (email, password, firstname, lastname, phone, viloyat, tuman) values
        ('${email}', '${password}', '${firstname}', '${lastname}', '${phone}', '${viloyat}', '${tuman}');
            `);
            return res.status(201).send("Created :)");
    } catch (error) {
        if(error.code == 23505) return res.status(403).send("Ro'yxatdan o'tgan foydalanuvchi")
        console.log("User ma'lumotlarni saqlashda xatolik ", error)
    }
    
});


export default router;
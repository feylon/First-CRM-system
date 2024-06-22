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
        login : Joi.string().min(5).max(10).required().trim(),
        email : Joi.string().min(3).max(25).required().trim().email(),
        phone : Joi.string().min(3).max(15).required().trim(),
        address : Joi.string().min(3).max(15).required().trim(),
        address1 : Joi.string().min(3).max(15).required().trim(),
        password : joiPassword
        .string()
        .minOfSpecialCharacters(2)
        .minOfLowercase(2)
        .minOfUppercase(2)
        .minOfNumeric(2)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .doesNotInclude(['password'])
        .required(),
        

    });
    let check = Schema.validate(req.body);

    if( check.error) return res.status(401).send(check.error.message)
    req.body.password = await hash(req.body.password)
    res.status(200).send (req.body.password)
    console.log(req.body)
});
// $2b$10$AYG38EVVv5Eqf6Iz1112q.peSUs7ZbBts3qn65MSEvwDtT8TEDiGK

export default router;
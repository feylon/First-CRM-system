import { check } from "../../Functions/bcryptr.js";
import { Router, query } from "express";
import Joi from "joi";
import { sign } from "../../Functions/jwt.js";

const router = Router();

router.post("/", async function (req, res){
const Scheme = Joi.object({
    email: Joi.string().min(0).max(100).required().trim(),
    password: Joi.string().min(0).max(100).required().trim()
});
const checkSchema = Scheme.validate(req.body);
if(checkSchema.error) return res.status(401).send(checkSchema.error.message);

const {email, password}  = req.body;

const data = await global.client.query(
    `
    Select email, login, password, active
    from
    admin
    where (state = true and email = 'jamshid14092002@gmail.com');
    `
);
res.status(200).send(data)

});

export default router;
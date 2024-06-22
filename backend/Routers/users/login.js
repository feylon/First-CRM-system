import { check } from "../../Functions/bcryptr.js";
import { Router, query } from "express";
import Joi from "joi";
// import client from "../../Functions/database.js";

const router = Router();

router.post("/", async function(req, res){
const Schema = Joi.object(
    {
        email: Joi.string().required().max(50).min(1).trim(),
        password:Joi.string().required().max(250).min(1).trim()
    }
);
let checkSchema = Schema.validate(req.body);
if (checkSchema.error) return res.status(401).send(checkSchema.error.message);
try {
    const {email, password} = req.body;
    
    let data = await global.client.query(
        `Select id, password from users where email = '${email}'`
    );

    console.log(data.rows);
    res.status(200).send(data.rows)
    
} catch (error) {
console.log("User loginda xatolik mavjud", error);    
}

});

export default router;
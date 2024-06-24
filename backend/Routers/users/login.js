import { check } from "../../Functions/bcryptr.js";
import { Router, query } from "express";
import Joi from "joi";
import { sign } from "../../Functions/jwt.js";

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
    
    let data = await global.pool.query(
        `Select id, password from users where email = '${email}'`
    );

    console.log(data.rows)

    if(data.rows.length == 0) return res.status(401).send("Parol yoki login xato");
    const check_login = await check(password, data.rows[0].password);
    if(check_login)
    return res.status(200).send({token:sign(data.rows[0].id)})
    else return res.send("Parol yoki login xato").status(401);
} catch (error) {
console.log("User loginda xatolik mavjud", error);    
}

});

export default router;
// token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3MTkwODM1MTcsImV4cCI6MTcxOTA4NzExN30.PCULrvzsZtc8kit-eT5FWW-r-SPHC6YPsRHHTQpLQec
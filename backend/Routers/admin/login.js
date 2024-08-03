import { check } from "../../Functions/bcryptr.js";
import { Router, query } from "express";
import Joi from "joi";
import { sign } from "../../Functions/jwt.js";
import login_history_admin from "../../Functions/login_history_admin.js";



const router = Router();

router.post("/", async function (req, res){
try{
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    {const Scheme = Joi.object({
    email: Joi.string().min(0).max(100).required().trim(),
    password: Joi.string().min(0).max(100).required().trim()
});
const checkSchema = Scheme.validate(req.body);
if(checkSchema.error) return res.status(401).send(checkSchema.error.message);

const {email, password}  = req.body;
const data = await global.pool.query(
    `
    Select id, email, login, password, active
    from
    admin
    where (state = true and email = '${email}');
    `
);
if(data.rows.length == 0) {
    return res.status(401).send("Parol yoki login xato");}
const check_login = await check(password, data.rows[0].password);
if(check_login)
{
    if(!data.rows[0].active) return res.status(401).send("Admin tomonidan bloklangan")
    let token = sign(data.rows[0].id);

await login_history_admin(data.rows[0].id, true, clientIp);
req.session.adminId = data.rows[0].id;
req.session.clientIp = clientIp;
req.session.IsAdmin = true;
return res.status(200).send({token:token, IsAdmin : true});
}
else{
    await login_history_admin(data.rows[0].id, false, clientIp);
    return res.status(401).send("Parol yoki login xato");}
}

} 


catch (error) {
    console.log("User loginda xatolik mavjud", error);    
    }


});

export default router;
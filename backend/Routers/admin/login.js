import { check } from "../../Functions/bcryptr.js";
import { Router, query } from "express";
import Joi from "joi";
import { sign } from "../../Functions/jwt.js";
import login_history_admin from "../../Functions/login_history_admin.js";

(async()=>{
    try {
        await global.pool.query(
            `
            create table jwt_admin
    (id bigserial primary key unique,
    admin_id integer unique not null,
    foreign key (admin_id) references admin (id),
    jwt varchar(1000),
    ip varchar(100));
            `
        );
    } catch (error) {
        if(error.code == "42P07") return;
    
        console.log(error);
    }
})()

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
try {
    await global.pool.query(`insert into jwt_admin (admin_id, jwt, ip) values ($1, $2, $3)`, 
    [data.rows[0].id, token, clientIp]);

} catch (error) {
    if(error.code == "23505")
        await global.pool.query(`UPDATE jwt_admin
SET jwt = $1,
	ip = $2
WHERE admin_id = $3;
`,[token,clientIp,data.rows[0].id]);
else
    console.log(error)
}
await login_history_admin(data.rows[0].id, true, clientIp);
   
return res.status(200).send({token:token});
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
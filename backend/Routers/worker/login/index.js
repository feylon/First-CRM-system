import Joi from "joi";
import { Router } from "express";
import {check} from "../../../Functions/bcryptr.js"
import { sign } from "../../../Functions/jwt_worker.js";
import login_history_worker from "../../../Functions/login_history_worker.js";

const router = Router();
router.post("/", async function (req, res){
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const Schema = Joi.object({
    email : Joi.string().min(3).max(50).required().email(),
    password : Joi.string().min(3).max(50).required()
});

    const checkSchema = Schema.validate(req.body)
    if(checkSchema.error)
        return res.status(400).send(checkSchema.error.message);
    try {
        let checkData = await global.pool.query("Select id from worker where email = $1",[req.body.email]);
    if(checkData.rows.length == 0) return res.status(401).send("Login parol yoki xato");
   const {email, password} = req.body;
        let data = await global.pool.query("Select id, email, password from worker where email = $1", [email]);
        let isLogin = await check(password, data.rows[0].password);
        if(!isLogin)  {res.status(401).send("Login parol yoki xato");

            await login_history_worker(data.rows[0].id, false, clientIp);
            return;
        }
        let token = sign(data.rows[0].id);
        await login_history_worker(data.rows[0].id, true, clientIp);
        res.status(200).send({token});
    } catch (error) {
        console.log("Xatolik bor ", error);
        res.status(500).send("Server xatolikga uchradi")
    }
});


export default router;
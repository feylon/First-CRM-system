import { Router } from "express";
import Joi from "joi";
import { token_check } from "../../../Functions/jwt.js";
 const router = Router();

router.post("/:id",[token_check], async(req, res)=>{
const Schema = Joi.object({
    name : Joi.string().trim().required().min(3),
});

const checkSchema = Schema.validate(req.body);
if(checkSchema.error) return res.status(400).send(checkSchema.error.message);
if(req.params.id <= 0 ) return res.status(400).send(":id 0 dan katta bo'lishi zarur");
let hasData = await global.pool.query
(
"Select id from role_worker where id = $1", [req.params.id]
);
if (hasData.rows == 0) return res.status(404).send("Ma'lumot topilmadi");
req.body.name = req.body.name.toLowerCase();
try {
    await global.pool.query("update role_worker set name = $1 where id = $2;", [req.body.name, req.params.id]);
    res.status(200).send("Edited :)");
} catch (error) {
    if(error.code == "23505") return  res.status(400).send(error.detail);
    
    console.log(error)
}
 })


 export default router;
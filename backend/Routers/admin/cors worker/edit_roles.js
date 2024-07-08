import { Router } from "express";
import Joi from "joi";
 const router = Router();

 router.post("/:id", async(req, res)=>{
const Schema = Joi.object({
    name : Joi.string().trim().required(),
});

const checkSchema = Schema.validate(req.body);
if(checkSchema.error) return res.status(400).send(checkSchema.error.message);

res.status(200).send(req.body)
 })


 export default router;
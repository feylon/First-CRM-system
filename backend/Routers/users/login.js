import { check } from "../../Functions/bcryptr.js";
import { Router } from "express";
import Joi from "joi";

const router = Router();

router.post("/", function(req, res){
const Schema = Joi.object(
    {
        login: Joi.string().required().max(50).min(1),
        password:Joi.string().required().max(250).min(1)
    }
);
let check = Schema.validate(req.body);
if (check.error) return res.status(401).send(check.error.message);

});

export default router;
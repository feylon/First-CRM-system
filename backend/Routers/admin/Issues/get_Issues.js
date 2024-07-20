import Joi from "joi";
import { Router } from "express";
import { token_check } from "../../../Functions/jwt";

const router = Router();

router.post("/", [token_check], function(req, res){
``
});


export default router;
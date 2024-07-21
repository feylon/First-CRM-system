import { Router } from "express";
import Joi from "joi";
import { get_id, check } from "../../../Functions/jwt_worker.js";


router.get("/",[check], function(req, res, next){

})
const router = Router();
export default router;
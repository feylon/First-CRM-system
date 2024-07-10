import Joi from "joi";
import  {Router} from "express";

const router = Router();

router.post("/",function(req, res){
    console.log(req.body);
    return res.send(req.body)

});
export default router ;

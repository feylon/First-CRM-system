import {Router} from "express"
import Joi from "joi";
// import { check } from "../../../Functions/bcryptr";

const router = Router();
router.get("/",  async (req, res)=>{
try {
    let data = await global.pool.query("select * from regions;");
    res.status(200).send(data.rows)
} catch (error) {
    console.log(error)
    return  res.status(500).send({})
}
});




router.get("/districts/:id",  async (req, res)=>{
    try {
        const Schema = Joi.object({
            id:Joi.number().required()
        });
     let   checkSchema = Schema.validate(req.params);
        if(checkSchema.error) return res.status(400).send(checkSchema.error.message)
        // console.log(req.params.id)
        let data = await global.pool.query("select * from districts where region_id = $1;",[req.params.id]);
        res.status(200).send(data.rows)
    } catch (error) {
        console.log(error)
        return  res.status(500).send({})
    }
    });


export default router;
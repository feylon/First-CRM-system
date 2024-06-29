import Joi from "joi";
import { Router } from "express";

const router = Router();

router.post("/:id", async function (req, res){

    const Scheme = Joi.object({
        name : Joi.string().min(3).max(50).trim().required(),
        state : Joi.boolean()
    });
    const checkSchema = Scheme.validate(req.body);
    if(checkSchema.error) return res.status(400).send(checkSchema.error.message);
    if((typeof req.params.id )!= "number" )
        return res.status(400).send(":id Butun son bo'lishi lozim")
    const {name, state} = req.body;
    res.status(200).send(req.params.id);
    return;
    try {
        let check_content = 
        await global.pool.query(
            "Select id from categories",

        )
        
    } catch (error) {
        
    }
});


export default router;
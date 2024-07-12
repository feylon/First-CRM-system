import Joi from "joi";
import { Router } from "express";
import { token_check } from "../../../Functions/jwt.js";

const router = Router();

router.post("/:id", [token_check], async function (req, res){

    const Scheme = Joi.object({
        name : Joi.string().min(3).max(50).trim().required(),
        state : Joi.boolean()
    });
    const checkSchema = Scheme.validate(req.body);

    if(checkSchema.error) return res.status(400).send(checkSchema.error.message);
    // if((typeof (req.params.id) )!= 'number' )
        // return res.status(400).send(":id Butun son bo'lishi lozim")
    const {name, state} = req.body;


    try {
        let check_content = 
        await global.pool.query(
            "Select id from categories where id = $1 ",
            [req.params.id]
        );
        if(!check_content.rows.length)
            return res.status(404).send("Ma'lumot mavjud emas");
        
        let update_content = await global.pool.query
        ("Update categories set name = $1, state = $2 where id = $3",
          [name,state, req.params.id]  

        );
        return res.status(201).send("Edited")
    } catch (error) {
        if(error.code == "23505")
            return res.status(400).send(error.detail)
        console.log(error)
    }
});


export default router;
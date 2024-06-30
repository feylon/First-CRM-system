import { Router } from "express";
import Joi from "joi";

const router = Router();

router.post("/", async function(req, res){
    const Schema = Joi.object({
        id : Joi.number().required().min(0),
        name : Joi.string().required().min(1)
    });
    const checkSchema = Schema.validate(req.body);
    if(checkSchema.error)
        return res.status(400).send(checkSchema.error.message);

    const {id, name} = req.body;
    try {
        

    const data = await global.pool.query(
        "insert into product_types(name, categories_id) values ($1, $2)",
        [name, id]
    );


return res.status(201).send("Created :)");

    } catch (error) {
        if(error.code == "23505")
    return res.status(400).send(`"${name}"  bu ro'yxatda mavjud`);
        if(error.code == "23503")
    return res.status(400).send(`${id} bunday id mavjud emas`);        
        console.log(error); 
    }

});
export default router;


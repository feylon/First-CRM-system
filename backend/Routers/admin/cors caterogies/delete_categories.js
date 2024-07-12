import Joi from "joi";
import { Router } from "express";
import { token_check } from "../../../Functions/jwt.js";

const router = Router();

router.delete("/:id",[token_check], async function(req,res){
    try {
        let check_content = 
        await global.pool.query(
            "Select id from categories where id = $1 ",
            [req.params.id]
        );
        if(!check_content.rows.length)
            return res.status(404).send("Ma'lumot mavjud emas");
        const delete_content = await global.pool.query(
            "delete from categories where id = $1",
            [req.params.id]
        );
return res.status(200).send("Ma'lumot to'liq o'chirildi")

    } catch (error) {
        console.log(error);
        res.status(500).send("Serverda xatolik yuz berdi");    }
});
export default  router;
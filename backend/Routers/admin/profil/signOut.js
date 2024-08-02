import Joi from "joi";
import { token_check, get_id } from "../../../Functions/jwt.js";
import { Router } from "express";


const router = Router ();

router.post("/", token_check, async (req, res, next)=>{
    req.session.destroy((err) => {
        if (err) {
          return res.status(500).send('Error logging out');
        }
    
        res.status(200).send('Logged out successfully');
      });
    
})

export default router;
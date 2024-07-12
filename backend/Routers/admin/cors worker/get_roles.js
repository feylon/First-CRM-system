import { Router } from "express";
import { token_check } from "../../../Functions/jwt.js";

let router = Router();

router.get("/", [token_check], async (req, res)=>{
   let data = await global.pool.query(`
    SELECT * FROM public.role_worker
ORDER BY id ASC; 
    `);
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(clientIp);
return   res.status(200).send(data.rows);
});
export default router;
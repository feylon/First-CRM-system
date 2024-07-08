import { Router } from "express";

let router = Router();

router.get("/", async (req, res)=>{
   let data = await global.pool.query(`
    SELECT * FROM public.role_worker
ORDER BY id ASC; 
    `);
    
return   res.status(200).send(data.rows);
});
export default router;
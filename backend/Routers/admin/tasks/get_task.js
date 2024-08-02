import Joi from "joi";
import  {Router} from "express";
import fs from "fs";
import { token_check, get_id } from "../../../Functions/jwt.js";
import  dotenv  from "dotenv";
dotenv.config();
const router = Router();


router.get("/worker/byID/:id", token_check, async function (req, res, next){
    console.log(req.params.id);
    

    try{

    let data  = await global.pool.query(`
                SELECT * FROM public.task
                where task.id = $1
                ORDER BY id ASC ;
        `,[req.params.id]);
        
        return res.status(200).send(data.rows)
    }
    catch(err){
        console.log(err)
    }
});




router.get("/all", token_check, async function (req, res, next){
    console.log(req.params.id);
    

    try{

    let data  = await global.pool.query(`
                SELECT * FROM public.task
                ORDER BY id ASC ;
        `);
        
        return res.status(200).send(data.rows)
    }
    catch(err){
        console.log(err)
    }
});


router.get("/only_done_true", token_check, async function (req, res, next){
    console.log(req.params.id);
    

    try{

    let data  = await global.pool.query(`
        WITH task_counts AS (
    SELECT COUNT(*) AS not_done_count
    FROM public.task
    WHERE done = true
)
SELECT 
    t.done, 
    t.id, 
    t.description, 
    t.task_file, 
    t.task_file_name, 
    t.done_file,
    t.done_file_name, 
    t.admin_id, 
    t.worker_id, 
    t.diedline, 
    t.active, 
    t.rate, 
    t.maxrate,
    t.attempt,
    tc.not_done_count,
    w.firstname as firstname,
    w.email as worker_email,
	role_worker.name as roleName,
	role_worker.id as roleID

FROM public.task t
INNER JOIN task_counts tc ON true 
INNER JOIN worker w ON w.id = t.worker_id
inner join role_worker on w.role_id = role_worker.id
ORDER BY t.id ASC;

        `);
        
        return res.status(200).send(data.rows)
    }
    catch(err){
        console.log(err)
    }
});





router.get("/only_done_false", token_check, async function (req, res, next){
    console.log(req.params.id);
    

    try{

    let data  = await global.pool.query(`
        WITH task_counts AS (
    SELECT COUNT(*) AS not_done_count
    FROM public.task
    WHERE done != true
)
SELECT 
    t.done, 
    t.id, 
    t.description, 
    t.task_file, 
    t.task_file_name, 
    t.done_file,
    t.done_file_name, 
    t.admin_id, 
    t.worker_id, 
    t.diedline, 
    t.active, 
    t.rate, 
    t.maxrate,
    t.attempt,
    tc.not_done_count,
    w.firstname as firstname,
    w.email as worker_email,
	role_worker.name as roleName,
	role_worker.id as roleID
FROM public.task t
INNER JOIN task_counts tc ON true 
INNER JOIN worker w ON w.id = t.worker_id
inner join role_worker on w.role_id = role_worker.id
ORDER BY t.id ASC;

        `);
        
        return res.status(200).send(data.rows)
    }
    catch(err){
        console.log(err)
    }
});

export default router;


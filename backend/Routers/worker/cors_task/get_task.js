import { Router } from "express";
import Joi from "joi";
import { get_id, check } from "../../../Functions/jwt_worker.js";


const router = Router();
router.get("/",[check], async function(req, res, next){
const worker_id = get_id(req, res, next)
try {
    
const data = await global.pool.query (
    `SELECT 
task.name,
task.description,
task.task_file,
task.task_file_name,
task.diedline,
task.created_at,
task.rate,
task.maxrate,
task.attempt,
p.firstname as admin_firstname,
p.lastname as admin_lastname
FROM public.task
inner join admin p on p.id = task.admin_id
where task.worker_id = $1 and task.active = true
ORDER BY task.created_at 


    `,
    [worker_id]
);


res.status(200).send(data.rows)
} catch (error) {
console.log(error)    
}

})
export default router;
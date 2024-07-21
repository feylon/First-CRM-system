import Joi from "joi";
import {Router} from "express";
import {get_id, check} from "../../../Functions/jwt_worker.js";
const router = Router();

router.get("/all",[check], async function(req, res, next){
   const id = get_id(req, res, next);
   const Schema = Joi.object({
    page: Joi.number().required().min(1),
    size: Joi.number().required().min(1),
    admin_id: Joi.number().required().min(1),
    
  });
  const checkSchema = Schema.validate(req.query);
  if (checkSchema.error) return res.status(400).send(checkSchema.error.message);
 
 
  const { page, size, admin_id } = req.query;
   try {
    let data = await pool.query(
        `
  Select
  issues.reason, issues.detail, issues.time,
  p.firstname, p.lastname
  from issues
  inner join admin p on issues.admin_id = p.id
  WHERE 
  (worker_id = $4 and admin_id = $5 ) and issues.state = $6
  ORDER BY issues.time DESC 
  
  
  LIMIT $1 OFFSET ($2 - 1)  *  $3	;
  `,
        [size, page, size, id, admin_id, true]
      );
      res.status(200).send(data.rows)
   } catch (error) {
    console.log(error)
   }
});

router.get("/only_true",check, async function(req, res, next){
    const id = get_id(req, res, next);
    const Schema = Joi.object({
     page: Joi.number().required().min(1),
     size: Joi.number().required().min(1),
     admin_id: Joi.number().required().min(1),
     
   });
   const checkSchema = Schema.validate(req.query);
   if (checkSchema.error) return res.status(400).send(checkSchema.error.message);
  
  
   const { page, size, admin_id } = req.query;
    try {
     let data = await pool.query(
         `
   Select
   issues.reason, issues.detail, issues.time,
   p.firstname, p.lastname
   from issues
   inner join admin p on issues.admin_id = p.id
   WHERE 
   (worker_id = $4 and admin_id = $5 ) and issues.state = $6 and issues.reason = $6
   ORDER BY issues.time DESC 
   
   
   LIMIT $1 OFFSET ($2 - 1)  *  $3	;
   `,
         [size, page, size, id, admin_id, true]
       );
       
       res.status(200).send(data.rows)
    } catch (error) {
     console.log(error)
    }
 });

 router.get("/only_false",check, async function(req, res, next){
    const id = get_id(req, res, next);
    const Schema = Joi.object({
     page: Joi.number().required().min(1),
     size: Joi.number().required().min(1),
     admin_id: Joi.number().required().min(1),
     
   });
   const checkSchema = Schema.validate(req.query);
   if (checkSchema.error) return res.status(400).send(checkSchema.error.message);
  
  
   const { page, size, admin_id } = req.query;
    try {
     let data = await pool.query(
         `
   Select
   issues.reason, issues.detail, issues.time,
   p.firstname, p.lastname
   from issues
   inner join admin p on issues.admin_id = p.id
   WHERE 
   (worker_id = $4 and admin_id = $5 ) and issues.state = $6 and issues.reason != $6
   ORDER BY issues.time DESC 
   
   
   LIMIT $1 OFFSET ($2 - 1)  *  $3	;
   `,
         [size, page, size, id, admin_id, true]
       );
       
       res.status(200).send(data.rows)
    } catch (error) {
     console.log(error)
    }
 });
export default router;
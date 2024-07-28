import Joi from "joi";
import { Router } from "express";
import { token_check } from "../../../Functions/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.get("/all", [token_check], async function (req, res) {
  const Schema = Joi.object({
    page: Joi.number().required().min(1),
    size: Joi.number().required().min(1),
    worker_id: Joi.number().required().min(1),
  });
  const checkSchema = Schema.validate(req.query);
  if (checkSchema.error) return res.status(400).send(checkSchema.error.message);
  let admin_id;

  let decoded = jwt.verify(req.header("-x-token"), process.env.tokenAdminCode);

  admin_id = eval(decoded.id);
  console.log(admin_id);
  const { page, size, worker_id } = req.query;
  try {
    let data = await pool.query(
      `
Select
issues.reason, issues.detail, issues.time,
p.firstname, p.lastname
from issues
inner join worker p on issues.worker_id = p.id
WHERE 
(worker_id = $4 and admin_id = $5)
ORDER BY issues.time DESC 


LIMIT $1 OFFSET ($2 - 1)  *  $3	;
`,
      [size, page, size, worker_id, admin_id]
    );
    console.log(data.rows.length);
    return res.status(200).send(data.rows);
  } catch (error) {
    res.status(500).send("Serverda xatolik : (");
    console.log("! Error : get_Issues/All: ", error);
  }
});




router.post("/find", [token_check], async function (req, res) {
  const Schema = Joi.object({
    timeBegin : Joi.string().required(),
    timeEnd : Joi.string().required(),
    roleID  : Joi.number(),
    reason : Joi.boolean()
  
  });
  let checkSchema = Schema.validate(req.body)
  if(checkSchema.error) return res.status(202).send(checkSchema.error.message);
  const { timeBegin, timeEnd, roleID, reason  } = req.body;

    if(reason != undefined && roleID) {
      try {
                let data1 = await global.pool.query(`
          select 
issues.reason,
array_agg(issues.detail) AS detail,
array_agg(issues.time ORDER BY issues.time) AS time,
issues.worker_id,
p.firstname as firstname,
p.lastname as lastname,
q.name as role_name,
q.id as role_id
from issues

inner join worker p on p.id = issues.worker_id
inner join role_worker q on q.id = p.role_id
where issues.time >= $1 and issues.time <= $2 and  issues.reason = $3  and q.id = $4
GROUP BY issues.reason,  issues.worker_id, p.firstname, p.lastname, q.name, q.id
`, [timeBegin, timeEnd, reason, roleID]);
return res.status(200).send( data1.rows)
      } catch (error) {
        console.log(error)
      }}


console.log(reason)
      if(reason === undefined && roleID) {
        try {
                  let data1 = await global.pool.query(`
            select 
  
  array_agg(issues.detail) AS detail,
  array_agg(issues.time ORDER BY issues.time) AS time,
  array_agg(issues.reason ORDER BY issues.reason) AS reason,

  issues.worker_id,
  p.firstname as firstname,
  p.lastname as lastname,
  q.name as role_name,
  q.id as role_id
  from issues
  
  inner join worker p on p.id = issues.worker_id
  inner join role_worker q on q.id = p.role_id
  where issues.time >= $1 and issues.time <= $2 and q.id = $3
  GROUP BY   issues.worker_id, p.firstname, p.lastname, q.name, q.id
  `, [timeBegin, timeEnd,  roleID]);
  return res.status(200).send( data1.rows)
        } catch (error) {
          console.log(error)
        }

     res.status(200).send(":)") 
}





});
export default router;

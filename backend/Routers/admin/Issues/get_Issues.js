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

export default router;

import Joi from "joi";
import { Router } from "express";
import { token_check } from "../../../Functions/jwt.js";
(async () => {
  try {
    await global.pool.query(
      `create table issues 
(
id bigserial primary key,
reason boolean default false,
detail varchar(500),
worker_id integer not null,
foreign key (worker_id) references worker (id),
admin_id integer not null,
foreign key (admin_id) references admin (id),
time Date not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,	
state boolean default true
)`
    );
  } catch (error) {
    if (error.code == "42P07") return;

    console.log(error);
  }
})();

const router = Router();

router.post("/", [token_check], async function (req, res) {
  const Schema = Joi.object({
    reason: Joi.boolean().required(),
    detail: Joi.string().min(5).max(499),
    worker_id: Joi.number().min(1).required(),
    admin_id: Joi.number().min(1).required(),
    time: Joi.date().required(),
  });
  const checkSchema = Schema.validate(req.body);

  if (checkSchema.error) return res.status(400).send(checkSchema.error.message);
  const { reason, detail, worker_id, admin_id, time } = req.body;
  try {
    let data = await global.pool.query(
      "select p.lastname, p.firstname from issues inner join worker p on issues.worker_id = p.id where (worker_id = $1 and time = $2) ;",
      [worker_id, time]
    );
    if (data.rows[0])
      return res
        .status(400)
        .send(
          `${time} sanada ${data.rows[0].lastname} ${data.rows[0].firstname}dan davomat olingan`
        );
  } catch (error) {
    console.log(error);
  }
  try {
    await global.pool.query(
      `insert into issues(reason, detail, worker_id, admin_id, time) values ($1, $2, $3, $4, $5);`,
      [reason, detail, worker_id, admin_id, time]
    );
  } catch (error) {
    if (error.code == "23505") return res.status(400).send(" ");
    if(error.code == "23503") return res.status(401).send(error.detail)
    console.log(error);
    return res.status(500).send("Server error");
  }
  return res.status(201).send("Created : )");
});

export default router;

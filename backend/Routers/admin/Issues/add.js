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
worker_id integer,
foreign key (worker_id) references worker (id),
admin_id integer,
foreign key (admin_id) references admin (id),
time Date,
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

router.post("/", [token_check], async function(req, res)
{
    const Schema = Joi.object(
        {
            reason : Joi.boolean().required(),
            detail : Joi.string().min(5).max(499),
            worker_id : Joi.number().min(1).required(),
            admin_id : Joi.number().min(1).required(),
            time : Joi.date().required()
        }
    );
    const checkSchema = Schema.validate(req.body);

    if(checkSchema.error) return res.status(400).send(checkSchema.error.message);
    try {
      const {reason, detail, worker_id, admin_id, time} = req.body;
      await global.pool.query(
        `insert into issues(reason, detail, worker_id, admin_id, time) values ($1, $2, $3, $4, $5);`,
        [reason, detail, worker_id, admin_id, time]
      )
    } catch (error) {
      if(error.code == "23505")
        return res.status(401).send(" ")
      console.log(error);
    }
    return res.status(201).send("Created : )");


}
);

export default router;

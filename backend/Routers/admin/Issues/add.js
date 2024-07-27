import Joi from "joi";
import { Router } from "express";
import { token_check, get_id } from "../../../Functions/jwt.js";
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
state boolean default true,
UNIQUE (worker_id, time)
);
CREATE OR REPLACE FUNCTION check_date_not_future2() 
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.time > CURRENT_DATE THEN
        RAISE EXCEPTION 'Bugungi sanadan oshib ketishi mumkin emas !';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that calls the function before insert or update
CREATE TRIGGER date_check_trigger1
BEFORE INSERT OR UPDATE ON issues
FOR EACH ROW EXECUTE FUNCTION check_date_not_future2();


`
    );
  } catch (error) {
    if (error.code == "42P07") return;

    console.log(error);
  }
})();

const router = Router();

router.post("/", [token_check], async function (req, res, next) {
  
  const Schema = Joi.array().items(
    Joi.object({
    reason: Joi.boolean().required(),
    detail: Joi.string().min(5).max(499).required(),
    worker_id: Joi.number().min(1).required(),
    time: Joi.string().required(),
  }));
  const checkSchema = Schema.validate(req.body);
  if (checkSchema.error) return res.status(202).send({error:checkSchema.error.message});
  const { reason, detail, worker_id,  time } = req.body;
 
  
  try {

    let admin_id = get_id(req, res, next);
  

    await global.pool.query("BEGIN");

    const queryText = `insert into issues(reason, detail, worker_id, admin_id, time) values ($1, $2, $3, $4, $5);` 

    for (let data of req.body) {
    const { reason, detail, worker_id,  time } = data;
    await global.pool.query(queryText, [reason, detail, worker_id, admin_id, time]);

    }

    await global.pool.query("COMMIT");
    res.status(201).send(req.body);

    
  } catch (error) {
    if (error.code == "P0001")
      return res.status(202).send("Sana berilgan sanadan oshib ketdi");
    if (error.code == "22007")
      return res.status(202).send("Berilgan sana xato");
    if (error.code == "23503") return res.status(202).send({error :error.detail});
    if (error.code == "23505") return res.status(202).send({error :error.detail});

    console.log(error);
  }
}
  );

export default router;

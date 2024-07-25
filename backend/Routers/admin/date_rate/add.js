import { Router } from "express";
import Joi from "joi";
import { token_check } from "../../../Functions/jwt.js";

(async () => {
  try {
    await global.pool.query(`
        CREATE TABLE date_rate (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time DATE DEFAULT CURRENT_DATE,
    rate DOUBLE PRECISION CHECK (rate >= 0),
    admin_id INTEGER not null,
    FOREIGN KEY (admin_id) REFERENCES admin(id),
    worker_id INTEGER not null,
    FOREIGN KEY (worker_id) REFERENCES worker(id),
    UNIQUE (time, worker_id)
);

-- Create a function to check the date constraint
CREATE OR REPLACE FUNCTION check_date_not_future() 
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.time > CURRENT_DATE THEN
        RAISE EXCEPTION 'Bugungi sanadan oshib ketishi mumkin emas !';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that calls the function before insert or update
CREATE TRIGGER date_check_trigger
BEFORE INSERT OR UPDATE ON date_rate
FOR EACH ROW EXECUTE FUNCTION check_date_not_future();
`);

    console.log("Task database yaratildi");
  } catch (error) {
    if (error.code == "42P07");
    else console.log(error);
  }
})();

const router = Router();

router.post("/", [token_check], async function (req, res) {
  const Schema = Joi.array().items(
    Joi.object({
      time: Joi.date().min(3),
      rate: Joi.number().max(100000).min(0).required(),
      admin_id: Joi.number().max(10000).min(0).required(),
      worker_id: Joi.number().max(10000).min(0).required(),
    })
  );

  let checkSchema = Schema.validate(req.body);
  if (checkSchema.error) {
    return res.status(400).send(checkSchema.error.message);
  }

  try {
    await global.pool.query("BEGIN");

    const queryText = `insert into date_rate  (time, rate, admin_id, worker_id)
values 
($1, $2, $3, $4);`;
    for (let data of req.body) {
      const { time, rate, admin_id, worker_id } = data;

      await global.pool.query(queryText, [time, rate, admin_id, worker_id]);
    }

    await global.pool.query("COMMIT");
    res.status(201).send(req.body);
  } catch (error) {
    if (error.code == "P0001")
      return res.status(400).send("Sana berilgan sanadan oshib ketdi");
    if (error.code == "22007")
      return res.status(400).send("Berilgan sana xato");
    if (error.code == "23503") return res.status(400).send(error.detail);
    if (error.code == "23505") return res.status(400).send(error.detail);

    console.log(error);
  }
});

export default router;

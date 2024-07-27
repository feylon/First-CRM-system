import Joi from "joi";
import { Router } from "express";
import { token_check } from "../../../Functions/jwt.js";

const router = Router();

router.get("/firstname/:firstname/:role_id", async function (req, res) {
  const Schema = Joi.object({
    firstname: Joi.string().required(),
    role_id: Joi.number().required(),
  });
  let checkSchema = Schema.validate(req.params);
  if (checkSchema.error) return res.status(202).send(checkSchema.error.message);
  try {
    const lastnamePattern = `%${req.params.firstname}%`;

    const data = await global.pool.query(
      `
            SELECT 
worker.id as id,
p.id as role_id,
worker.firstname as firstname,
worker.lastname as lastname,
p.name as role_name 
FROM worker
inner join role_worker p  on worker.role_id = p.id
WHERE firstname LIKE $1 and worker.role_id = $2

ORDER BY firstname;

        `,
      [lastnamePattern, req.params.role_id]
    );

    res.send(data.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/lastname/:lastname/:role_id", async function (req, res) {
  const Schema = Joi.object({
    lastname: Joi.string().required(),
    role_id: Joi.number().required(),
  });
  let checkSchema = Schema.validate(req.params);
  if (checkSchema.error) return res.status(202).send(checkSchema.error.message);
  try {
    const lastnamePattern = `%${req.params.lastname}%`;

    const data = await global.pool.query(
      `
SELECT 
  worker.id as id,
  p.id as role_id,
  worker.firstname as firstname,
  worker.lastname as lastname,
  p.name as role_name 
  FROM worker
  inner join role_worker p  on worker.role_id = p.id
  WHERE lastname LIKE $1 and worker.role_id = $2
  
  ORDER BY lastname;
  
          `,
      [lastnamePattern, req.params.role_id]
    );

    res.send(data.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Internal Server Error");
  }
});



router.get("/all", async function (req, res) {
  const Schema = Joi.object({
    role_id: Joi.number().required(),
    time : Joi.number().required()
  });
  if(Schema.validate(req.query).error) {
     res.status(400).send({error : Schema.validate(req.query).error.message})
    console.log(Schema.validate(req.query).error.message)
    return
  }
  console.log(req.query)
  const {role_id, time} = req.query;
let  formattedDate;
  try {
    const date = new Date(eval(time));

const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
const day = date.getDate().toString().padStart(2, '0');

 formattedDate = `${year}-${month}-${day}`;
  } catch (error) {
    res.status(400).send("error time")
  }


  let checkSchema = Schema.validate(req.query);
  if (checkSchema.error) return res.status(202).send(checkSchema.error.message);
  try {
    const lastnamePattern = `%${req.params.firstname}%`;

    const data = await global.pool.query(
      `
           SELECT 
worker.id as id,
p.id as role_id,
worker.firstname as firstname,
worker.lastname as lastname,
p.name as role_name 
FROM worker
inner join role_worker p  on worker.role_id = p.id
inner join issues q  on worker.id = q.worker_id

WHERE worker.role_id = $1 and NOT  (worker.id = q.worker_id and q.time = $2)

ORDER BY firstname;
        `,
      [role_id, formattedDate]
    );

    res.send(data.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Internal Server Error");
  }
});


export default router;

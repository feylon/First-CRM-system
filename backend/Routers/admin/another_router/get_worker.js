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
    role_id: Joi.number().required()
    
  });
  if(Schema.validate(req.query).error) {
     res.status(400).send({error : Schema.validate(req.query).error.message})
    console.log(Schema.validate(req.query).error.message)
    return
  }
  console.log(req.query)
  const {role_id} = req.query;


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

WHERE worker.role_id = $1 

ORDER BY firstname;
        `,
      [role_id]
    );

    res.send(data.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Internal Server Error");
  }
});


// by ID worker

router.get("/byID/:id", async function (req, res) {
  const Schema = Joi.object({
    id: Joi.string().required()
  });
  let checkSchema = Schema.validate(req.params);
  if (checkSchema.error) return res.status(202).send(checkSchema.error.message);
  try {
    

    const data = await global.pool.query(
      `
             
Select id, firstname, lastname from
worker
where id = $1
        `,
      [req.params.id]
    );

    res.send(data.rows[0]);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Internal Server Error");
  }
});



export default router;

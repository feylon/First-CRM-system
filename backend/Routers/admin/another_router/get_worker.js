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
      `	SELECT 
			email,
			firstname,
			lastname,
			brithday,
			phone,
			s.name_uz as tuman_lotin,
			s.name_oz as tuman_krill,
			s.name_ru as tuman_ru ,
			r.name_uz,
			r.name_oz,
			r.name_ru,
			p.name AS role_name,
			active,
      worker.id
		FROM worker
		INNER JOIN role_worker p ON worker.role_id = p.id
		INNER JOIN regions r ON worker.viloyat = r.id
		INNER JOIN districts s ON worker.tuman = s.id

		WHERE worker.state = true and worker.id = $1
        `,
      [req.params.id]
    );

    const date = new Date(data.rows[0].brithday);

// Step 2: Extract year, month, and day
const year = date.getUTCFullYear();
const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(date.getUTCDate()).padStart(2, '0');

// Step 3: Format the date as "YYYY-MM-DD"
data.rows[0].brithday = `${year}-${month}-${day}`;
    res.status(200).send(data.rows[0]);

  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/id", async function (req, res){


  const id = req.params;
  cosnnole.log(id)
try {

  const {page, size} = req.query;
      const data = await global.pool.query(
  `SELECT 
      email,
      firstname,
      lastname,
      brithday,
      phone,
      s.name_uz as tuman_lotin,
  s.name_oz as tuman_krill,
  s.name_ru as tuman_ru ,
  r.name_uz,
  r.name_oz,
  r.name_ru,
      p.name AS role_name,
      active
  FROM worker
  INNER JOIN role_worker p ON worker.role_id = p.id
  INNER JOIN regions r ON worker.viloyat = r.id
  INNER JOIN districts s ON worker.tuman = s.id

  WHERE worker.state = true and worker.id = $1`,
  [id]
      )

return res.status(200).send(data.rows)
} catch (error) {
  res.status(500).send("Serverda xatolik : (");
  console.log("! Error : get_caterogies: ", error)
}

});







export default router;

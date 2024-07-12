import { Router } from "express";
import Joi from "joi";
import { token_check } from "../../../Functions/jwt.js";
const router = Router();
router.post("/:id", [token_check], async (req, res) => {
  const Schema = Joi.object({
    email: Joi.string().email().trim().required().min(3).max(50),
    firstname: Joi.string().trim().required().min(3).max(50),
    lastname: Joi.string().trim().required().min(3).max(50),
    brithday: Joi.date().required(),
    phone: Joi.string().required().trim().min(7),
    viloyat: Joi.string().required(),
    tuman: Joi.string().required(),
    role_id: Joi.number().min(0).required(),
    state : Joi.boolean().required(),
    active : Joi.boolean().required()
      });
  let checkValidate = Schema.validate(req.body);
  if (checkValidate.error)
    return res.status(400).send(checkValidate.error.message);
  const {
    email,
    firstname,
    lastname,
    brithday,
    phone,
    viloyat,
    tuman,
    role_id,
    state,
    active
  } = req.body;
  
  let paramsSchema = Joi.object({
    id : Joi.number().required()
  });

  if(paramsSchema.validate(req.params).error) return res.status(400).send(paramsSchema.validate(req.params).error.message);
  const  {id} = req.params;

  console.log(id)
try {
  const hasData = await global.pool.query
("Select id from worker where id = $1", [id]);

if(hasData.rows.length == 0) return  res.status(404).send("Ma'lumot mavjud emas");

} catch (error) {
console.log(error)  
}

  
  try {
    await global.pool.query(
      `
        UPDATE worker SET 
    email = $1,
    firstname = $2,
    lastname = $3,
    brithday = $4,
    phone = $5,
    viloyat = $6,
    tuman = $7,
    role_id = $8,
    state = $9,
    active = $10
WHERE id = $11;
;`,
      [
    email,
    firstname,
    lastname,
    brithday,
    phone,
    viloyat,
    tuman,
    role_id,
    state,
    active,
    id
      ]
    );
    let data = await global.pool.query(
      "Select email, firstname, lastname, brithday, phone, viloyat, tuman from worker where id = $1",
      [id]
    );
    res.status(201).send("Edited : )");
  } catch (error) {
    if (error.code == "23505") return res.status(400).send(error.detail);
    if (error.code == "23503")
      return res
        .status(400)
        .send(`Kalit (role_id)=(${role_id}) "Rollar" jadvalida mavjud emas.`);
    console.log(error);
  }
});

export default router;

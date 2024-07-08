import { Router } from "express";
import Joi from "joi";
const router = Router();
router.post("/:id", async (req, res) => {
  const Schema = Joi.object({
    email: Joi.string().email().trim().required().min(3).max(50),
    firstname: Joi.string().trim().required().min(3).max(50),
    lastname: Joi.string().trim().required().min(3).max(50),
    brithday: Joi.date().required(),
    phone: Joi.string().required().trim().min(7),
    viloyat: Joi.string().required(),
    tuman: Joi.string().required(),
    role_id: Joi.number().min(0).required(),
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
  } = req.body;
res.send(req.body)
  return;
  try {
    await global.pool.query(
      `
        insert into worker(
        email,
        firstname,
        lastname,
        brithday,
        phone,
        viloyat,
        tuman,
        password,
        role_id
        )
        values($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      [
        email,
        firstname,
        lastname,
        brithday,
        phone,
        viloyat,
        tuman,
        password,
        role_id,
      ]
    );
    let data = await global.pool.query(
      "Select email, firstname, lastname, brithday, phone, viloyat, tuman from worker where email = $1",
      [email]
    );
    res.status(201).send(data.rows);
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

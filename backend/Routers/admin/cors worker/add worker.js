import Joi from "joi";
import { Router } from "express";
import { hash } from "../../../Functions/bcryptr.js";
import { joiPasswordExtendCore } from "joi-password";
import { token_check } from "../../../Functions/jwt.js";
const joiPassword = Joi.extend(joiPasswordExtendCore);

(async () => {
  try {
    await global.pool.query(`
    create table worker (
    id bigserial primary key unique,
    email varchar(500) not null unique,
    password varchar(200) not null,
    firstname varchar(500) not null,
    lastname varchar(500) not null,
    brithday date default '2000-01-01',
    profil_url varchar(500),
    phone varchar(200),
    viloyat varchar(200),
    tuman varchar(200),
    state boolean default true,
    active boolean default true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role_id integer,
    foreign key (role_id) references role_worker(id)


);
            `);
    console.log("Database yaratildi");
  } catch (error) {
    if (error.code == "42P07") return;
    console.log(error);
  }
})();

const router = Router();
router.post("/",[token_check], async (req, res) => {
  const Schema = Joi.object({
    email: Joi.string().email().trim().required().min(3).max(50),
    firstname: Joi.string().trim().required().min(3).max(50),
    lastname: Joi.string().trim().required().min(3).max(50),
    brithday: Joi.date().required(),
    phone: Joi.string().required().trim().min(7),
    viloyat: Joi.string().required(),
    tuman: Joi.string().required(),
    role_id: Joi.number().min(0).required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .doesNotInclude(["password"])
      .required(),
  });
  let checkValidate = Schema.validate(req.body);
  if (checkValidate.error)
    return res.status(400).send(checkValidate.error.message);
  req.body.password = await hash(req.body.password);
  const {
    email,
    firstname,
    lastname,
    brithday,
    phone,
    viloyat,
    tuman,
    password,
    role_id,
  } = req.body;
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

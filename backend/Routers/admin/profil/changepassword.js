import Joi from "joi";
import { Router } from "express";
import { joiPasswordExtendCore } from "joi-password";
import { token_check, get_id } from "../../../Functions/jwt.js";
import { check, hash } from "../../../Functions/bcryptr.js";
const joiPassword = Joi.extend(joiPasswordExtendCore);



const router = Router();
router.post("/",[token_check], async (req, res, next) => {
  const Schema = Joi.object({
    oldpassword : Joi.string().min(3).required(),
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
    return res.status(202).send({error : checkValidate.error.message});
let adminId = get_id(req, res, next);
try {
    const data = await global.pool.query(
        `
        Select id, password
        from
        admin
        where (state = true and id = $1);
        `, [adminId]
    );
    
    const check_login = await check(req.body.oldpassword, data.rows[0].password);
    
    if(!check_login) return res.status(202).send({error : 'Old password is wrong'});
    
    


} catch (error) {
console.log(error)    
}
try {
    let newpassword = await hash(req.body.password);

    await global.pool.query(`update admin set password = $1 where id = $2`, [newpassword, adminId]);

    return res.status(201).send({content : "Updated password ✌🤞"})
} catch (error) {
    console.log("error1 : ", error)
}
  
});

export default router;

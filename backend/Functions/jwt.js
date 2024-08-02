import jwt from "jsonwebtoken";
import  dotenv  from "dotenv";
dotenv.config();
function sign(id) {
  return jwt.sign({ id }, process.env.tokenAdminCode, { expiresIn: "7d" });
}

async function token_check(req, res, next) {
  if (!req.session.IsAdmin) {
    return res.status(401).send('Unauthorized');
  }  
  next();
}
function get_id(req, res, next){
  
  return req.session.adminId
}  
export { sign, token_check,get_id };

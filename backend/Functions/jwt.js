import jwt from "jsonwebtoken";
import  dotenv  from "dotenv";
dotenv.config();
function sign(id) {
  return jwt.sign({ id }, process.env.tokenAdminCode, { expiresIn: "7d" });
}

async function token_check(req, res, next) {
  // if (!req.session.IsAdmin) {
  //   return res.status(401).send('Unauthorized');
  // }  
  // next();


  try{
    let token = req.header("-x-token")    
    let decoded = jwt.verify(token,process.env.tokenAdminCode);
    next();
    }
    catch(err){
    return res.status(401).send("Token eskirgan");
    }
    
    
    
}
function get_id(req, res, next){
  try {
    let token = req.header("-x-token")    
    let decoded = jwt.verify(token,process.env.tokenAdminCode);
    return eval(decoded.id); 
   } catch (error) {
    return res.status(401).send("Token eskirgan");

   }

  // return req.session.adminId
}  
export { sign, token_check,get_id };

import jwt from "jsonwebtoken";
import  dotenv  from "dotenv";
dotenv.config();
function sign(id) {
  return jwt.sign({ id }, process.env.tokenAdminCode, { expiresIn: "1h" });
}

function token_check(req, res, next) {
  try {
    ;
    let token = req.header("-x-token");
    let decoded = jwt.verify(token, process.env.tokenAdminCode);
    req.header("-x-token",eval(decoded.id))
    
    next();
  } catch (err) {
    return res.status(401).send("Token eskirgan");
  }
}

function get_id(req, res, next){
    try {
        let token = req.header("-x-token");
        let decoded = jwt.verify(token, "YashirinKOD");
        // console.log(decoded);
    
        // req.body.jwt_id = decoded.id;
    
        next();
      } catch (err) {
        return res.status(400).send("Token eskirgan");
      } 
}
export { sign, token_check };

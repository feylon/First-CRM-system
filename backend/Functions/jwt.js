import jwt from "jsonwebtoken";
import  dotenv  from "dotenv";
dotenv.config();
function sign(id) {
  return jwt.sign({ id }, process.env.tokenAdminCode, { expiresIn: "7d" });
}

async function token_check(req, res, next) {
  let token = req.header("-x-token");
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let id;
  try {
    
    let decoded = jwt.verify(token, process.env.tokenAdminCode);
    
    id = eval(decoded.id);

    
  } catch (err) {
    return res.status(401).send("Token eskirgan");
  }
  try {
let data = await global.pool.query(
  `select * from jwt_admin where admin_id = $1;`,
  [id]
);
const {jwt, ip} = data.rows[0];
if(token == jwt && ip == clientIp)
next();
else return res.status(401).send("Token eskirgan");
  } catch (error) {
    console.log(error)
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
}  
export { sign, token_check,get_id };

import jwt from "jsonwebtoken";

function sign(id){
   return jwt.sign({id},"YashirinKOD",{expiresIn:"1d"})
};

function check(req, res, next){
    try{
        let token = req.header("-x-token")    
        let decoded = jwt.verify(token,"YashirinKOD");
        // console.log(decoded);
        // req.body.jwt_id = decoded.id;
        next();
        }
        catch(err){
        return res.status(400).send("Token eskirgan");
        }
        
        
        }
function get_id(req, res, next){
   try {
    let token = req.header("-x-token")    
    let decoded = jwt.verify(token,"YashirinKOD");
    return eval(decoded.id); 
   } catch (error) {
    return res.status(400).send("Token eskirgan");

   }
}        
export {sign, check, get_id}
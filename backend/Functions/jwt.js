import jwt from "jsonwebtoken";

function sign(id){
   return jwt.sign({id},"Yashirin",{expiresIn:"1h"})
};

function token_check(id){
    try{
        let token = req.header("-x-token")    
        let decoded = jwt.verify(token,"YashirinKOD");
        // console.log(decoded);
        req.body.jwt_id = decoded.id;
        next();
        }
        catch(err){
        return res.status(400).send("Token eskirgan");
        }
        
        
        
}   
export {sign, token_check}
import jwt from "jsonwebtoken";

function sign(id){
   return jwt.sign({id},"Yashirin",{expiresIn:"1h"})
};

function token_check(id){
    try {
        
    } catch (error) {
        
    }
}   
export {sign}
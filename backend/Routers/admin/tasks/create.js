import Joi from "joi";
import  {Router} from "express";
import fs from "fs";
import { token_check, get_id } from "../../../Functions/jwt.js";
import  dotenv  from "dotenv";
dotenv.config();
(async()=>{
    try {
        await global.pool.query(`
create table task
( id bigserial primary key unique,
name varchar(500),
description varchar(500),
task_file varchar(500),
task_file_name varchar(500),
done_file varchar(500),
done_file_name varchar(500),
admin_id integer not null,
foreign key (admin_id) references admin (id),
worker_id integer not null,
foreign key (worker_id) references worker (id),
diedline TIMESTAMP ,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
active boolean default true,
rate integer default 0,
MaxRate integer,	
done boolean default false,
attempt integer default 1
 );`);

                console.log("Task database yaratildi");
      } catch (error) {
        if (error.code == "42P07") ;
        else          console.log(error);
      }
})();



const router = Router();

router.post("/",[token_check], async function(req, res, next){
  

  

  
  const Schema = Joi.object({
    name : Joi.string().min(5).max(500).required().trim(),
    description : Joi.string().min(10).max(500).required().trim(),
    worker_id : Joi.number().min(0).required(),
    diedline : Joi.string().required(),
    active : Joi.boolean().required(),
    MaxRate : Joi.number().min(0).required(),
    attempt : Joi.number().min(0).required().max(10),
});

const checkSchema = Schema.validate(req.body);
if(checkSchema.error) {
return res.status(400).send(checkSchema.error.message)
}
     
     const admin_id = get_id(req,res, next);
try {
  await global.pool.query(
    `
    insert into task
(name, description,  admin_id, worker_id, diedline, active, maxrate,  attempt)
values
($1, $2, $3, $4, $5, $6, $7, $8);
`,
    [req.body.name, req.body.description, admin_id, req.body.worker_id, req.body.diedline, req.body.active, req.body.MaxRate, req.body.attempt]  
  );

  res.status(201).send("Created :)");
} catch (error) {
  if(error.code == "23503"){
    
    return res.status(400).send(error.detail)
  };
  if(error.code == "22008") {
    
    return res.status(400).send("Sana vaqt xato")
  };
  console.log(error)

}
  
  
  
} );
export default router ;

import multer from "multer";
import md5 from "md5";
import Joi from "joi";
import  {Router} from "express";
import fs from "fs";
import { token_check } from "../../../Functions/jwt.js";
import  dotenv  from "dotenv";
import jwt from "jsonwebtoken"
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
done boolean default false ,
attempt integer default 1
 );`);

                console.log("Task database yaratildi");
      } catch (error) {
        if (error.code == "42P07") ;
        else          console.log(error);
      }
})();



let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, `${process.cwd()}/static/task`);
  },
  filename: (req, file, cb) => {
      let ext = file.originalname.split('.').pop();
      let name = md5(Date.now());
      let filename = `${name}.${ext}`;
      cb(null, filename);
      req.body.task_file = { url: filename, name: file.originalname };
      
  }
});

let upload = multer({
  limits: { fileSize:  1024 * 1024 },
      fileFilter: (req, file, cb) => {
        cb(null, true);
             
  },
  storage: storage
}).single("file");
const router = Router();

router.post("/",[token_check,upload], async function(req, res,){
  
const body = {
name : req.body.name ,
description : req.body.description,
worker_id : req.body.worker_id,
diedline : req.body.diedline,
active : req.body.active == 'on' ? true : false  ,
MaxRate : req.body.MaxRate,
done : req.body.done == 'on' ? true : false,
attempt : req.body.attempt
}
  

  
  const Schema = Joi.object({
    name : Joi.string().min(5).max(500).required().trim(),
    description : Joi.string().min(10).max(500).required().trim(),
    worker_id : Joi.number().min(0).required(),
    diedline : Joi.string().required(),
    active : Joi.boolean().required(),
    MaxRate : Joi.number().min(0).required(),
    attempt : Joi.number().min(0).required().max(10),
    done :  Joi.boolean().required()
});
body
const checkSchema = Schema.validate(body);
if(checkSchema.error) {
  fs.unlink(`${process.cwd()}/static/task/${req.body.task_file.url}`,(err)=>{
    if(err) return console.log(err) 
      }) ;
      console.log(checkSchema.error.message);
      console.log("BODY : ", req.body);
      return res.status(400).send(checkSchema.error.message)
}
     
     const {id} = jwt.verify(req.header("-x-token"), process.env.tokenAdminCode);;
try {
  await global.pool.query(
    `
    insert into task
(name, description, task_file, task_file_name, admin_id, worker_id, diedline, active, maxrate, done, attempt)
values
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
`,
    [body.name, body.description, req.body.task_file.name, req.body.task_file.url, id, body.worker_id, body.diedline, body.active, body.MaxRate, body.done,  body.attempt]  
  )
} catch (error) {
  if(error.code == "23503"){
    fs.unlink(`${process.cwd()}/static/task/${req.body.task_file.url}`,(err)=>{
      if(err) return console.log(err) 
      }) ;
    return res.status(400).send(error.detail)
  };
  if(error.code == "22008") {
    fs.unlink(`${process.cwd()}/static/task/${req.body.task_file.url}`,(err)=>{
      if(err) return console.log(err) 
      }) ;
    return res.status(400).send("Sana vaqt xato")
  };
  console.log(error)

}
  
  
  
} );
export default router ;

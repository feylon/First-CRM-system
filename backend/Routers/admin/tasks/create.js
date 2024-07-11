import multer from "multer";
import md5 from "md5";
import Joi from "joi";
import  {Router} from "express";
import fs from "fs"
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
done boolean default false 
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
      console.log("Bajarildi");
  }
});

let upload = multer({
  limits: { fileSize:  1024 * 1024 },
      fileFilter: (req, file, cb) => {
        cb(null, true);
        console.log(file)
        
  },
  storage: storage
}).single("file");
const router = Router();

router.post("/",upload, function(req, res,){
  console.log(req.body)
  
const body = {
name : req.body.name ,
description : req.body.description,
admin_id : req.body.admin_id,
worker_id : req.body.worker_id,
diedline : req.body.diedline,
active : req.body.active,
MaxRate : req.body.MaxRate,
done : req.body.done,
}
  

  
  const Schema = Joi.object({
    name : Joi.string().min(5).max(500).required().trim(),
    description : Joi.string().min(10).max(500).required().trim(),
    admin_id : Joi.number().min(0).required(),
    worker_id : Joi.number().min(0).required(),
    diedline : Joi.date().required(),
    active : Joi.boolean().required(),
    MaxRate : Joi.number().min(0).required(),
    done :  Joi.boolean().required()
});
const checkSchema = Schema.validate(body);
if(checkSchema.error) {
  fs.unlink(`${process.cwd()}/static/task/${req.body.task_file.url}`,(err)=>{
    if(err) return console.log(err) 
      }) ;
  return res.status(400).send(checkSchema.error.message)}

  res.send(req.body)
  
  
  
} );
export default router ;

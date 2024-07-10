import Joi from "joi";
import  {Router} from "express";
(async()=>{
    try {
        await global.pool.query(`
create table task
( id bigserial primary key unique,
name varchar(500),
description varchar(500),
task_file varchar(500),
done_file varchar(500),
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
})()

const router = Router();

router.post("/",[function(req,res,next){const Schema = Joi.object({
    name : Joi.string().min(10).max(500).required().trim(),
    description : Joi.string().min(10).max(500).required().trim(),
    admin_id : Joi.number().min(0).required(),
    worker_id : Joi.number().min(0).required(),
    diedline : Joi.date().required(),
    active : Joi.boolean().required(),
    MaxRate : Joi.number().min(0).required(),
    done :  Joi.boolean().required()
});
console.log(req.body);
return res.send(req.body)
},],function(req,res){
    

        

});
export default router ;

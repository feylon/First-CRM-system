import multer from "multer";
import md5 from "md5";
import { Router } from "express";
import { token_check, get_id } from "../../../Functions/jwt.js";
import fs from "fs"

const router = Router();
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.cwd()}/static/task`);
    },
    filename: async (req, file, cb) => {
        let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
        let name = md5(Date.now());
        cb(null, `${name}.` + ext);
        req.body.filename = { url: `task/${name}.` + ext, name: file.originalname };
    }
});

const fileSizeLimit = 5 * 1024 * 1024; 

let upload = multer({
    storage: storage,
    limits: { fileSize: fileSizeLimit }
});


router.post("/:id", [token_check, upload.single('file')], async (req, res, next)=>{

    let id = req.params.id;
    console.log(id)
    
    
    try {
        let task_file_name = await global.pool.query(
            `
            Select  task_file_name from task where task.id =$1
            `, [id]
        );
        if(task_file_name.rows.length > 0) 
           {
            const filePath = `${process.cwd()}/static/${task_file_name.rows[0].task_file_name}`;

            fs.unlink(filePath, (err) => {
                if (err) {
                } else {

                }
            });
           }
        let data = await global.pool.query(
            `UPDATE task SET
              task_file_name = $1,
              task_file = $3

              
              where id = $2
            `, 
            [
            req.body.filename.url,
            id, req.body.filename.name
            ]
        );
        res.status(200).send("Edited");
    } catch (error) {
        console.log(error);
    }

   
});



export default router;
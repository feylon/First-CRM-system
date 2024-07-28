import multer from "multer";
import md5 from "md5";
import { Router } from "express";
import { token_check, get_id } from "../../../Functions/jwt.js";
import fs from "fs"

const router = Router();
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.cwd()}/static/ProfilePhotos`);
    },
    filename: async (req, file, cb) => {
        let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
        let name = md5(Date.now());
        cb(null, `${name}.` + ext);
        req.body.filename = { url: `${name}.` + ext, name: file.originalname };
    }
});

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const fileSizeLimit = 5 * 1024 * 1024; 

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: fileSizeLimit }
});


router.post("/", [token_check, upload.single('picture')], async (req, res, next)=>{

    let admin_id = get_id(req,res,next);
    
    
    
    try {
        let oldpicture = await global.pool.query(
            `
            Select  profil_url from admin where id =$1
            `, [admin_id]
        );
        if(oldpicture.rows.length > 0) 
           {
            const filePath = `${process.cwd()}/static/ProfilePhotos/${oldpicture.rows[0].profil_url}`;

            fs.unlink(filePath, (err) => {
                if (err) {
                } else {

                }
            });
           }
        let data = await global.pool.query(
            `UPDATE admin SET
              profil_url = $1
              
              where id = $2
            `, 
            [
            req.body.filename.url,
            admin_id
            ]
        );
        res.status(200).send("Edited");
    } catch (error) {
        console.log(error);
    }

   
});



export default router;
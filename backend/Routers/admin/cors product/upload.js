import multer from "multer";
import md5 from "md5";
import { Router } from "express";
import { token_check } from "../../../Functions/jwt.js";
import fs from "fs"

const router = Router();
let storage = multer.diskStorage({
    destination: (req, file, cb, ) => {
        cb(null, `${process.cwd()}/static/product`);
    },
    filename: async (req, file, cb) => {
        let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
        let name = md5(Date.now());
        cb(null, `${name}.` + ext);
        req.body.filename = { url: `product/${name}.` + ext, name: file.originalname };
    }
});

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const fileFilter = (req, file, cb) => {
    console.log(req.body);
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


router.post("/:id", [token_check,async (req, res, next)=>{
try {
    // if (!req.file) {
    //     return res.status(400).send('No file uploaded.');
    // }
    let data = await global.pool.query('Select * from product where id = $1',[req.params.id]);
    if(data.rows == 0) res.status(404).send({error :"ID not found!"});
    else next();
} catch (error) {
    console.log(error)
}
}, upload.single('picture')], async (req, res, next)=>{

    
    
    try {
        let oldpicture = await global.pool.query(
            `
            Select  url from product where id =$1
            `, [req.params.id]
        );
        if(oldpicture.rows.length > 0) 
           {
            const filePath = `${process.cwd()}/static/${oldpicture.rows[0].url}`;

            fs.unlink(filePath, (err) => {
                if (err) {
                } else {

                }
            });
           }
        let data = await global.pool.query(
            `update product set url = $1 where id = $2;
            `, 
            [
            req.body.filename.url,
            req.params.id
            ]
        );
        res.status(200).send("Updated Photo");
    } catch (error) {
        console.log(error);
    }

   
});



export default router;
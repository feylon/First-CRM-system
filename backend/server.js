'use strict'
import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Routers
import user from "./Routers/users/index.js";
console.log(user)
dotenv.config();
const app = express();

// Middlewares
app.use(express.static("./static"));
app.use(express.json());
app.use(cors());
// app.use('/user',(()=>import('./Routers/users/sign.js'))())
user.forEach(i=>app.use(`/user/${i[1]}`,i[0]));
app.get("/api", function(req, res){
    res.status(200).send({
        id:1,
        status:"active"
    })
});
 
http.createServer(app).listen(process.env.PORT, function(){
    console.log("PORT : ", process.env.PORT)
})


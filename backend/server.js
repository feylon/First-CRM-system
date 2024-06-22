'use strict'
import http from "http";
import express from "express";
import dotenv from "dotenv";


dotenv.config();
const app = express();

// Middlewares
app.use(express.static("./static"));
app.use(express.json());
app.get("/api", function(req, res){
    res.status(200).send({
        id:1,
        status:"active"
    })
})
http.createServer(app).listen(process.env.PORT, function(){
    console.log("PORT : ", process.env.PORT)
})


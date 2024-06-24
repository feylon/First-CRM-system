'use strict'
import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import client from "./Functions/database.js";

// Routers
import user from "./Routers/users/index.js";
import admin from "./Routers/admin/index.js";

dotenv.config();
const app = express();

(async()=>{
try {
    await client.connect();

} catch (error) {
console.log("Serverda ulanishda xatolik mavjud ", error)    
}
})()

// Middlewares
app.use(express.static("./static"));
app.use(express.json());
app.use(cors());

// Use routers
user.forEach(i=>app.use(`/user/${i[1]}`,i[0]));
admin.forEach(i=>app.use(`/admin/${i[1]}`,i[0]));


http.createServer(app).listen(process.env.PORT, function(){
    console.log("PORT : ", process.env.PORT)
})


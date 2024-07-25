// 'use strict'
import http from "http";
import os from 'os';
import express, {urlencoded} from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./Functions/database.js";
import bot from "./Telegram_Bot/index.js";
import ngrok from "@ngrok/ngrok";
import bodyParser from "body-parser";
import region from "./Functions/region.js";
// Routers
import user from "./Routers/users/index.js";
import admin from "./Routers/admin/index.js";
import worker from "./Routers/worker/index.js";
// Regionlarni o'rnatish
region();
dotenv.config();
const app = express();

(async()=>{
try {
    await pool.connect();

} catch (error) {
console.log("Serverda ulanishda xatolik mavjud ", error)    
}
})()

// Middlewares
app.use(express.static("./static"));
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Use routers
user.forEach(i=>app.use(`/user/${i[1]}`,i[0]));
admin.forEach(i=>app.use(`/admin/${i[1]}`,i[0]));
worker.forEach(i=>app.use(`/worker/${i[1]}`,i[0]));



// const networkInterfaces = os.networkInterfaces();
// let localIP;

// for (const interfaceName in networkInterfaces) {
//   for (const net of networkInterfaces[interfaceName]) {
//     if (net.family === 'IPv4' && !net.internal) {
//       localIP = net.address;
//       break;
//     }
//   }
//   if (localIP) break;
// }

const hostname = "192.168.100.11";

const post = process.env.PORT;
http.createServer(app).listen(
    process.env.PORT,

    hostname, () => {
    console.log(`Server  http://${hostname}:${process.env.PORT}`)
}
);

process.env.PORT


// ngrok.connect({ addr: 8080, authtoken_from_env: true })
// 	.then(listener => console.log(`Ingress established at: ${listener.url()}`));
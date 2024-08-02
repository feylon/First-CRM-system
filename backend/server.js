// 'use strict'
import http from "http";
import cron from "node-cron"
import express, {urlencoded} from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./Functions/database.js";
import bot from "./Telegram_Bot/index.js";
import ngrok from "@ngrok/ngrok";
import bodyParser from "body-parser";
import session from "express-session";
import login from "./Routers/admin/login.js";
import pgsession from "connect-pg-simple";
const PgSession  = pgsession(session)
const app = express();

cron.schedule('0 9 * * *', async () => {
    
    try {
        await global.pool.query(`delete FROM public.session`)
        console.log("Session is cleaned!")
    } catch (error) {
    }
  });

app.use(urlencoded({extended:true}));
app.use(
    session({
      store: new PgSession({
        pool: global.pool,
        tableName: 'session',
      }),
      secret: process.env.session,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      },
    })
  );
import region from "./Functions/region.js";
// Routers
import user from "./Routers/users/index.js";
import admin from "./Routers/admin/index.js";
import worker from "./Routers/worker/index.js";

// WithOut Foreach router
import add_appeal from "./Routers/appeal/add_apeal.js";
// Regionlarni o'rnatish
region();
dotenv.config();

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
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Use routers
user.forEach(i=>app.use(`/user/${i[1]}`,i[0]));
admin.forEach(i=>app.use(`/admin/${i[1]}`,i[0]));
worker.forEach(i=>app.use(`/worker/${i[1]}`,i[0]));
app.use('/add_appeal', add_appeal)



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
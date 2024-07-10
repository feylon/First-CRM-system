// import client from "./Functions/database.js";
// import { Pool } from "pg";
import dotenv from "dotenv";
import pg from "pg";
const {Pool} = pg;
dotenv.config();


const pool = new Pool(
    {
        user:process.env.user,
        password:process.env.password,
        database:process.env.database,
        host:process.env.host,
        port:process.env.port1,
        ssl:true,
        // connectionString:"postgresql://feylon:kndwN8k1Pd7XpNrjERmpkDydCQLZv4KS@dpg-cpncvimehbks73856pg0-a.oregon-postgres.render.com/bulut"
    }
) ;
(async()=>{
    try {
        // await pool.();
        pool.connect();
        console.log("Databsega ulanish hosil qilindi")
      
    } catch (error) {

        // console.log(error.)
        console.log(error)
    }
 })();
 /*
 
 */
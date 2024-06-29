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
        port:process.env.port1
    }
) ;
(async()=>{
    try {
        // await pool.();
        console.log("Databsega ulanish hosil qilindi")
      let data = await  pool.query(`
create table product_types(
id bigserial primary key unique,
category_id bigint references (categories.id),
name varchar(50) not null unique
);
        `);
console.log(data.rows)
    } catch (error) {

        // console.log(error.)
        console.log(error)
    }
 })();
 /*
 
 */
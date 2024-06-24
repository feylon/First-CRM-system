import pg from "pg";
const {Pool} = pg;

import dotenv from "dotenv";
dotenv.config();

 const pool = new Pool(
    {
        user:process.env.user,
        password:process.env.password,
        database:process.env.database,
        host:process.env.host,
        port:process.env.port1
    }
 );
global.pool = pool;
 export default pool;
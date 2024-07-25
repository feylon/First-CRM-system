import pg from "pg";
const {Pool} = pg;

import dotenv from "dotenv";
import { connect } from "@ngrok/ngrok";
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
// let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
// const pool = new Pool(
// {
//    host: PGHOST,
//    database: PGDATABASE,
//    user: PGUSER,
//    password: PGPASSWORD,
//    port: 5432,
//    ssl: {
//      rejectUnauthorized: false,
//    },
// }
// );
global.pool = pool;
 export default pool;
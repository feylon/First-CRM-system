import pg from "pg";
const {Client} = pg;
import dotenv from "dotenv";
dotenv.config();

 const client = new Client(
    {
        user:process.env.user,
        password:process.env.password,
        database:process.env.database,
        host:process.env.host,
        port:process.env.port1
    }
 );
global.client = client;
 export default client;
import pg from "pg";
const {Pool} = pg;

import dotenv from "dotenv";
dotenv.config();

 const pool = new Pool(
    {
        // user:process.env.user,
        // password:process.env.password,
        // database:process.env.database,
        // host:process.env.host,
        // port:process.env.port1
  connectionString: "postgresql://neondb_owner:mCl4kcfN3Eyx@ep-plain-sound-a56glrz5.us-east-2.aws.neon.tech/neondb?sslmode=require"

    }
 );
global.pool = pool;
 export default pool;
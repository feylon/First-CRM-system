
import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  // user: "jamshidu",
  // password: "!Jamshid14092002",
  // database: "jamshidu_CRM",
  // host: "var/run/postgresql",
  // port: 5432,
  connectionString: "postgresql://neondb_owner:mCl4kcfN3Eyx@ep-plain-sound-a56glrz5.us-east-2.aws.neon.tech/neondb?sslmode=require"
});
(async () => {
  try {
    // await pool.();
    pool.connect();
    console.log("Databsega ulanish hosil qilindi");
  } catch (error) {
    console.log(error);
  }
})();
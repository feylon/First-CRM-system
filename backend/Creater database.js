import client from "./Functions/database.js";
 (async()=>{
    try {
        await client.connect();
        console.log("Databsega ulanish hosil qilindi")
      let data = await  client.query(`
      select * from users
`);
console.log(data.rows)
    } catch (error) {

        // console.log(error.)
        console.log(error)
    }
 })()
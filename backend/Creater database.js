import client from "./Functions/database.js";
 (async()=>{
    try {
        await client.connect();
        console.log("Databsega ulanish hosil qilindi")
      let data = await  client.query(`
 Select id, email, login, password, active
    from
    admin
    where (state = true and email = 'jamshid14092002@gmail.com');

        `);
console.log(data.rows)
    } catch (error) {

        // console.log(error.)
        console.log(error)
    }
 })();
 /*
 
 */
import client from "./Functions/database.js";
 (async()=>{
    try {
        await client.connect();
        console.log("Databsega ulanish hosil qilindi")
      let data = await  client.query(`
insert into users(email, password) values
      ('@jamshid14092002','$2b$10$AYG38EVVv5Eqf6Iz1112q.peSUs7ZbBts3qn65MSEvwDtT8TEDiGK') 
        `);
console.log(data.rows)
    } catch (error) {

        // console.log(error.)
        console.log(error)
    }
 })()
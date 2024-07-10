export default async function(id,status, IP){
    
        try {
          await global.pool.query(`
    create table login_history_worker (
    id bigserial  primary key unique,
    IP varchar(500),
    status boolean not null,
    id_worker integer not null,
    foreign key (id_worker) references worker (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
    );
    
    
                  `);

                  console.log("Database yaratildi");
        } catch (error) {
          if (error.code == "42P07") ;
          else          console.log(error);
        }
  try {
console.log(id,status, IP);
await global.pool.query(` insert into login_history_worker (id_worker, IP, status) values
($1, $2, $3)`,[id,IP, status])
} catch (error) {
    console.log(error)
  }      
      };

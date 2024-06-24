-- User shabloni
create table users (
        id bigserial primary key unique,
        email varchar(50) unique not null,
        password varchar(200) not null,
        firstname varchar(200),
        lastname varchar(200),
        phone varchar(200),
        viloyat varchar(200),
        tuman varchar(200),
        state boolean default true,
        active boolean default true,
        brithday date default '2000-01-01',
        profil_url varchar(500)
        );

-- admin shabloni 
create table admin(
id bigserial unique primary key,
email varchar(50) not null unique,
login varchar(50) not null unique,
password varchar(500) not null,
firstname varchar(50),
lastname varchar(50),
phone varchar(200),
viloyat varchar(200),
tuman varchar(200),
state boolean default true,
active boolean default true,
brithday date default '2000-01-01',
profil_url varchar(500)
);
-- Admin uchun default qiymat Parol : JAmshid14!!
insert into admin(email, login, password) values
('jamshid14092002@gmail.com','@jamshid14092002','$2b$10$AYG38EVVv5Eqf6Iz1112q.peSUs7ZbBts3qn65MSEvwDtT8TEDiGK');
Select * from admin;
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
        profil_url varchar(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_seen TIMESTAMP,
        delete_at TIMESTAMP
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
profil_url varchar(500),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
last_seen TIMESTAMP,
delete_at TIMESTAMP
);
-- Admin uchun default qiymat Parol : JAmshid14!!
insert into admin(email, login, password) values
('jamshid14092002@gmail.com','@jamshid14092002','$2b$10$qszd/we2sPerBlHoeUKageRfkVnM9T5LUndqxhgli3NmJdTHRhbOG');
Select * from admin;

-- categories shabloni
        create table categories(
        id bigserial primary key unique,
        name varchar(50) not null unique );

        ALTER TABLE categories
ADD COLUMN state BOOLEAN DEFAULT true;

        alter table categories 
add column 

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
--  product_types shabloni
create table product_types
(
id bigserial primary key unique,
name varchar(500) not null unique,
categories_id integer,
foreign key (categories_id) references categories (id)
);

ALTER TABLE product_types
ADD COLUMN state BOOLEAN DEFAULT true;

        alter table product_types 
add column 

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Product uchun

create table product (
id bigserial primary key unique,
product_type_id integer,
foreign key (product_type_id) references product_types(id),
category_id integer,
foreign key (category_id) references  categories (id),
state boolean default true,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
name varchar(500) unique not null,
price integer not null,
discount_price integer ,
discount integer,
quantity integer,
views integer DEFAULT 0,
likes integer default 0,
sort_order integer default 1,
status integer default 1,
description varchar(500)
);

-- USERs
-- name

create table users (
    id serial primary key,
    name text, 
    username varchar(200) not null,
    password varchar(300) not null
);

-- TODOs
-- name
-- complete

create table todos(
    id serial primary key,
    name text,
    completed boolean,
    user_id integer references users (id)
);
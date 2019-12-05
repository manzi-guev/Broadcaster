/* eslint-disable node/no-unsupported-features/es-syntax */
const createUser = `CREATE TABLE IF NOT EXISTS users (
    firstname text,
    lastname text,
    email text UNIQUE,
    phonenumber text,
    username text,
    password text,
    role text
)`;
const insertUser = `INSERT INTO users (
firstname,
lastname,
email,
phonenumber,
username,
password,
role
) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING returning *`;
const insertAdmin = `INSERT INTO users (
    firstname,
    lastname,
    email,
    phonenumber,
    username,
    password,
    role
    ) VALUES ('Uwineza','Aisha','aisha@gmail.com','+250785802458','aichu','hello1234','admin') ON CONFLICT DO NOTHING returning *`;
const findUser = `select * from users where email = ($1)`;
const findAdmin = `select * from users where role = ($1)`;

export default { createUser, insertUser, findUser, insertAdmin, findAdmin };

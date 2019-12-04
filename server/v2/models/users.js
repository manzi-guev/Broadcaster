/* eslint-disable node/no-unsupported-features/es-syntax */
const createUser = `CREATE TABLE IF NOT EXISTS users (
    firstname text,
    lastname text,
    email text UNIQUE,
    phonenumber text,
    username text,
    password text
)`;
const insertUser = `INSERT INTO users (
    firstname,
    lastname,
    email,
    phonenumber,
    username,
    password
    ) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING returning *`;
const findUser = `select * from users where email = ($1)`;
export default { createUser, insertUser, findUser };

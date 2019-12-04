/* eslint-disable node/no-unsupported-features/es-syntax */
const createUser = `CREATE TABLE IF NOT EXISTS users (
    firstname text,
    lastname text,
    email text UNIQUE,
    phonenumber text,
    username text,
    password text
)`;
export default { createUser };

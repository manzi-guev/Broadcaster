"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* eslint-disable node/no-unsupported-features/es-syntax */
var createUser = "CREATE TABLE IF NOT EXISTS users (\n    firstname text,\n    lastname text,\n    email text UNIQUE,\n    phonenumber text,\n    username text,\n    password text,\n    role text\n)";
var insertUser = "INSERT INTO users (\nfirstname,\nlastname,\nemail,\nphonenumber,\nusername,\npassword,\nrole\n) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING returning *";
var insertAdmin = "INSERT INTO users (\n    firstname,\n    lastname,\n    email,\n    phonenumber,\n    username,\n    password,\n    role\n    ) VALUES ('Uwineza','Aisha','aisha@gmail.com','+250785802458','aichu','hello1234','admin') ON CONFLICT DO NOTHING returning *";
var findUser = "select * from users where email = ($1)";
var findAdmin = "select * from users where role = ($1)";

exports.default = { createUser: createUser, insertUser: insertUser, findUser: findUser, insertAdmin: insertAdmin, findAdmin: findAdmin };
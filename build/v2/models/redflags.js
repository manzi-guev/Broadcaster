"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable node/no-unsupported-features/es-syntax */
var createRedflag = "CREATE TABLE IF NOT EXISTS redflags (\n    id SERIAL PRIMARY KEY,\n    createdOn text,\n    createdBy text,\n    title text,\n    type text,\n    comment text,\n    location text,\n    status text,\n    images text,\n    videos text\n)";
var insertRedflag = "INSERT INTO redflags (\n  createdOn,\n  createdBy,\n  title,\n  type,\n  comment,\n  location,\n  status,\n  images,\n  videos\n) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT DO NOTHING returning *";
var findredflags = "select * from redflags";
var findspecific = "select * from redflags where id = ($1)";
var deleteredflag = "delete from redflags where id = ($1)";
var updatecomment = "UPDATE redflags SET comment = $2 where id = $1";
var updatelocation = "UPDATE redflags SET location = $2 where id = $1";
var updatestatus = "UPDATE redflags SET status = $2 where id = $1";
var findowner = "select * from redflags where createdBy = ($1)";
exports.default = {
  createRedflag: createRedflag,
  insertRedflag: insertRedflag,
  findredflags: findredflags,
  findspecific: findspecific,
  deleteredflag: deleteredflag,
  findowner: findowner,
  updatecomment: updatecomment,
  updatelocation: updatelocation,
  updatestatus: updatestatus
};
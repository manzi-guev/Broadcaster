/* eslint-disable node/no-unsupported-features/es-syntax */
const createRedflag = `CREATE TABLE IF NOT EXISTS redflags (
    id SERIAL PRIMARY KEY,
    createdOn text,
    createdBy text,
    title text,
    type text,
    comment text,
    location text,
    status text,
    images text,
    videos text
)`;
const insertRedflag = `INSERT INTO redflags (
  createdOn,
  createdBy,
  title,
  type,
  comment,
  location,
  status,
  images,
  videos
) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT DO NOTHING returning *`;
const findredflags = `select * from redflags`;
const findspecific = `select * from redflags where id = ($1)`;
const deleteredflag = `delete from redflags where id = ($1)`;
const updatecomment = `UPDATE redflags SET comment = $2 where id = $1`;
const updatelocation = `UPDATE redflags SET location = $2 where id = $1`;
const findowner = `select * from redflags where createdBy = ($1)`;
export default {
  createRedflag,
  insertRedflag,
  findredflags,
  findspecific,
  deleteredflag,
  findowner,
  updatecomment,
  updatelocation
};

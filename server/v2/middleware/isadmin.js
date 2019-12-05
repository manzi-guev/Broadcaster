/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
import jwt from 'jsonwebtoken';
import con from '../db/connection';
import users from '../models/users';
import redflags from '../models/redflags';

const access = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const foundredflag = await con.query(redflags.findspecific, [id]);
  if (foundredflag.rowCount !== 1) {
    return res.status(404).json({
      status: 404,
      error: 'Redflag not found'
    });
  }
  const { email } = jwt.verify(req.header('token'), process.env.KEY);
  const findadmin = await con.query(users.findUser, [email]);
  if (findadmin.rows[0].role !== 'admin') {
    return res.status(403).json({
      status: 403,
      error: 'You are not the Admin'
    });
  }
  next();
};
export default access;

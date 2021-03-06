/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
import jwt from 'jsonwebtoken';
import { users, userModel } from '../models/users';

const checkToken = (req, res, next) => {
  try {
    const takeToken = req.header('token');
    if (!takeToken) {
      return res.status(401).json({
        status: 401,
        error: 'No token found'
      });
    }
    const { email } = jwt.verify(req.header('token'), process.env.KEY);
    const findUser = users.find(user => user.email === email);
    if (!findUser) {
      return res.status(401).json({
        status: 401,
        error: 'Not authorized'
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: error.message
    });
  }
};
export default checkToken;

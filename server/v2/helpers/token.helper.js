/* eslint-disable node/no-unsupported-features/es-syntax */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const generateToken = email =>
  jwt.sign(
    {
      email: email
    },
    process.env.KEY
  );

export default generateToken;

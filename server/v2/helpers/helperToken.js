/* eslint-disable node/no-unsupported-features/es-syntax */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const generateToken = (email, role) =>
  jwt.sign(
    {
      role: role,
      email: email
    },
    process.env.KEY
  );

export default generateToken;

/* eslint-disable node/no-unsupported-features/es-syntax */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const decodeToken = token => {
  try {
    const { email } = jwt.verify(token, process.env.KEY);
    return email;
  } catch (error) {
    // eslint-disable-next-line no-undef
    return res.status(400).json({
      status: 400,
      error: error.message
    });
  }
};

export default decodeToken;

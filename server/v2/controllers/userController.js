/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
import bcrypt from 'bcryptjs';
import con from '../db/connection';
import users from '../models/users';
import tokengenerator from '../helpers/token.helper';

class userController {
  static async signup(req, res) {
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      username,
      password
    } = req.body;
    const passwd = bcrypt.hashSync(password, 10);
    const newUser = await con.query(users.insertUser, [
      firstname,
      lastname,
      email,
      phonenumber,
      username,
      passwd
    ]);
    const finduser = await con.query(users.findUser, [email]);
    if (newUser.rowCount === 1) {
      return res.status(201).json({
        status: 201,
        token: tokengenerator(email),
        message: 'User succesfully created',
        data: {
          firstname: finduser.rows[0].firstname,
          lastname: finduser.rows[0].lastname,
          email: finduser.rows[0].email,
          phonenumber: finduser.rows[0].phonenumber,
          username: finduser.rows[0].username
        }
      });
    }
    res.status(409).json({
      status: 409,
      error: 'User already exists'
    });
  }
}
export default userController;

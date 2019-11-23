/* eslint-disable node/no-unsupported-features/es-syntax */
import bcrypt from 'bcryptjs';
import users from '../models/users';
import tokengenerator from '../helpers/token.helper';

class userController {
  static signup(req, res) {
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      username,
      password
    } = req.body;
    const newUser = {
      id: users.length + 1,
      firstname,
      lastname,
      email,
      phonenumber,
      username,
      password: bcrypt.hashSync(password, 10)
    };
    const check = users.find(u => u.email === email);
    if (!check) {
      users.push(newUser);
      return res.status(201).json({
        status: 201,
        token: tokengenerator(email),
        message: 'User succesfully created',
        data: newUser
      });
    }
    return res.status(409).json({
      status: 409,
      error: 'User already exists'
    });
  }

  static signin(req, res) {
    const { email, password } = req.body;
    const findUser = users.find(u => u.email === email);
    if (!findUser) {
      return res.status(404).json({
        status: 404,
        error: 'User with provided email doesnt exist'
      });
    }
    if (bcrypt.compareSync(password, findUser.password)) {
      return res.status(200).json({
        status: 200,
        token: tokengenerator(email),
        message: 'User successfully logged in'
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Password is incorrect'
    });
  }
}
export default userController;

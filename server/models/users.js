/* eslint-disable node/no-unsupported-features/es-syntax */
import bcrypt from 'bcryptjs';

const users = [];

class userModel {
  static signup(req) {
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
      return true;
    }
    return false;
  }
}
export { users, userModel };

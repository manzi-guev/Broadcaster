'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable node/no-unsupported-features/es-syntax */


var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _connection = require('../db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _helperToken = require('../helpers/helperToken');

var _helperToken2 = _interopRequireDefault(_helperToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var userController = function () {
  function userController() {
    _classCallCheck(this, userController);
  }

  _createClass(userController, null, [{
    key: 'signup',
    value: async function signup(req, res) {
      var _req$body = req.body,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          email = _req$body.email,
          phonenumber = _req$body.phonenumber,
          username = _req$body.username,
          password = _req$body.password;

      var passwd = _bcryptjs2.default.hashSync(password, 10);
      var role = 'user';
      var newUser = await _connection2.default.query(_users2.default.insertUser, [firstname, lastname, email, phonenumber, username, passwd, role]);
      var finduser = await _connection2.default.query(_users2.default.findUser, [email]);
      var rolechecker = finduser.rows[0].role;
      if (newUser.rowCount === 1) {
        return res.status(201).json({
          status: 201,
          token: (0, _helperToken2.default)(email, rolechecker),
          message: 'User succesfully created',
          data: {
            firstname: finduser.rows[0].firstname,
            lastname: finduser.rows[0].lastname,
            email: finduser.rows[0].email,
            phonenumber: finduser.rows[0].phonenumber,
            username: finduser.rows[0].username,
            role: finduser.rows[0].role
          }
        });
      }
      return res.status(409).json({
        status: 409,
        error: 'User already exists'
      });
    }
  }, {
    key: 'signin',
    value: async function signin(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      var finduser = await _connection2.default.query(_users2.default.findUser, [email]);
      if (finduser.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'User with provided email doesnt exist'
        });
      }
      if (_bcryptjs2.default.compareSync(password, finduser.rows[0].password) || password === finduser.rows[0].password) {
        return res.status(200).json({
          status: 200,
          token: (0, _helperToken2.default)(email),
          message: 'User successfully logged in'
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'Password is incorrect'
      });
    }
  }]);

  return userController;
}();

exports.default = userController;
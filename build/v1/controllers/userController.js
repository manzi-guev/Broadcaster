'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable node/no-unsupported-features/es-syntax */


var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _users = require('../models/users');

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
    value: function signup(req, res) {
      var email = req.body.email;

      var check = _users.userModel.signup(req);
      if (check) {
        return res.status(201).json({
          status: 201,
          token: (0, _helperToken2.default)(email),
          message: 'User succesfully created',
          data: {
            id: _users.users[_users.users.length - 1].id,
            firstname: _users.users[_users.users.length - 1].firstname,
            lastname: _users.users[_users.users.length - 1].lastname,
            email: _users.users[_users.users.length - 1].email,
            phonenumber: _users.users[_users.users.length - 1].phonenumber,
            username: _users.users[_users.users.length - 1].username
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
    value: function signin(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;

      var findUser = _users.users.find(function (u) {
        return u.email === email;
      });
      if (!findUser) {
        return res.status(404).json({
          status: 404,
          error: 'User with provided email doesnt exist'
        });
      }
      if (_bcryptjs2.default.compareSync(password, findUser.password)) {
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
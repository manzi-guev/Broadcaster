'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userModel = exports.users = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable node/no-unsupported-features/es-syntax */


var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var users = [];

var userModel = function () {
  function userModel() {
    _classCallCheck(this, userModel);
  }

  _createClass(userModel, null, [{
    key: 'signup',
    value: function signup(req) {
      var _req$body = req.body,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          email = _req$body.email,
          phonenumber = _req$body.phonenumber,
          username = _req$body.username,
          password = _req$body.password;

      var newUser = {
        id: users.length + 1,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phonenumber: phonenumber,
        username: username,
        password: _bcryptjs2.default.hashSync(password, 10)
      };
      var check = users.find(function (u) {
        return u.email === email;
      });
      if (!check) {
        users.push(newUser);
        return true;
      }
      return false;
    }
  }]);

  return userModel;
}();

exports.users = users;
exports.userModel = userModel;
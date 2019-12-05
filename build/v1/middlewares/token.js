'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _users = require('../models/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
var checkToken = function checkToken(req, res, next) {
  try {
    var takeToken = req.header('token');
    if (!takeToken) {
      return res.status(401).json({
        status: 401,
        error: 'No token found'
      });
    }

    var _jwt$verify = _jsonwebtoken2.default.verify(req.header('token'), process.env.KEY),
        email = _jwt$verify.email;

    var findUser = _users.users.find(function (user) {
      return user.email === email;
    });
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
exports.default = checkToken;
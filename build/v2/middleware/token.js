'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _connection = require('../db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkToken = async function checkToken(req, res, next) {
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

    var findUser = await _connection2.default.query(_users2.default.findUser, [email]);
    if (findUser.rowCount === 0) {
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
  return null;
}; /* eslint-disable no-unused-vars */
/* eslint-disable node/no-unsupported-features/es-syntax */
exports.default = checkToken;
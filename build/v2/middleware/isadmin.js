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

var _redflags = require('../models/redflags');

var _redflags2 = _interopRequireDefault(_redflags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable node/no-unsupported-features/es-syntax */
var access = async function access(req, res, next) {
  var id = parseInt(req.params.id, 10);
  var foundredflag = await _connection2.default.query(_redflags2.default.findspecific, [id]);
  if (foundredflag.rowCount !== 1) {
    return res.status(404).json({
      status: 404,
      error: 'Redflag not found'
    });
  }

  var _jwt$verify = _jsonwebtoken2.default.verify(req.header('token'), process.env.KEY),
      email = _jwt$verify.email;

  var findadmin = await _connection2.default.query(_users2.default.findUser, [email]);
  if (findadmin.rows[0].role !== 'admin') {
    return res.status(403).json({
      status: 403,
      error: 'You are not the Admin'
    });
  }
  return next();
};
exports.default = access;
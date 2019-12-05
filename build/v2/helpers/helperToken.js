'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable node/no-unsupported-features/es-syntax */
_dotenv2.default.config();
var generateToken = function generateToken(email, role) {
  return _jsonwebtoken2.default.sign({
    role: role,
    email: email
  }, process.env.KEY);
};

exports.default = generateToken;
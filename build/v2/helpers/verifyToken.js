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
var decodeToken = function decodeToken(token) {
  try {
    var _jwt$verify = _jsonwebtoken2.default.verify(token, process.env.KEY),
        email = _jwt$verify.email;

    return email;
  } /* istanbul ignore catch */ catch (error) {
    // eslint-disable-next-line no-undef
    return res.status(400).json({
      status: 400,
      error: error.message
    });
  }
};

exports.default = decodeToken;
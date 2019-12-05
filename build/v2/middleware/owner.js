'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _verifyToken = require('../helpers/verifyToken');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

var _redflags = require('../models/redflags');

var _redflags2 = _interopRequireDefault(_redflags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var access = async function access(req, res, next) {
  var email = (0, _verifyToken2.default)(req.header('token'));
  var id = parseInt(req.params.id, 10);
  var foundredflag = await _connection2.default.query(_redflags2.default.findspecific, [id]);
  if (foundredflag.rowCount !== 1) {
    return res.status(404).json({
      status: 404,
      error: 'Redflag not found'
    });
  }
  var owner = await _connection2.default.query(_redflags2.default.findowner, [email]);
  if (!owner.rowCount) {
    return res.status(403).json({
      status: 403,
      error: 'You are not the owner'
    });
  }
  return next();
}; /* eslint-disable node/no-unsupported-features/es-syntax */
exports.default = access;
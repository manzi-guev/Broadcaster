'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _verifyToken = require('../helpers/verifyToken');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

var _redflags = require('../models/redflags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
var access = async function access(req, res, next) {
  var email = (0, _verifyToken2.default)(req.header('token'));
  var id = parseInt(req.params.id, 10);
  var foundredflag = _redflags.redflag.findRedFlag(id);
  if (!foundredflag) {
    return res.status(404).json({
      status: 404,
      error: 'Redflag not found'
    });
  }
  var owner = _redflags.redflags.find(function (flag) {
    return flag.createdBy === email;
  });
  if (!owner) {
    return res.status(403).json({
      status: 403,
      error: 'You are not the owner'
    });
  }
  next();
};

exports.default = access;
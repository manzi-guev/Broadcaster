'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editcomment = exports.editlocation = exports.createRedflag = exports.signIn = exports.signUp = undefined;

var _joi = require('@hapi/joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signUp = function signUp(req, res, next) {
  var schema = {
    firstname: _joi2.default.string().strict().trim().required(),
    lastname: _joi2.default.string().strict().trim().required(),
    email: _joi2.default.string().strict().trim().required().email(),
    phonenumber: _joi2.default.string().strict().required().trim(),
    username: _joi2.default.string().strict().required().trim(),
    password: _joi2.default.string().strict().required().trim()
  };
  var output = _joi2.default.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: '' + output.error.details[0].message
    });
  }
  req.user = schema;
  next();
}; /* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */

var signIn = function signIn(req, res, next) {
  var schema = {
    email: _joi2.default.string().trim().required().email(),
    password: _joi2.default.string().trim().required()
  };
  var output = _joi2.default.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: '' + output.error.details[0].message
    });
  }
  next();
};
var createRedflag = function createRedflag(req, res, next) {
  var schema = {
    title: _joi2.default.string().strict().trim().required(),
    comment: _joi2.default.string().strict().required().trim(),
    location: _joi2.default.string().required(),
    images: _joi2.default.string().trim().strict().required(),
    videos: _joi2.default.string().trim().strict().required()
  };
  var output = _joi2.default.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: '' + output.error.details[0].message
    });
  }
  next();
};
var editlocation = function editlocation(req, res, next) {
  var schema = {
    location: _joi2.default.string().trim().required()
  };
  var output = _joi2.default.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: '' + output.error.details[0].message
    });
  }
  next();
};
var editcomment = function editcomment(req, res, next) {
  var schema = {
    comment: _joi2.default.string().trim().required()
  };
  var output = _joi2.default.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: '' + output.error.details[0].message
    });
  }
  next();
};
exports.signUp = signUp;
exports.signIn = signIn;
exports.createRedflag = createRedflag;
exports.editlocation = editlocation;
exports.editcomment = editcomment;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editStatus = exports.editlocation = exports.editcomment = exports.createRedflag = exports.signUp = exports.signIn = undefined;

var _joi = require('@hapi/joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signUp = function signUp(req, res, next) {
  var schema = {
    firstname: _joi2.default.string().regex(/^[a-zA-Z]{3,20}/).strict().trim().required().error(new Error('First name must be letters only')),
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
      error: '' + output.error.message
    });
  }
  req.user = schema;
  return next();
}; /* eslint-disable node/no-unsupported-features/es-syntax */

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
  return next();
};
var createRedflag = function createRedflag(req, res, next) {
  var schema = {
    title: _joi2.default.string().strict().trim().required(),
    comment: _joi2.default.string().strict().required().trim(),
    location: _joi2.default.string().required(),
    images: _joi2.default.string().strict().trim().required(),
    videos: _joi2.default.string().strict().trim().required()
  };
  var output = _joi2.default.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: '' + output.error.details[0].message
    });
  }
  return next();
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
  return next();
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
  return next();
};
var editStatus = function editStatus(req, res, next) {
  var schema = {
    status: _joi2.default.string().trim().required()
  };
  var output = _joi2.default.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: '' + output.error.details[0].message
    });
  }
  return next();
};
exports.signIn = signIn;
exports.signUp = signUp;
exports.createRedflag = createRedflag;
exports.editcomment = editcomment;
exports.editlocation = editlocation;
exports.editStatus = editStatus;
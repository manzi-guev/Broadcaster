'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validation = require('../middlewares/validation');

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _redflagController = require('../controllers/redflagController');

var _redflagController2 = _interopRequireDefault(_redflagController);

var _token = require('../middlewares/token');

var _token2 = _interopRequireDefault(_token);

var _owner = require('../middlewares/owner');

var _owner2 = _interopRequireDefault(_owner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unsupported-features/es-syntax */
var route = (0, _express2.default)();
route.post('/api/v1/auth/signup', _validation.signUp, _userController2.default.signup);
route.post('/api/v1/auth/signin', _validation.signIn, _userController2.default.signin);
route.post('/api/v1/red-flags', _token2.default, _validation.createRedflag, _redflagController2.default.create);
route.get('/api/v1/red-flags', _redflagController2.default.viewredflags);
route.get('/api/v1/red-flags/:id', _redflagController2.default.viewSpecificflag);
route.delete('/api/v1/red-flags/:id', _token2.default, _owner2.default, _redflagController2.default.delete);
route.patch('/api/v1/red-flags/:id/location', _token2.default, _owner2.default, _validation.editlocation, _redflagController2.default.editLocation);
route.patch('/api/v1/red-flags/:id/comment', _token2.default, _owner2.default, _validation.editcomment, _redflagController2.default.editComment);

exports.default = route;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validation = require('../middleware/validation');

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _redflagController = require('../controllers/redflagController');

var _redflagController2 = _interopRequireDefault(_redflagController);

var _token = require('../middleware/token');

var _token2 = _interopRequireDefault(_token);

var _owner = require('../middleware/owner');

var _owner2 = _interopRequireDefault(_owner);

var _isadmin = require('../middleware/isadmin');

var _isadmin2 = _interopRequireDefault(_isadmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = (0, _express2.default)(); /* eslint-disable node/no-unsupported-features/es-syntax */


route.post('/api/v2/auth/signup', _validation.signUp, _userController2.default.signup);
route.post('/api/v2/auth/signin', _validation.signIn, _userController2.default.signin);
route.post('/api/v2/red-flags', _token2.default, _validation.createRedflag, _redflagController2.default.create);
route.get('/api/v2/red-flags', _redflagController2.default.viewredflags);
route.get('/api/v2/red-flags/:id', _redflagController2.default.viewSpecificflag);
route.delete('/api/v2/red-flags/:id', _token2.default, _owner2.default, _redflagController2.default.delete);
route.patch('/api/v2/red-flags/:id/location', _token2.default, _owner2.default, _validation.editlocation, _redflagController2.default.editLocation);
route.patch('/api/v2/red-flags/:id/comment', _token2.default, _owner2.default, _validation.editcomment, _redflagController2.default.editComment);
route.patch('/api/v2/red-flags/:id/status', _isadmin2.default, _validation.editStatus, _redflagController2.default.editStatus);

exports.default = route;
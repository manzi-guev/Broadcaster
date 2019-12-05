'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _routes = require('./v1/routes/routes');

var _routes2 = _interopRequireDefault(_routes);

var _routes3 = require('./v2/routes/routes');

var _routes4 = _interopRequireDefault(_routes3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); /* eslint-disable node/no-unsupported-features/es-syntax */

_dotenv2.default.config();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.use(_routes2.default);
app.use(_routes4.default);
app.get('/', function (req, res) {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Broadcaster'
  });
});

app.use('*', function (req, res) {
  res.status(404).json({
    status: 404,
    error: 'Route not found'
  });
});
var port = process.env.PORT;
app.listen(port, function () {
  console.log('Broadcaster server is running on port ' + port);
});
exports.default = app;
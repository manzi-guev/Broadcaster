'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

var _redflags = require('../models/redflags');

var _redflags2 = _interopRequireDefault(_redflags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable node/no-unsupported-features/es-syntax */
var create = async function create() {
  var createredflagTable = _redflags2.default.createRedflag;
  var tables = '' + createredflagTable;
  await _connection2.default.query(tables);
};
create();

exports.default = create;
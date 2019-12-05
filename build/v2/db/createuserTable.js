'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable node/no-unsupported-features/es-syntax */
var create = async function create() {
  var createUserTable = _users2.default.createUser;
  var insertadmin = _users2.default.insertAdmin;
  var tables = createUserTable + '; ' + insertadmin;
  await _connection2.default.query(tables);
};
create();

exports.default = create;
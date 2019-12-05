'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropTables = async function dropTables() {
  await _connection2.default.query('DROP TABLE redflags');
  await _connection2.default.query('delete from users');
}; /* eslint-disable node/no-unsupported-features/es-syntax */

dropTables();
exports.default = dropTables;
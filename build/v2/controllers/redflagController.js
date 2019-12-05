'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable consistent-return */


var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _verifyToken = require('../helpers/verifyToken');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

var _connection = require('../db/connection');

var _connection2 = _interopRequireDefault(_connection);

var _redflags = require('../models/redflags');

var _redflags2 = _interopRequireDefault(_redflags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var redflagController = function () {
  function redflagController() {
    _classCallCheck(this, redflagController);
  }

  _createClass(redflagController, null, [{
    key: 'create',
    value: async function create(req, res) {
      var _req$body = req.body,
          title = _req$body.title,
          comment = _req$body.comment,
          location = _req$body.location,
          images = _req$body.images,
          videos = _req$body.videos;

      var createdOn = (0, _moment2.default)().format('MMMM Do YYYY, h:mm:ss a');
      var createdBy = (0, _verifyToken2.default)(req.header('token'));
      var type = 'Redflag';
      var status = 'pending...';
      var newRedflag = await _connection2.default.query(_redflags2.default.insertRedflag, [createdOn, createdBy, title, type, comment, location, status, images, videos]);
      /* istanbul ignore else */
      if (newRedflag.rowCount === 1) {
        return res.status(201).json({
          status: 201,
          message: 'Redflag successfully created',
          data: newRedflag.rows[0]
        });
      }
    }
  }, {
    key: 'viewredflags',
    value: async function viewredflags(req, res) {
      var viewredflags = await _connection2.default.query(_redflags2.default.findredflags);
      /* istanbul ignore else */
      if (viewredflags.rowCount >= 1) {
        return res.status(200).json({
          status: 200,
          message: 'Success. List of all red-flags',
          data: viewredflags.rows
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Redflags not found'
      });
    }
  }, {
    key: 'viewSpecificflag',
    value: async function viewSpecificflag(req, res) {
      var id = parseInt(req.params.id, 10);
      var viewspecific = await _connection2.default.query(_redflags2.default.findspecific, [id]);
      /* istanbul ignore else */
      if (viewspecific.rowCount === 1) {
        return res.status(200).json({
          status: 200,
          data: viewspecific.rows
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Redflag not found'
      });
    }
  }, {
    key: 'delete',
    value: async function _delete(req, res) {
      var id = parseInt(req.params.id, 10);
      var viewspecific = await _connection2.default.query(_redflags2.default.deleteredflag, [id]);
      /* istanbul ignore else */
      if (viewspecific.rowCount === 1) {
        return res.status(200).json({
          status: 200,
          message: 'Redflag successfully deleted'
        });
      }
    }
  }, {
    key: 'editLocation',
    value: async function editLocation(req, res) {
      var location = req.body.location;

      var id = parseInt(req.params.id, 10);
      var viewspecific = await _connection2.default.query(_redflags2.default.updatelocation, [id, location]);
      /* istanbul ignore else */
      if (viewspecific.rowCount === 1) {
        return res.status(200).json({
          status: 200,
          message: 'Updated red-flag location',
          data: {
            id: id,
            location: location
          }
        });
      }
    }
  }, {
    key: 'editComment',
    value: async function editComment(req, res) {
      var comment = req.body.comment;

      var id = parseInt(req.params.id, 10);
      var viewspecific = await _connection2.default.query(_redflags2.default.updatecomment, [id, comment]);
      /* istanbul ignore else */
      if (viewspecific.rowCount === 1) {
        return res.status(200).json({
          status: 200,
          message: 'Updated red-flag comment',
          data: {
            id: id,
            comment: comment
          }
        });
      }
    }
  }, {
    key: 'editStatus',
    value: async function editStatus(req, res) {
      var status = req.body.status;

      var id = parseInt(req.params.id, 10);
      var viewspecific = await _connection2.default.query(_redflags2.default.updatestatus, [id, status]);
      /* istanbul ignore else */
      if (viewspecific.rowCount === 1) {
        return res.status(200).json({
          status: 200,
          message: 'Changed red-flag status',
          data: {
            id: id,
            status: status
          }
        });
      }
    }
  }]);

  return redflagController;
}();

exports.default = redflagController;
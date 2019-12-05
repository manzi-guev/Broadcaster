'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */


var _redflags = require('../models/redflags');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var redflagController = function () {
  function redflagController() {
    _classCallCheck(this, redflagController);
  }

  _createClass(redflagController, null, [{
    key: 'create',
    value: function create(req, res) {
      var newRedflag = _redflags.redflag.create(req);
      return res.status(201).json({
        status: 201,
        message: 'Redflag successfully created',
        data: newRedflag
      });
    }
  }, {
    key: 'viewredflags',
    value: function viewredflags(req, res) {
      var all = _redflags.redflags;
      if (all.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Redflags not found'
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Success. List of all red-flags',
        data: _redflags.redflags
      });
    }
  }, {
    key: 'viewSpecificflag',
    value: function viewSpecificflag(req, res) {
      var found = _redflags.redflag.findRedFlag(parseInt(req.params.id, 10));
      if (found) {
        return res.status(200).json({
          status: 200,
          data: found
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Redflag not found'
      });
    }
  }, {
    key: 'delete',
    value: function _delete(req, res) {
      _redflags.redflag.deleteRedFlag(parseInt(req.params.id, 10));
      /* istanbul ignore else */
      return res.status(200).json({
        status: 200,
        message: 'Redflag successfully deleted'
      });
    }
  }, {
    key: 'editComment',
    value: function editComment(req, res) {
      var updated = _redflags.redflag.commentRedflag(parseInt(req.params.id, 10), req.body.comment);
      return res.status(200).json({
        status: 200,
        message: 'Updated red-flag comment',
        data: {
          id: updated.id,
          comment: updated.comment
        }
      });
    }
  }, {
    key: 'editLocation',
    value: function editLocation(req, res) {
      var updated = _redflags.redflag.locationRedflag(parseInt(req.params.id, 10), req.body.location);
      return res.status(200).json({
        status: 200,
        message: 'Updated red-flag location',
        data: {
          id: updated.id,
          comment: updated.location
        }
      });
    }
  }]);

  return redflagController;
}();

exports.default = redflagController;
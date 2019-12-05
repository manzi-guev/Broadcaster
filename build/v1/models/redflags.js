'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redflag = exports.redflags = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable node/no-unsupported-features/es-syntax */


var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _verifyToken = require('../helpers/verifyToken');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var redflags = [];

var redflag = function () {
  function redflag() {
    _classCallCheck(this, redflag);
  }

  _createClass(redflag, null, [{
    key: 'create',
    value: function create(req) {
      var _req$body = req.body,
          title = _req$body.title,
          type = _req$body.type,
          comment = _req$body.comment,
          location = _req$body.location,
          status = _req$body.status,
          images = _req$body.images,
          videos = _req$body.videos;

      var id = void 0;
      if (redflags.length === 0) {
        id = 1;
      } else {
        id = redflags[redflags.length - 1].id + 1;
      }
      var newRedflag = {
        id: id,
        createdOn: (0, _moment2.default)().format('MMMM Do YYYY, h:mm:ss a'),
        createdBy: (0, _verifyToken2.default)(req.header('token')),
        title: title,
        type: type,
        comment: comment,
        location: location,
        status: status,
        images: images,
        videos: videos
      };
      redflags.push(newRedflag);
      return newRedflag;
    }
  }, {
    key: 'findRedFlag',
    value: function findRedFlag(id) {
      var found = redflags.find(function (flag) {
        return flag.id === id;
      });
      return found;
    }
  }, {
    key: 'deleteRedFlag',
    value: function deleteRedFlag(id) {
      var found = this.findRedFlag(id);
      redflags.splice(redflags.indexOf(found), 1);
    }
  }, {
    key: 'commentRedflag',
    value: function commentRedflag(id, comment) {
      var found = this.findRedFlag(id);
      found.comment = comment;
      return found;
    }
  }, {
    key: 'locationRedflag',
    value: function locationRedflag(id, location) {
      var found = this.findRedFlag(id);
      found.location = location;
      return found;
    }
  }]);

  return redflag;
}();

exports.redflags = redflags;
exports.redflag = redflag;
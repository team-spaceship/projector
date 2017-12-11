"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _syncController = require("../controllers/syncController");

var _syncController2 = _interopRequireDefault(_syncController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SyncRoutes = function () {
  function SyncRoutes() {
    _classCallCheck(this, SyncRoutes);
  }

  _createClass(SyncRoutes, null, [{
    key: "create",

    /**
    * Create the sync routes.
    */
    value: function create(router) {
      router.get('/v1/sync/start', _syncController2.default.sync);
    }
  }]);

  return SyncRoutes;
}();

exports.default = SyncRoutes;
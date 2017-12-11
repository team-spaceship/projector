"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _syncService = require("../services/syncService");

var _syncService2 = _interopRequireDefault(_syncService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var syncController = function () {
  function SyncController() {
    _classCallCheck(this, SyncController);
  }

  _createClass(SyncController, [{
    key: "sync",

    /**
    * Returns all orders
    *
    * @param req
    * @param res
    * @param next
    */
    value: function sync(req, res) {
      _syncService2.default.sync().then(function (result) {
        res.json(result);
      }, function () {
        res.status(500).send({ messsage: "Something went wrong" });
      });
    }
  }]);

  return SyncController;
}();

exports.default = new syncController();
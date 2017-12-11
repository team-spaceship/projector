'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactNodeRender = require('react-node-render');

var _reactNodeRender2 = _interopRequireDefault(_reactNodeRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var appController = function () {
  function AppController() {
    _classCallCheck(this, AppController);
  }

  _createClass(AppController, [{
    key: 'renderSelectedApp',

    /**
    * Returns all apps
    *
    * @param req
    * @param res
    * @param next
    */
    value: function renderSelectedApp(req, res) {
      // Search for apps with the corresponding name.
      if (req.query.name) {
        var html = (0, _reactNodeRender2.default)('../../apps/' + req.query.name);
        console.log(html);
        res.json({ html: html });
      } else {
        res.status(403).send({ messsage: "App not found." });
      }
    }
  }]);

  return AppController;
}();

exports.default = new appController();
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var appService = function () {
  function AppService() {
    _classCallCheck(this, AppService);
  }

  _createClass(AppService, [{
    key: 'renderApp',
    value: function renderApp(req, res) {
      var locationJSFile = _path2.default.join(__dirname, '../../apps/' + req.params.name + '/index.js');
      var locationJSXFile = _path2.default.join(__dirname, '../../apps/' + req.params.name + '/index.jsx');

      if (_fs2.default.existsSync(locationJSFile) || locationJSXFile) {
        // Do something
        console.log('Directory exists');
        return res.render(req.params.name + '/index', {});
      } else {
        return res.json({ status: 403, message: 'App not found' });
      }
    }
  }]);

  return AppService;
}();

exports.default = new appService();
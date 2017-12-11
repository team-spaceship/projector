'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebsocketServer = function () {
  function WebsocketServer() {
    _classCallCheck(this, WebsocketServer);
  }

  _createClass(WebsocketServer, null, [{
    key: 'create',

    /**
    * Create the order routes.
    */
    value: function create(io) {
      io.sockets.on('connection', function (socket) {
        console.log('Connection! Socket ID: ' + socket.id);
      });
    }
  }]);

  return WebsocketServer;
}();

exports.default = WebsocketServer;
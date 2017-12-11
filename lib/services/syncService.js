'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _admZip = require('adm-zip');

var _admZip2 = _interopRequireDefault(_admZip);

var _App = require('../schemas/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var syncService = function () {
  function SyncService() {
    _classCallCheck(this, SyncService);
  }

  _createClass(SyncService, [{
    key: 'sync',

    /**
    * Returns all orders
    *
    * @returns [{orders}]
    */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var apps, local_apps, server_apps;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                apps = [];
                _context.next = 3;
                return this.getLocalApps();

              case 3:
                local_apps = _context.sent;
                _context.next = 6;
                return this.getAppsFromServer();

              case 6:
                server_apps = _context.sent;


                // When local_apps is empty insert a: 'none' string so syncing can continue
                if (!local_apps.length) {
                  local_apps.push('none');
                }

                // Fill app array with all apps
                server_apps.forEach(function (app) {
                  apps.push(app);
                });

                // Compare local & server apps
                local_apps.forEach(function (local_app) {
                  server_apps.forEach(function (server_app) {
                    var app_name = _this.convertAppName(server_app.name);

                    // Remove match from update array
                    if (app_name === local_app) {
                      apps.splice(apps.indexOf(server_app), 1);
                    }
                  });
                });

                // Loop trough all apps and download the ones not installed
                apps.forEach(function (app) {
                  _this.download(app);
                });

                return _context.abrupt('return', apps);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sync() {
        return _ref.apply(this, arguments);
      }

      return sync;
    }()
  }, {
    key: 'download',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(app) {
        var _this2 = this;

        var path_to_remote_zip, local_zip, app_folder;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log("downloading... " + app.name);

                path_to_remote_zip = process.env.APP_STORE_DOWNLOAD_PATH + '/' + this.convertAppName(app.name) + '.zip';
                local_zip = './apps/tmp/' + this.convertAppName(app.name) + '.zip';
                app_folder = './apps/';

                // Download app ZIP from App Store

                (0, _request2.default)(path_to_remote_zip).pipe(fs.createWriteStream(local_zip)).on('close', function () {
                  _this2.unzipApp(app, local_zip, app_folder);
                });

                // this.unzipApp(app, local_zip, app_folder);
                return _context2.abrupt('return', app);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function download(_x) {
        return _ref2.apply(this, arguments);
      }

      return download;
    }()
  }, {
    key: 'unzipApp',
    value: function unzipApp(app, local_zip, app_folder) {
      try {
        var zip = new _admZip2.default(local_zip);
        var zipEntries = zip.getEntries();

        // Read what's inside the ZIP
        zipEntries.forEach(function (zipEntry) {
          if (zipEntry.name !== app.name + '.zip') {
            throw new Error("App name does not match");
          }

          if (zipEntries.isDirectory === false) {
            throw new Error("ZIP is not a directory");
          }
        });

        // Extract ZIP to app folder
        zip.extractAllTo('' + app_folder, true);
      } catch (e) {
        console.log('error while syncing: ' + e);
      }
    }
  }, {
    key: 'getLocalApps',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var local_apps;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                local_apps = [];
                _context3.next = 3;
                return fs.readdir("./apps", function (err, files) {
                  if (err) {
                    console.log(err);
                    return;
                  }

                  files.forEach(function (file) {
                    local_apps.push(file);
                  });
                });

              case 3:
                return _context3.abrupt('return', local_apps);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getLocalApps() {
        return _ref3.apply(this, arguments);
      }

      return getLocalApps;
    }()
  }, {
    key: 'getAppsFromServer',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var apps;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _App2.default.find().exec();

              case 2:
                apps = _context4.sent;

                if (apps) {
                  _context4.next = 6;
                  break;
                }

                console.log("404 apps not found :(");
                return _context4.abrupt('return', false);

              case 6:
                return _context4.abrupt('return', apps);

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getAppsFromServer() {
        return _ref4.apply(this, arguments);
      }

      return getAppsFromServer;
    }()
  }, {
    key: 'convertAppName',
    value: function convertAppName(app_name) {
      return app_name.split(' ').join('-');
    }
  }]);

  return SyncService;
}();

exports.default = new syncService();
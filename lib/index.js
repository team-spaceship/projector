'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _syncService = require('./services/syncService');

var _syncService2 = _interopRequireDefault(_syncService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = Promise;

if (!process.env.MONGODB_URI) {
  console.error('No MONGODB_URI found.');
  process.exit(1);
}
if (!process.env.PORT) {
  console.error('No PORT found.');
  process.exit(1);
}

_mongoose2.default.connect(process.env.MONGODB_URI, { useMongoClient: true }).then(function () {
  console.log('CONNECTED TO DB.');
  _server2.default.listen(process.env.PORT, function () {
    return 'SERVER STARTED.';
  });
});

_syncService2.default.sync();
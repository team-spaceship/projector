'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VersionSchema = new _mongoose2.default.Schema({
  version: String,
  path: String,
  app: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'App', required: true }
}, {
  timestamps: true
});

_mongoose2.default.model('Version', VersionSchema);

exports.default = _mongoose2.default.model('Version', VersionSchema);
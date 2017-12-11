'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppSchema = new _mongoose2.default.Schema({
  name: String,
  description: String,
  app_icon: String,
  app_banner: String,
  min_os_version: String,
  version: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Version', required: true },
  // Foreign Keys: One to Many
  appDownloads: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'InstalledApp', required: false }],
  appRatings: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'AppRating', required: false }],
  publishReviews: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'PublishReview', required: false }],
  appCategory: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'AppCategory', required: false }]
}, {
  timestamps: true
});

_mongoose2.default.model('App', AppSchema);

exports.default = _mongoose2.default.model('App', AppSchema);
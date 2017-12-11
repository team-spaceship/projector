'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _appRoutes = require('./routes/appRoutes');

var _appRoutes2 = _interopRequireDefault(_appRoutes);

var _syncRoutes = require('./routes/syncRoutes');

var _syncRoutes2 = _interopRequireDefault(_syncRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);

var app = (0, _express2.default)();

app.set('trust proxy');

app.use((0, _morgan2.default)("dev"));

app.use((0, _expressSession2.default)({
  secret: 'aisdfoyasudbv;aosdn',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: _mongoose2.default.connection })
}));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cors2.default)());

_appRoutes2.default.create(app);
_syncRoutes2.default.create(app);

app.use('/installed-apps', _express2.default.static(__dirname + '../apps'));

// All remaining requests return the React app, so it can handle routing.
app.use(_express2.default.static(__dirname + '/../react-ui/build'));

app.get('*', function (request, response) {
  response.sendFile(__dirname + '/../react-ui/build/index.html');
});

exports.default = app;
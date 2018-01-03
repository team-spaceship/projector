import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import passport from './middleware/passport';
import SyncRoutes from "./routes/syncRoutes";
import SettingRoutes from "./routes/settingRoutes";
import WebsocketServer from './websocket-server';

const MongoStore = connectMongo(session);
const app = express();

const serv = require('http').Server(app);
const io = require('socket.io')(serv, {});

app.set('trust proxy');

app.use(logger("dev"));

app.use(session({
  secret: 'aisdfoyasudbv;aosdn',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://raspberrypi.local:3002',
  'projector-app-store.herokuapp.com',
];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    console.log('Request origin:', origin);
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

SyncRoutes.create(app);
SettingRoutes.create(app);

// Create Websocket Server.
serv.listen(process.env.WEBSOCKET_PORT);
WebsocketServer.create(io);

// enable cors
app.use(cors(corsOptions));
app.options('*', cors());

app.use(passport);

// All remaining requests return the React app, so it can handle routing.

app.use(express.static(path.join(__dirname, '/../react-ui/build')));

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '/../react-ui/build/index.html'));
});

export default app;

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import passport from './middleware/passport';
import SyncRoutes from "./routes/syncRoutes";

const MongoStore = connectMongo(session);

const app = express();

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

// enable cors
app.use(cors(corsOptions));
app.options('*', cors());

app.use(passport);

SyncRoutes.create(app);

app.use(express.static(__dirname + '/../react-ui/build'));

app.get('*', (request, response) => {
  response.sendFile(__dirname + '/../react-ui/build/index.html');
});

export default app;

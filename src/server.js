import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

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
app.use(cors());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// app.use(express.static(__dirname + '../react-ui/public'));
// app.set('view engine', 'html');
// app.get('/', (request, response) => {
//   response.render('../react-ui/public/index');
// });

SyncRoutes.create(app);

export default app;

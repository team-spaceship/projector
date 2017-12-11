import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import reactViews from 'express-react-views';
import AppRoutes from "./routes/appRoutes";
import SyncRoutes from "./routes/syncRoutes";


const MongoStore = connectMongo(session);

const app = express();

// express-react-views
app.set('views', path.join(__dirname, '../apps'));
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());

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

AppRoutes.create(app);
SyncRoutes.create(app);

// All remaining requests return the React app, so it can handle routing.
app.use(express.static(__dirname + '/../react-ui/build'));

app.get('*', (request, response) => {
  response.sendFile(__dirname + '/../react-ui/build/index.html');
});

export default app;

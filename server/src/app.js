import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import config from '../config';
import initDatabase from './database';
import routes from './routes';

initDatabase();

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

// launch our server
app.listen(config.port, () => console.log(`Listening on port: ${config.port}`));

export default app;

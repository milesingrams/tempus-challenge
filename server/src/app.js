import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import config from '../config';
import initDatabase from './database';
import routes from './routes';

initDatabase();

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('combined'));
app.use('/api/v1', routes);

// launch our server
app.listen(config.port, () => console.log(`Listening on port: ${config.port}`));

export default app;

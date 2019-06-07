import mongoose from 'mongoose';
import config from '../config';

export default function () {
  // connects to the database
  mongoose.connect(config.mongo.uri, config.mongo.options);

  // checks if connection with the database is successful
  mongoose.connection.once('open', () => console.log('connected to the database'));

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
  })
}

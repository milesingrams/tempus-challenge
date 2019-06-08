import path from 'path';

// BASE CONFIG
let baseConfig = {
  port: 3001, // Server port
  // Would be a unique hash for a real app
  session: {
    name: 'session-name',
    secret: 'session-secret'
  }
}

let envConfigs = {
  // DEVELOPMENT CONFIG
  development: {
    clientRootPath: path.resolve(__dirname, '../../client/dist'),

    // MongoDB connection options
    mongo: {
      uri: 'mongodb+srv://testAtlasUser:testAtlasUserPassword@cluster0-ppgqd.mongodb.net/test?retryWrites=true&w=majority',
      options: {
        useNewUrlParser: true,
        useCreateIndex: true
      }
    }
  },

  // PRODUCTION CONFIG
  production: {
    clientRootPath: path.resolve(__dirname, '../../client/dist'),

    // MongoDB connection options... in a real app would be different for production
    mongo: {
      uri: 'mongodb+srv://testAtlasUser:testAtlasUserPassword@cluster0-ppgqd.mongodb.net/test?retryWrites=true&w=majority',
      options: {
        useNewUrlParser: true,
        useCreateIndex: true
      }
    }
  }
}

// Export the config object based on the NODE_ENV
export default Object.assign({}, baseConfig, envConfigs[process.env.NODE_ENV])

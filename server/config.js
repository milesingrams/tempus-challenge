import path from 'path';

// BASE CONFIG
let baseConfig = {
  port: 3001 // Server port
}

let envConfigs = {
  // DEVELOPMENT CONFIG
  development: {
    clientRootPath: path.resolve(__dirname, '../../client/dist'),

    // MongoDB connection options
    mongo: {
      uri: 'mongodb://localhost:27017/yaherd',
      options: { useNewUrlParser: true }
    }
  },

  // PRODUCTION CONFIG
  production: {
    clientRootPath: path.resolve(__dirname, '../../client/dist'),

    // MongoDB connection options
    mongo: {
      uri: 'mongodb://localhost:27017/yaherd',
      options: { useNewUrlParser: true }
    }
  }
}

// Export the config object based on the NODE_ENV
export default Object.assign({}, baseConfig, envConfigs[process.env.NODE_ENV])

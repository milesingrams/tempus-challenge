// Production specific configuration

module.exports = {
  clientRootPath: path.resolve(__dirname, '../../client/dist'),

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost:27017/yaherd',
    options: { useNewUrlParser: true }
  }
}

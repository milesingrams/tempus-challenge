import path from 'path';

var baseConfig = {
  port: 3001 // Server port
}

// Export the config object based on the NODE_ENV
export default Object.assign({},
  baseConfig,
  require(`./${process.env.NODE_ENV}.js`)
)

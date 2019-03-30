const path = require('path');
const dbPath = path.resolve('src/db')

const config = {}

const envs = ['development', 'test', 'production']
envs.forEach(function(env) {
  config[env] = {
    'storage': path.resolve(dbPath, `database_${env}.sqlite`),
    'dialect': 'sqlite'
  }
})

module.exports = config

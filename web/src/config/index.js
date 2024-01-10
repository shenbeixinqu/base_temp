const theme = require('./theme.config')
const config = require('./setting.config')

module.exports = {
  ...config,
  ...theme
}
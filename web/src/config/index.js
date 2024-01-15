const cli = require("./cli.config");
const setting = require("./setting.config");
const net = require("./net.config");
const theme = require("./theme.config");

module.exports = {
  ...cli,
  ...setting,
  ...net,
  ...theme,
};

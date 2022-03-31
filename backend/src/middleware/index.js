const expressValidator = require('./express-validator');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.use(expressValidator());
};

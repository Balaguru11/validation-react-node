module.exports = () => {
  return function expressValidator(req, res, next) {
    next();
  };
};

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { check, validationResult } = require("express-validator");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    // const { data } = context;
    // const validateUserData = [
    //   check("first_name")
    //     .trim()
    //     .not()
    //     .isEmpty()
    //     .isLength({ min: 3 })
    //     .withMessage("First Name should be at least 3 characters in length"),
    //     check("last_name")
    //       .trim()
    //       .not()
    //       .isEmpty()
    //       .isLength({ min: 3 })
    //       .withMessage("Last name should be at least 3 chars in length."),
    // ], (req, res, next) => {
    //   const errors = validationResult(data);
    //   if (!errors.isEmpty()) {
    //     console.log(errors);
    //   }

    // }
    return context;
  };
};

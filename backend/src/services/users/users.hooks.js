const { authenticate } = require("@feathersjs/authentication").hooks;
const validator = require("validator");

const { hashPassword, protect } =
  require("@feathersjs/authentication-local").hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [
      hashPassword("password"),
      async (context) => {
        let input = context.data;
        // console.log(input);
        //const userService = app.service('users');

        if (validator.isEmpty(input.first_name)) {
          throw new Error("Please Enter Your Name");
        }
        if (!validator.isDate(input.dob, new Date())) {
          throw new Error("Please Enter valid Date");
        }
        if (validator.isEmpty(input.email) || !validator.isEmail(input.email)) {
          throw new Error("Please Enter valid Email ID");
        }
        // else if (!validator.isEmail(input.email)) {
        //   throw new Error("Please Enter Valid Email ID");
        // }
        if (
          !validator.isStrongPassword(input.password, {
            minLength: 8,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: true,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10,
          })
        ) {
          throw new Error(
            "Password Should Contain 8 Characters , 1 Uppercase , 1 Special Character"
          );
        }

        await context.service
          .find({
            query: {
              email: input.email,
            },
          })
          .then((result) => {
            if (result.data.length) {
              throw new Error("This Email ID Is Already Present.");
            }
          });
      },
    ],
    update: [hashPassword("password"), authenticate("jwt")],
    patch: [hashPassword("password"), authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password"),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

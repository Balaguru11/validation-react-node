const { authenticate } = require("@feathersjs/authentication").hooks;
<<<<<<< HEAD
=======
const validator = require("validator");
>>>>>>> cd7d3264d8628e7bb769e1ed3307118356323652

const { hashPassword, protect } =
  require("@feathersjs/authentication-local").hooks;

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
<<<<<<< HEAD
    create: [hashPassword("password")],
=======
    create: [
      hashPassword("password"),
      async (context) => {
        let input = context.data;
        //const userService = app.service('users');

        if (validator.isEmpty(input.first_name)) {
          throw new Error("Please Enter Your Name");
        }
        if (validator.isEmpty(input.emailid)) {
          throw new Error("Please Enter Your Email ID");
        } else if (!validator.isEmail(input.emailid)) {
          throw new Error("Please Enter Valid Email ID");
        }
        if (validator.isEmpty(input.password)) {
          throw new Error("Please Enter Password");
        }

        await context.service
          .find({
            query: {
              emailid: input.emailid,
            },
          })
          .then((data) => {
            if (data.data.length) {
              throw new Error("This Email ID Is Already Present.");
            }
          });
      },
    ],
>>>>>>> cd7d3264d8628e7bb769e1ed3307118356323652
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

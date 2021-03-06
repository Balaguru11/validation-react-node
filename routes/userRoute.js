const express = require("express");
// const app = express();
const { check, validationResult } = require("express-validator");

const userRoute = express.Router();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const db = require("../config/db");

const user = require("../model/userModel");
// const user = mongoose.model("data", {
//   first_name: String,
//   last_nae: String,
//   dob: Date,
//   emailid: String,
//   password: String,
// });

userRoute.post(
  "/signup",
  [
    check("first_name", "First Name Should Be More Than 3 Characters")
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
    check("last_name", "Last Name Should Be More Than 3 Characters")
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
    check("dob", "Invalid Date").not().isEmpty().isDate(),
    check("emailid", "Your email is not valid").not().isEmpty().isEmail(),
    check("password", "Password Must Contain 8 Characters & Special Characters")
      .isLength({ min: 8 })
      .not()
      .isLowercase()
      .not()
      .isUppercase()
      .not()
      .isNumeric()
      .not()
      .isAlpha(),
  ],
  async (req, res) => {
    try {
      const { first_name, last_name, dob, emailid, password } = req.body;

      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.json({ status: "validation", errors: error.array() });
      }

      //   const hashedpassword = bcrypt.hashSync(password, 12);
      const oldUser = await user.findOne({
        emailid: emailid,
      });
      if (oldUser) {
        return res.json({
          status: "fail",
          msg: "User Already Created With This Mail ID",
        });
      } else {
        const hashedpassword = bcrypt.hashSync(password, 12);
        const users = await user.create({
          first_name,
          last_name,
          dob,
          emailid,
          password: hashedpassword,
        });

        users.save(function (err) {
          if (err) {
            console.log(err);
            return res.json({ status: "fail", err });
          } else {
            return res.json({ status: "success", msg: "User Created" });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
);
module.exports = userRoute;

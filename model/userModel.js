const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  dob: { type: Date, required: true },
  emailid: { type: String, required: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  deletedAt: { type: String, default: null },
});

userSchema.set("timestamps", true);

module.exports = mongoose.model("user", userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Static Signup
Schema.statics.signup = async function(email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields much be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is no valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password no strong enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  const newUser = await this.create({ email, password: hashPass });
  return newUser;
};

// Static Login
Schema.statics.signin = async function(email, password) {
  if (!email || !password) {
    throw Error("All fields much be filled");
  }
  const existUser = await this.findOne({ email });

  if (!existUser) {
    throw Error("Incorrect Email");
  }

  const matchPasssword = await bcrypt.compare(password, existUser.password);
  if (!matchPasssword) {
    throw Error("Incorrect Password");
  }

  return existUser;
};

module.exports = mongoose.model("User", Schema);

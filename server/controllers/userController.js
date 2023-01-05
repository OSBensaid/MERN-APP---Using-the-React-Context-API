const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Token User
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.signin(email, password);
    const token = createToken(existUser._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup User
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await User.signup(email, password);
    const token = createToken(newUser._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };

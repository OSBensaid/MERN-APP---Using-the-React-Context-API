const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

// User Login
router.post("/login", loginUser);

// User Signup
router.post("/signup", signupUser);

module.exports = router;

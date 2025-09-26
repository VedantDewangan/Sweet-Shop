const express = require("express");
const {
  Register,
  Login,
  Logout,
  getMe,
} = require("../controller/AuthController");
const { isLogin } = require("../utils/isLogin");
const AuthRoute = express.Router();

AuthRoute.post("/register", Register);
AuthRoute.post("/login", Login);
AuthRoute.post("/logout", isLogin, Logout);
AuthRoute.get("/getMe", isLogin, getMe);

module.exports = { AuthRoute };

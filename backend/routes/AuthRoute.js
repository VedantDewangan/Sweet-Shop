import express from "express";
import {
  Register,
  Login,
  Logout,
  getMe,
} from "../controller/AuthController.js";
import { isLogin } from "../utils/isLogin.js";

const AuthRoute = express.Router();

AuthRoute.post("/register", Register);
AuthRoute.post("/login", Login);
AuthRoute.post("/logout", isLogin, Logout);
AuthRoute.get("/getMe", isLogin, getMe);

export { AuthRoute };

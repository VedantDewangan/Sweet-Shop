import { User } from "../database/model/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const Register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(404).json({
        message: "Please fill all the credentials",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password length atleast 8 characters",
      });
    }

    const user = await User.find({
      email: email,
    });

    if (user.length >= 1) {
      return res.status(400).json({
        message: "This email already exist",
      });
    }

    const hashed_password = await bcryptjs.hash(password, 12);

    const new_user = await User.create({
      email: email,
      password: hashed_password,
      name: name,
    });

    res.status(201).json({
      message: "Your Account is created Successfully",
      user: new_user,
    });
  } catch (error) {
    console.log("Error in register : ", error);
    res.status(501).json({
      message: "Internal Server Error",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide both email and password",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        message: "User with this email not found",
      });
    }

    const samePassword = await bcryptjs.compare(password, user.password);

    if (!samePassword) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: user,
    });
  } catch (error) {
    console.log("Error during login: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const Logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout : ", error);
    res.status(501).json({
      message: "Internal Server Error",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.find({
      _id: id,
    }).select("-password");
    res.status(200).json({
      userInfo: user[0],
    });
  } catch (error) {
    console.log("Error in getMe : ", error);
    res.status(501).json({
      message: "Internal Server Error",
    });
  }
};

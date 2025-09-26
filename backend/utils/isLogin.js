import jwt from "jsonwebtoken";
import { User } from "../database/model/UserModel.js";

export const isLogin = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("isLogin error:", error);
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};

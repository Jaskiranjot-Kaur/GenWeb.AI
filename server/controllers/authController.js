import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const googleAuth = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    const isProduction = process.env.NODE_ENV === "production";
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, avatar });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (in ms)
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: `Google authentication error ${error}`,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({
      message: `Logout error ${error}`,
    });
  }
};

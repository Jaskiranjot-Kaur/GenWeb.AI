import jwt from "jsonwebtoken";
import User from "../models/user.js";
//agr token h cookies mein then user stays logged in warna dobara se login krne ko bolo
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("isAuth error:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

//koi v request server tk jane se pehle middleware se ho k jati h jb middleware next to call krega tbhi middleware request ko server tk jane dega
export default isAuth;

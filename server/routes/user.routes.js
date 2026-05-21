import express from "express";
import { getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middleware/isAuth.js";
import { generateDemo } from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.get("/me", isAuth, getCurrentUser); //request backend pe jaane se pehle middleware pe jaye
export default userRouter;

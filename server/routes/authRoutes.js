import express from "express";
import { googleAuth, logout } from "../controllers/authController.js";
import isAuth from "../middleware/isAuth.js";

const authRouter = express.Router();

authRouter.post("/google", googleAuth);
authRouter.get("/logout", logout);
//http:localhost:5000/api/auth/google

export default authRouter;

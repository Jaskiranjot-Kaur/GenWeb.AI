import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "./config/db.js";
dotenv.config();
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import websiteRouter from "./routes/websiteRoutes.js";

const app = express(); //to use all methods of express (app is an instance of express)
const port = process.env.PORT || 5000; //iss port pe chlega

//middleware
app.set("trust proxy", 1);
app.use(express.json()); // to parse json data from request body
app.use(cookieParser());
app.use(
  cors({
    origin: "https://ai-website-builder-khaki-iota.vercel.app",
    credentials: true, //token not found wale error na aaye
    //http://localhost:3000 se request aayegi toh allow karna hai, aur credentials true isliye ki token cookie me store hoga
  }),
);
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true, //token not found wale error na aaye
//   }),
// );

// app.use(cors());

app.get("/health", (req, res) => {
  return res.status(200).json({ success: true, message: "okay" });
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/website", websiteRouter);

app.listen(port, () => {
  console.log("server started");
  connectDB();
});

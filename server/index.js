import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "./config/db.js";
dotenv.config();
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express(); //to use all methods of express (app is an instance of express)
const port = process.env.PORT || 5000; //iss port pe chlega

//middleware
app.use(express.json()); // to parse json data from request body
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //token not found wale error na aaye
    //http://localhost:3000 se request aayegi toh allow karna hai, aur credentials true isliye ki token cookie me store hoga
  })
);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/website", websiteRouter);

app.listen(port, () => {
  console.log("server started");
  connectDB();
});

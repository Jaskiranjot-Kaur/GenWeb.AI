import express from "express"
import isAuth from "../middleware/isAuth.js"

const websiteRouter = express.Router();

websiteRouter.post("/generate", isAuth, generateWebsite)

export default websiteRouter;
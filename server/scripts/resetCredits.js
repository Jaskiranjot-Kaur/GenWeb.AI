import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/user.js";

dotenv.config();

const resetCredits = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const result = await User.updateMany({}, { $set: { credits: 100 } });
    console.log(`Updated ${result.modifiedCount} users to 100 credits`);
  } catch (error) {
    console.error("Failed to reset credits:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

// resetCredits();

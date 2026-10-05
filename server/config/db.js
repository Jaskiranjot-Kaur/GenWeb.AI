import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    // Drop old index aur recreate new one
    try {
      await mongoose.connection.collection("websites").dropIndex("slug_1");
      console.log("Old index dropped");
    } catch (err) {
      // Index already doesn't exist
    }
  } catch (error) {
    console.log("MongoDB connection failed\n", error);
  }
};

export default connectDB;

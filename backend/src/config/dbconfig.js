import { connect } from "mongoose";

export default async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MongoDB URI is required!");
    }

    await connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
}
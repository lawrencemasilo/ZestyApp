const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("MongoDB connection string is missing in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true, // Keep this to handle parsing
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
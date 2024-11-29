const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb+srv://neolawrencemasilo:7YRs4NYHOvo7GhMF@cluster0.l9diw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

  if (!uri) {
    console.error("MongoDB connection string is missing in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
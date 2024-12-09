const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.config");
const authRoutes = require("./routes/authRoutes");
const emailRoutes = require('./routes/emailRoutes');
const smeRoutes = require("./routes/smeRoutes");
const creditRoutes = require("./routes/creditRoutes");
const bnplRoutes = require("./routes/bnplRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const repaymentRoutes = require("./routes/repaymentRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/email', emailRoutes);
app.use("/api/sme", smeRoutes);
app.use("/api/credit", creditRoutes);
app.use("/api/bnpl", bnplRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/verify", verificationRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/repayments", repaymentRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
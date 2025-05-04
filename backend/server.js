const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Apply CORS (allow all origins – development-friendly)
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start server
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

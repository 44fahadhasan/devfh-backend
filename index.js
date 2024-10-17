const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => res.send("DEVFH Backend Running"));

// Not found handler (404)
app.use(notFoundHandler);

// Default common error handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

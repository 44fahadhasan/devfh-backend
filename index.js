const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

// Init express app
const app = express();

// Init server port number
const PORT = process.env.PORT || 5000;

// Request parsers
// Parsing for application/json
app.use(express.json());

// Parsing for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Define cors options
const corsOptions = {
  origin: ["https://44fahadhasan.netlify.app", "http://localhost:5173"], // Allowed origins
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies or credentials to be sent
};

// Enable cors with options
app.use(cors(corsOptions));

// Use cookie-parser with a secret key for signed cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => res.send("DEV.FH Server Running"));

// Not found handler (404)
app.use(notFoundHandler);

// Default common error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

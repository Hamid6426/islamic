const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes");
const imageRoutes = require("./routes/imageRoutes");
const shareRoutes = require("./routes/shareRoutes");
const verifyAdmin = require("./controllers/admin/verifyAdmin");
const db = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

// Connect to database (Ensure this doesn't crash the server)
db().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1); // Exit the app if DB connection fails
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (_req, res) => {
  res.send("Hello! This is our backend");
});

app.get("/verify-admin", verifyAdmin);

app.use("/api/admins", adminRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/shares", shareRoutes);

module.exports = app;

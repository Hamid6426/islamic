const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db");
const verifyAdmin = require("./controllers/admin/verifyAdmin");
const adminRouter = require("./routes/adminRouter");
const imageRouter = require("./routes/imageRouter");
const userRouter = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Connect to database
db().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});

const frontendURL = process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "http://localhost:5173";

// Middleware
app.use(cors({ 
  origin: frontendURL, 
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (_req, res) => {
  res.send("Hello! This is our backend");
});

app.get("/verify-admin", verifyAdmin);
app.use("/api/admins", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);

module.exports = app;

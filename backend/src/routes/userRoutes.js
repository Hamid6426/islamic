const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const registerUser = require("../controllers/user/registerUser");
const loginUser = require("../controllers/user/loginUser");
const logoutUser = require("../controllers/user/logoutUser");
const getUserProfile = require("../controllers/user/getUserProfile");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", authMiddleware(["user"]), logoutUser);
userRouter.get("/profile", getUserProfile);

module.exports = userRouter;
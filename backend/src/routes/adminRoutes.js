const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const registerAdmin = require("../controllers/admin/registerAdmin");
const loginAdmin = require("../controllers/admin/loginAdmin");
const logoutAdmin = require("../controllers/admin/logoutAdmin");
const getAdminById = require("../controllers/admin/getAdminById");
const getAllAdmins = require("../controllers/admin/getAllAdmins");

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", authMiddleware, logoutAdmin);
adminRouter.get("/", authMiddleware, getAllAdmins);
adminRouter.get("/id/:id", authMiddleware, getAdminById);

module.exports = adminRouter;
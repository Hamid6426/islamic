const express = require("express");
const adminMiddleware = require("../middlewares/adminMiddleware");
const registerAdmin = require("../controllers/admin/registerAdmin");
const loginAdmin = require("../controllers/admin/loginAdmin");
const logoutAdmin = require("../controllers/admin/logoutAdmin");
const getAdminById = require("../controllers/admin/getAdminById");
const getAllAdmins = require("../controllers/admin/getAllAdmins");
const verifyAdminToken = require("../controllers/admin/verifyAdminToken");

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", adminMiddleware, logoutAdmin);
adminRouter.get("/", adminMiddleware, getAllAdmins);
adminRouter.get("/id/:id", adminMiddleware, getAdminById);
adminRouter.get("/verify-admin-token", adminMiddleware, verifyAdminToken);

module.exports = adminRouter;
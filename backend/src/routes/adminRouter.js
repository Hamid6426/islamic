const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const registerAdmin = require("../controllers/admin/registerAdmin");
const loginAdmin = require("../controllers/admin/loginAdmin");
const logoutAdmin = require("../controllers/admin/logoutAdmin");
const getAdminById = require("../controllers/admin/getAdminById");
const getAllAdmins = require("../controllers/admin/getAllAdmins");
const verifyAdminToken = require("../controllers/admin/verifyAdminToken");

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", authMiddleware(["admin", "super-admin", "moderator", "editor" ]), logoutAdmin);
adminRouter.get("/id/:id", authMiddleware(["admin", "super-admin", "moderator", "editor" ]), getAdminById);
adminRouter.get("/verify-admin-token", authMiddleware(["admin", "super-admin", "moderator", "editor" ]), verifyAdminToken);
adminRouter.get("/", authMiddleware(["super-admin", "admin" ]), getAllAdmins);

module.exports = adminRouter;
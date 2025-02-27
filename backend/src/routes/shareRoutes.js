const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const shareImage = require("../controllers/share/shareImage");
const getShareCountByImageId = require("../controllers/share/getShareCountByImageId");

const shareRouter = express.Router();

// Share routes
shareRouter.post("/share/:id", authMiddleware, shareImage);
shareRouter.get("/shares/:id", authMiddleware, getShareCountByImageId);

module.exports = shareRouter;

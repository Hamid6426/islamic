const express = require("express");
const uploadImage = require("../controllers/image/uploadImage");
const updateImage = require("../controllers/image/updateImage");
const deleteImage = require("../controllers/image/deleteImage");
const getAllImages = require("../controllers/image/getAllImages");
const getImageBySlug = require("../controllers/image/getImageBySlug");
const getImageById = require("../controllers/image/getImageById");
const searchImages = require("../controllers/image/searchImages");
const likeImage = require("../controllers/image/likeImage");
const downloadImage = require("../controllers/image/downloadImage");
const topImages = require("../controllers/image/topImages");
const authMiddleware = require("../middlewares/authMiddleware");

const imageRouter = express.Router();

imageRouter.post("/upload", authMiddleware, uploadImage);
imageRouter.put("/update", authMiddleware, updateImage);
imageRouter.delete("/delete", authMiddleware, deleteImage);
imageRouter.get("/all", getAllImages);
imageRouter.get("/slug/:slug", getImageBySlug);
imageRouter.get("/id/:id", getImageById);
imageRouter.get("/search", searchImages);
imageRouter.post("/like", likeImage);
imageRouter.get("/download/:slug", downloadImage);
imageRouter.get("/top", topImages);

module.exports = imageRouter;

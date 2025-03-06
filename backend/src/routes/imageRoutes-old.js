const express = require("express");
const uploadImage = require("../controllers/image/uploadImage");
const updateImage = require("../controllers/image/updateImage");
const deleteImage = require("../controllers/image/deleteImage");
const getAllImages = require("../controllers/image/getAllImages");
const getImageBySlug = require("../controllers/image/getImageBySlug");
const getImageById = require("../controllers/image/getImageById");
const searchImages = require("../controllers/image/searchImages");
const likeImage = require("../controllers/image/updateLikes");
const downloadImage = require("../controllers/image/downloadImage");
const topImages = require("../controllers/image/topImages");
const authMiddleware = require("../middlewares/authMiddleware");

const findImagesByTags = require("../controllers/image/findImagesByTags");
const findImagesByCategory = require("../controllers/image/findImagesByCategory");
const updateLikes = require("../controllers/image/updateLikes");
const updateShares = require("../controllers/image/updateShares");
const updateViews = require("../controllers/image/updateViews");
const updateDownloads = require("../controllers/image/updateDownloads");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const imageRouter = express.Router();

imageRouter.post('/upload', upload.single('image'), authMiddleware, uploadImage);
imageRouter.put("/update", authMiddleware, updateImage);
imageRouter.delete("/delete", authMiddleware, deleteImage);

imageRouter.get("/all", getAllImages);
imageRouter.get("/id/:id", getImageById);

imageRouter.get('/tags', findImagesByTags);
imageRouter.get('/category', findImagesByCategory);
imageRouter.get("/top", getTopImages);

imageRouter.get("/search/all", searchAllImages);
imageRouter.get("/search/tags", searchAllImages);
imageRouter.get("/search/categories", searchAllImages);
imageRouter.get("/search/mostShared", searchAllImages);
imageRouter.get("/search/mostDownloaded", searchAllImages);

imageRouter.get("/slug/:slug", getImageBySlug);
imageRouter.put('/slug/:slug/likes', updateLikes);
imageRouter.put('/slug/:slug/shares', updateShares);
imageRouter.put('/slug/:slug/views', updateViews);
imageRouter.put('/slug/:slug/downloads', updateDownloads);

module.exports = imageRouter;

const express = require("express");
const {
  uploadImage,
  getAllImages,
  getImageById,
  getImageBySlug,
  updateImageBySlug,
  deleteImage,
  deleteImageBySlug,
  searchImagesByTags,
  incrementViews,
  incrementDownloads,
  incrementShares,
  likeImage,
  likeImageBySlug,
  unlikeImage,
  unlikeImageBySlug,
  getImagesByCategory,
} = require("../controllers/imageController");
const multer = require("multer");
const adminMiddleware = require("../middlewares/adminMiddleware");

const updateImage = require("../controllers/image/updateImage");
const searchImages = require("../controllers/image/searchImages");

const imageRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// Routes
imageRouter.post("/upload", upload.single("file"), adminMiddleware, uploadImage);
imageRouter.put("/update/:slug", upload.single("file"), adminMiddleware, updateImage);

imageRouter.put("/slug/:slug", adminMiddleware, updateImageBySlug);
imageRouter.delete("/id/:id", adminMiddleware, deleteImage);
imageRouter.delete("/slug/:slug", adminMiddleware, deleteImageBySlug);

imageRouter.get("/get-all", getAllImages);
imageRouter.get("/id/:id", getImageById);
imageRouter.get("/slug/:slug", getImageBySlug);

imageRouter.post("/search-by-tag", searchImagesByTags);
imageRouter.get("/search", searchImages);
imageRouter.patch("/:id/like", likeImage);
imageRouter.patch("/:id/unlike", unlikeImage);
imageRouter.patch("/slug/:slug/views", incrementViews);
imageRouter.patch("/slug/:slug/downloads", incrementDownloads);
imageRouter.patch("/slug/:slug/shares", incrementShares);
imageRouter.patch("/slug/:slug/like", likeImageBySlug);
imageRouter.patch("/slug/:slug/unlike", unlikeImageBySlug);
imageRouter.get("/category/:category", getImagesByCategory);

module.exports = imageRouter;

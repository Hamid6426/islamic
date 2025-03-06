const express = require("express");
const multer = require("multer");
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
  downloadImage,
} = require("../controllers/imageController");

const updateImage = require("../controllers/image/getImageByIdAndUpdate");
const searchImages = require("../controllers/image/searchImages");
const getImageByIdAndUpdate = require("../controllers/image/getImageByIdAndUpdate");
const authMiddleware = require("../middlewares/authMiddleware"); // Using role-based auth

const imageRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// **Admin Routes (Requires Admin or Super Admin)**
imageRouter.post("/upload", upload.single("file"), authMiddleware(["admin", "super-admin"]), uploadImage);
imageRouter.put("/update/:slug", upload.single("file"), authMiddleware(["admin", "super-admin"]), updateImage);
imageRouter.put("/update/:id", upload.single("file"), authMiddleware(["admin", "super-admin"]), getImageByIdAndUpdate);

imageRouter.put("/slug/:slug", authMiddleware(["admin", "super-admin"]), updateImageBySlug);
imageRouter.delete("/id/:id", authMiddleware(["admin", "super-admin"]), deleteImage);
imageRouter.delete("/slug/:slug", authMiddleware(["admin", "super-admin"]), deleteImageBySlug);

// **Public Routes (No authentication required)**
imageRouter.get("/get-all", getAllImages);
imageRouter.get("/id/:id", getImageById);
imageRouter.get("/slug/:slug", getImageBySlug);

// **Authenticated User Routes (Requires Login)**
imageRouter.get("/search", searchImages);
imageRouter.patch("/:id/like", authMiddleware(["user", "admin", "super-admin"]), likeImage);
imageRouter.patch("/:id/unlike", authMiddleware(["user", "admin", "super-admin"]), unlikeImage);
imageRouter.patch("/slug/:slug/views", incrementViews);
imageRouter.patch("/slug/:slug/downloads", incrementDownloads);
imageRouter.patch("/slug/:slug/shares", incrementShares);
imageRouter.patch("/slug/:slug/like", authMiddleware(["user", "admin", "super-admin"]), likeImageBySlug);
imageRouter.patch("/slug/:slug/unlike", authMiddleware(["user", "admin", "super-admin"]), unlikeImageBySlug);
imageRouter.get("/category/:category", getImagesByCategory);
imageRouter.get("/download/:slug", authMiddleware(["user", "admin", "super-admin"]), downloadImage);

module.exports = imageRouter;

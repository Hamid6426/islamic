const Image = require("../models/Image");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const axios = require("axios");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, "-");
};

const uploadImage = async (req, res) => {
  try {
    console.log("Received image upload request.");

    // Check if file exists
    if (!req.file) {
      console.error("No file found in request.");
      return res.status(400).json({
        success: false,
        error: "No file uploaded.",
      });
    }

    console.log("Uploading image to Cloudinary...");
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Cloudinary upload successful:", result);

    const slug = generateSlug(req.body.title);
    console.log("Generated slug:", slug);

    const tags = JSON.parse(req.body.tags);

    // Create a new image document
    const newImage = new Image({
      title: req.body.title,
      slug: slug,
      description: req.body.description,
      image: result.secure_url,
      tags: tags,
      category: req.body.category,
      likes: [],
      shares: 0,
      views: 0,
      downloads: 0,
    });

    console.log("Saving image to database...");
    await newImage.save();
    console.log("Image saved successfully:", newImage);

    res.status(201).json({
      success: true,
      data: newImage,
    });
  } catch (error) {
    console.error("Error in uploadImage:", error.message);

    res.status(500).json({
      success: false,
      error: "Server Error: " + error.message,
    });
  }
};

const getAllImages = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 12; // Default limit is 10 if not specified
    const images = await Image.find({}).limit(limit);
    console.log(images);

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ error: "Image not found" });
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateImage = async (req, res) => {
  try {
    const { id } = req.body;
    const updatedImage = await Image.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedImage)
      return res.status(404).json({ error: "Image not found" });
    res.status(200).json(updatedImage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedImage = await Image.findByIdAndDelete(req.params.id);
    if (!deletedImage)
      return res.status(404).json({ error: "Image not found" });
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const getImageBySlug = async (req, res) => {
//   try {
//     const image = await Image.findOne({ slug: req.params.slug }); // from URL
//     if (!image) return res.status(404).json({ error: "Image not found" });
//     res.status(200).json(image);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const getImageBySlug = async (req, res) => {
  try {
    const image = await Image.findOne({ slug: req.params.slug });
    if (!image) return res.status(404).json({ error: "Image not found" });

    const pngUrl = image.image;
    const svgUrl = pngUrl.replace("/upload/", "/upload/f_svg/");

    res.status(200).json({
      image: pngUrl,
      svg: svgUrl,
      title: image.title,
      description: image.description,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const updateImageBySlug = async (req, res) => {
  try {
    const updatedImage = await Image.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    if (!updatedImage)
      return res.status(404).json({ error: "Image not found" });
    res.status(200).json(updatedImage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteImageBySlug = async (req, res) => {
  try {
    const deletedImage = await Image.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!deletedImage)
      return res.status(404).json({ error: "Image not found" });
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchImagesByTags = async (req, res) => {
  try {
    const images = await Image.find({ tags: { $in: req.body.tags } });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const incrementViews = async (req, res) => {
  try {
    const image = await Image.findOne({ slug: req.params.slug });
    if (!image) return res.status(404).json({ error: "Image not found" });
    image.views += 1;
    await image.save();
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const incrementDownloads = async (req, res) => {
  try {
    const image = await Image.findOne({ slug: req.params.slug });
    if (!image) return res.status(404).json({ error: "Image not found" });
    image.downloads += 1;
    await image.save();
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const incrementShares = async (req, res) => {
  try {
    const image = await Image.findOne({ slug: req.params.slug });
    if (!image) return res.status(404).json({ error: "Image not found" });
    image.shares += 1;
    await image.save();
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const likeImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });
    image.likes.push(req.user._id);
    await image.save();
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const likeImageBySlug = async (req, res) => {
  try {
    const image = await Image.findOne({ slug: req.params.slug });
    if (!image) return res.status(404).json({ error: "Image not found" });
    image.likes.push(req.user._id);
    await image.save();
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const unlikeImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });
    image.likes.pull(req.user._id);
    await image.save();
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const unlikeImageBySlug = async (req, res) => {
  try {
    const image = await Image.findOne({ slug: req.params.slug });
    if (!image) return res.status(404).json({ error: "Image not found" });
    image.likes.pull(req.user._id);
    await image.save();
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getImagesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const images = await Image.find({ category });
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

const downloadImage = async (req, res) => {
  try {
    // Authentication Check
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const { slug } = req.params;

    // Find Image by Slug
    const image = await Image.findOne({ slug });
    if (!image) {
      return res.status(404).json({ error: "Image not found." });
    }

    // Fetch the Image from the External URL
    const response = await axios.get(image.image, {
      responseType: "arraybuffer",
      timeout: 10000, // Timeout after 10 seconds
    });

    // Dynamically Determine MIME Type and Extension
    const mimeType = response.headers["content-type"];
    const extension = mimeType.split("/")[1];

    // Set Headers for Download
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", `attachment; filename="${image.title || "downloaded-image"}.${extension}"`);

    // Send Image Data to the Client
    res.send(Buffer.from(response.data, "binary"));
  } catch (error) {
    console.error(`Error downloading image [Slug: ${req.params.slug}]:`, error.message);

    // Handle External Image Fetch Errors
    if (error.response) {
      return res.status(500).json({ error: `Failed to fetch image from source: ${error.response.statusText}` });
    }

    // Generic Server Error Response
    res.status(500).json({ error: "Failed to download image." });
  }
};


module.exports = {
  uploadImage,
  getAllImages,
  getImageById,
  getImageBySlug,
  updateImage,
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
};

const Image = require("../../models/Image");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, "-");
};

const updateImage = async (req, res) => {
  try {
    console.log("Received image update request.");

    const { id } = req.params;
    const { title, description, tags, category } = req.body;

    // Find existing image
    const existingImage = await Image.findById(id);
    if (!existingImage) {
      console.error("Image not found.");
      return res.status(404).json({ success: false, error: "Image not found." });
    }

    let updatedImageUrl = existingImage.image; // Keep the existing image URL by default

    // Check if a new file is uploaded
    if (req.file) {
      console.log("Uploading new image to Cloudinary...");
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedImageUrl = result.secure_url;
      console.log("New image uploaded successfully:", updatedImageUrl);
    }

    const updatedSlug = title ? generateSlug(title) : existingImage.slug;
    const updatedTags = tags ? JSON.parse(tags) : existingImage.tags;

    // Update image fields
    existingImage.title = title || existingImage.title;
    existingImage.slug = updatedSlug;
    existingImage.description = description || existingImage.description;
    existingImage.image = updatedImageUrl;
    existingImage.tags = updatedTags;
    existingImage.category = category || existingImage.category;

    console.log("Saving updated image...");
    await existingImage.save();
    console.log("Image updated successfully:", existingImage);

    res.status(200).json({ success: true, data: existingImage });
  } catch (error) {
    console.error("Error in updateImage:", error.message);
    res.status(500).json({ success: false, error: "Server Error: " + error.message });
  }
};

module.exports = updateImage;

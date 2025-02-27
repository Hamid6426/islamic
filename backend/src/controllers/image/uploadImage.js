const Image = require("../../models/Image");
const slugify = require("slugify");

const uploadImage = async (req, res) => {
  try {
    const { title, description, svgContent } = req.body;
    const adminId = req.admin.id; // Extract adminId from req.admin object

    if (!title || !svgContent) {
      return res.status(400).json({ message: "Title and SVG content are required" });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const newImage = new Image({ title, slug, description, svgContent, adminId });
    await newImage.save();

    res.status(201).json({ message: "Image uploaded successfully", image: newImage });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = uploadImage;

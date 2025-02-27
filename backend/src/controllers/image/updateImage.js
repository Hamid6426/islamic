const Image = require("../../models/Image");
const slugify = require("slugify");

const updateImage = async (req, res) => {
  try {
    const { id, title, description, svgContent } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Image ID is required" });
    }

    // Find the existing image
    const existingImage = await Image.findById(id);
    if (!existingImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Create a new slug if the title is changed
    const updatedFields = { description, svgContent };
    if (title) {
      updatedFields.title = title;
      updatedFields.slug = slugify(title, { lower: true, strict: true });
    }

    const updatedImage = await Image.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json({ message: "Image updated successfully", image: updatedImage });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = updateImage;

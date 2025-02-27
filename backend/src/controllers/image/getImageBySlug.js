const Image = require("../../models/Image");

const getImageBySlug = async (req, res) => {
  try {
      const { slug } = req.params;

      const image = await Image.findOne({ slug });

      if (!image) {
          return res.status(404).json({ message: "Image not found" });
      }

      res.status(200).json(image);
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = getImageBySlug;
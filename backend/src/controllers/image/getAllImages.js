const Image = require("../../models/Image");

const getAllImages = async (req, res) => {
  try {
      const limit = parseInt(req.query.limit) || 12; // Default limit is 10 if not specified
      const images = await Image.find({}).limit(limit);

      res.status(200).json(images);
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = getAllImages;
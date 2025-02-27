const Image = require("../../models/Image");

const getImageByPost = async (req, res) => {
    try {
      const { id } = req.body;
  
      if (!id) {
        return res.status(400).json({ message: "Image ID is required" });
      }
  
      const image = await Image.findById(id);
  
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
  
      res.status(200).json(image);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  module.exports = getImageByPost;
  
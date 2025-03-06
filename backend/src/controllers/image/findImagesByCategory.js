const Image = require('../models/imageModel');

const findImagesByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    const images = await Image.find({ category });
    res.status(200).json({
      success: true,
      data: images
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

module.exports = findImagesByCategory;

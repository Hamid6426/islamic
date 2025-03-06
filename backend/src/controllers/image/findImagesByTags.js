const Image = require('../../models/imageModel');

const findImagesByTags = async (req, res) => {
  const { tags } = req.query;

  try {
    const images = await Image.find({ tags: { $in: tags.split(',') } });
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

module.exports = findImagesByTags;

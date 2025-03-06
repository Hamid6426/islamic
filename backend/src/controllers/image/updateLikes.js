const Image = require('../../models/imageModel');

const updateLikes = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }

    if (image.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        error: 'User has already liked this image'
      });
    }

    image.likes.push(userId);
    await image.save();

    res.status(200).json({
      success: true,
      data: image
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

module.exports = updateLikes;

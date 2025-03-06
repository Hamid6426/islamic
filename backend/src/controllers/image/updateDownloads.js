const Image = require('../models/imageModel');

const updateDownloads = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }

    image.downloads += 1;
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

module.exports = updateDownloads;

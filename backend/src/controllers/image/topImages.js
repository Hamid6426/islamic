const Image = require("../../models/Image");

const topImages = async (req, res) => {
  try {
    const topViewed = await Image.find().sort({ views: -1 }).limit(5);
    const topDownloaded = await Image.find().sort({ downloads: -1 }).limit(5);

    res.status(200).json({
      topViewed,
      topDownloaded,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = topImages;
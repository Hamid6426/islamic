const Image = require("../../models/Image");

const searchImages = async (req, res) => {
  try {
    const { search, sort, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    let sortQuery = { createdAt: -1 }; // Default: newest first
    if (sort === "views") {
      sortQuery = { views: -1 };
    } else if (sort === "downloads") {
      sortQuery = { downloads: -1 };
    }

    const images = await Image.find(query).skip(skip).limit(Number(limit)).sort(sortQuery);
    const total = await Image.countDocuments(query);

    res.status(200).json({ total, page: Number(page), limit: Number(limit), images });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = searchImages;
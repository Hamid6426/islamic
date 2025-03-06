const Image = require("../../models/Image");

const searchImages = async (req, res) => {
  try {
    const { query, page = 1, limit = 12 } = req.query; // Extract query term, page, and limit from query string
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    // const images = await Image.find({
    //   $text: { $search: query } // Searches in title, description, and tags
    // })
    //   .skip((page - 1) * limit)
    //   .limit(Number(limit));

    const images = await Image.find({
      $or: [
        { $text: { $search: query } }, // Text search (title, description, tags)
        { category: { $regex: query, $options: "i" } } // Case-insensitive category search
      ]
    })
      .skip((page - 1) * limit)
      .limit(Number(limit));

      
    // const images = await Image.find({
    //   $or: [
    //     { title: { $regex: query, $options: "i" } }, // Case-insensitive search in title
    //     { tags: { $regex: query, $options: "i" } }  // Case-insensitive search in tags
    //   ]
    // })
    //   .skip((page - 1) * limit)
    //   .limit(Number(limit));

    res.status(200).json(images);
  } catch (err) {
    console.error("Error in searchImages controller:", err);
    res.status(500).json({ error: "An error occurred while searching" });
  }
};

module.exports = searchImages;
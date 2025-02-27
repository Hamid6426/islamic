const Image = require("../../models/Image");

const downloadImage = async (req, res) => {
  try {
    const { slug } = req.params;

    const image = await Image.findOneAndUpdate(
      { slug },
      { $inc: { downloads: 1 } }, // Increment downloads count
      { new: true }
    );

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.setHeader("Content-Disposition", `attachment; filename="${image.slug}.svg"`);
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(image.svgContent); // Send SVG content for download
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// const Image = require("../../models/Image");

// export const downloadImage = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const image = await Image.findByIdAndUpdate(
//       id,
//       { $inc: { downloads: 1 } }, // Increment downloads count
//       { new: true }
//     );

//     if (!image) {
//       return res.status(404).json({ message: "Image not found" });
//     }

//     res.setHeader("Content-Disposition", `attachment; filename="${image.slug}.svg"`);
//     res.setHeader("Content-Type", "image/svg+xml");
//     res.send(image.svgContent); // Send SVG content for download
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

module.exports = downloadImage;
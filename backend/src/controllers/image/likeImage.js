const Image = require("../../models/Image");
const Guest = require("../../models/Guest");

const likeImage = async (req, res) => {
  try {
    const { imageId } = req.body;
    const guestIp = req.ip; // Capture the IP address of the guest

    // Check if guest with the same IP already exists
    let guest = await Guest.findOne({ ip: guestIp });
    if (!guest) {
      // If not, create a new guest
      guest = new Guest({ ip: guestIp });
      await guest.save();
    }

    // Find the image by ID
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Check if the guest has already liked the image
    if (image.likes.includes(guest._id)) {
      return res.status(400).json({ message: "Guest has already liked this image" });
    }

    // Add the guest's ID to the likes array
    image.likes.push(guest._id);
    await image.save();

    res.status(200).json({ message: "Image liked successfully", likesCount: image.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = likeImage;
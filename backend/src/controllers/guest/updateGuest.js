const Guest = require("../../models/Guest");

const updateGuest = async (req, res) => {
  try {
    const { guestId } = req.params;
    const { username, avatar } = req.body;

    const updatedGuest = await Guest.findOneAndUpdate(
      { guestId },
      { username, avatar },
      { new: true }
    );

    if (!updatedGuest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    res.status(200).json({ message: "Guest updated successfully", guest: updatedGuest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = updateGuest;
const Guest = require("../../models/Guest");

const getGuestById = async (req, res) => {
  try {
    const { guestId } = req.params;

    const guest = await Guest.findOne({ guestId });
    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = getGuestById;
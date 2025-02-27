const Guest = require("../../models/Guest");

const getGuestProfile = async (req, res) => {
  try {
    const guestId = req.cookies.guestId;
    if (!guestId) return res.status(404).json({ message: "Guest not found" });

    const guest = await Guest.findOne({ guestId });
    if (!guest) return res.status(404).json({ message: "Guest not found" });

    res.status(200).json({ username: guest.username, avatar: guest.avatar });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = getGuestProfile;
const Guest = require("../../models/Guest");

const deleteGuest = async (req, res) => {
  try {
    const { guestId } = req.params;

    const deletedGuest = await Guest.findOneAndDelete({ guestId });

    if (!deletedGuest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    res.status(200).json({ message: "Guest deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = deleteGuest;
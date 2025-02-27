const Guest = require("../../models/Guest");

const createGuest = async (req, res) => {
  try {
    const guestIp = req.ip;
    
    // Check if a guest with the same IP already exists
    let guest = await Guest.findOne({ ip: guestIp });
    if (!guest) {
      // If not, create a new guest
      guest = new Guest({ ip: guestIp });
      await guest.save();
    }
    
    res.status(201).json({ message: "Guest created successfully", guest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = createGuest;
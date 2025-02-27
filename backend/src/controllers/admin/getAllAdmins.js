const Admin = require("../../models/Admin");

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching all admins:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getAllAdmins;
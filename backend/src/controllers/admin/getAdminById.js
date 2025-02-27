const Admin = require("../../models/Admin");

const getAdminById = async (req, res) => {
  try {
    const { _id } = req.params;
    const admin = await Admin.findById(_id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching admin by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getAdminById;
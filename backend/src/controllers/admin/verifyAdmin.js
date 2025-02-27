const Admin = require("../../models/Admin");

const verifyAdmin = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Verification token is required" });
    }

    // Find admin by verification token
    const admin = await Admin.findOne({ verificationToken: token });

    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Mark admin as verified
    admin.isVerified = true;
    admin.verificationToken = null; // Remove the token after verification
    await admin.save();

    res.status(200).json({ message: "Admin verified successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = verifyAdmin;
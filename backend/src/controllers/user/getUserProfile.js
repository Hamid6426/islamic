const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const getUserProfile = async (req, res) => {
  try {
    const token = req.cookies.userToken; // Read token from HTTP-only cookie
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // Exclude password

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = getUserProfile;

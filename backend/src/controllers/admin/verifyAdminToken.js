const jwt = require("jsonwebtoken");

const verifyAdminToken = async (req, res) => {
  const token = req.cookies.adminToken; // Ensure you're using `req.cookies`

  // console.log("Received token:", token); 

  if (!token) {
    return res.status(403).json({ message: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ isValid: true, admin: decoded });
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyAdminToken;

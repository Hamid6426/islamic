const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/Admin");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found");
      return res.status(400).json({ message: "Admin not found" });
    }

    // Check if email is verified
    if (!admin.isVerified) {
      console.log("Admin approval pending");
      return res.status(403).json({ message: "Admin approval pending" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const adminToken = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role, name: admin.name },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    // Set token in HTTP-only cookie
    // res.cookie("adminToken", adminToken, {
    //   httpOnly: true, // Prevents JavaScript access (more secure)
    //   secure: process.env.NODE_ENV === "production", // Secure in production
    //   sameSite: "Strict", // CSRF protection
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });

    res.cookie("adminToken", adminToken, {
      httpOnly: true,
      secure: false,  // Change to 'true' in production
      sameSite: "Lax", // Adjusted for better compatibility
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("Login successful");
    console.log(`token: ${adminToken}`);
    res.status(200).json({
      message: "Login successful",
      admin: { name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = loginAdmin;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(403).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const userToken = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    // Set token in HTTP-only cookie
    res.cookie("userToken", userToken, {
      httpOnly: true, // Prevents JavaScript access (more secure)
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "User logged in successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error logging in user", error });
  }
};

module.exports = loginUser;

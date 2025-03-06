// NO IMPORTS HERE

const logoutAdmin = async (req, res) => {
  try {
    res.cookie("adminToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(0), // Expire the cookie immediately
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = logoutAdmin;
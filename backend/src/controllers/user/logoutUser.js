const logoutUser = (req, res) => {
  res.clearCookie('userToken');
  res.status(200).json({ message: 'User logged out successfully!' });
};

module.exports = logoutUser;
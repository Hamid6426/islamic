const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const generateGuestAvatar = (guestId) => {
  const hash = crypto.createHash("md5").update(guestId).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};

const guestSchema = new mongoose.Schema(
  {
    guestId: { type: String, unique: true, default: uuidv4 },
    username: { type: String, default: function () { return `Guest_${Math.floor(1000 + Math.random() * 9000)}`; } }, // Random username
    avatar: { type: String, default: function () { return generateGuestAvatar(this.guestId); } }, // Unique avatar
    ip: { type: String, unique: true }, // Store IP to prevent multiple guests from same IP
  },
  { timestamps: true }
);

const Guest = mongoose.model("Guest", guestSchema);
module.exports = Guest;

const express = require("express");
const  likeImage  = require("../controllers/likeImage");
const  getGuestProfile  = require("../controllers/getGuestProfile");

const guestRouter = express.Router();

guestRouter.post("/like/:id", likeImage); // Guests can like/unlike
guestRouter.get("/profile", getGuestProfile); // Fetch guest profile
guestRouter.post("/create", createGuest);
guestRouter.get("/:guestId", getGuestById);
guestRouter.put("/:guestId", updateGuest);
guestRouter.delete("/:guestId", deleteGuest);

module.exports = guestRouter;

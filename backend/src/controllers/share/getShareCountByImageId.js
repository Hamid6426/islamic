const Share = require("../../models/Share");

// Get Share Count by Image ID
const getShareCountByImageId = async (req, res) => {
    try {
        const { imageId } = req.params;

        const share = await Share.findOne({ imageId });

        if (!share) {
            return res.status(404).json({ message: "No shares found for this image" });
        }

        res.status(200).json(share);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = getShareCountByImageId;
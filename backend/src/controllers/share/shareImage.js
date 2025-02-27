const Share = require("../../models/Share");

const shareImage = async (req, res) => {
    try {
        const { imageId } = req.params;

        const share = await Share.findOneAndUpdate(
            { imageId },
            { $inc: { shareCount: 1 } },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: "Image shared successfully", share });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = shareImage;
const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema(
    {
        imageId: { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true },
        shareCount: { type: Number, default: 0 }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Index for optimizing queries
shareSchema.index({ imageId: 1 });

const Share = mongoose.model("Share", shareSchema);
module.exports = Share;
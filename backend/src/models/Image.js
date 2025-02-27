const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, unique: true, required: true },
        description: { type: String },
        svgContent: { type: String, required: true },
        adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
        likes: [{ type: mongoose.Schema.Types.ObjectId }],
        views: { type: Number, default: 0 },
        downloads: { type: Number, default: 0 }
    },
    { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;

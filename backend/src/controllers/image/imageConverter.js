const multer = require("multer");
const sharp = require("sharp");
const { trace } = require("potrace");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("image"), async (req, res) => {
    const inputPath = req.file.path;
    const outputPath = `${inputPath}.png`;

    // Convert to PNG (if not already)
    await sharp(inputPath).toFormat("png").toFile(outputPath);

    // Convert PNG to SVG
    trace(outputPath, (err, svg) => {
        if (err) return res.status(500).send("Conversion failed");
        res.send(svg);
        fs.unlinkSync(inputPath); // Cleanup
        fs.unlinkSync(outputPath);
    });
});
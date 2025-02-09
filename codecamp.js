const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

// Configure Multer for file upload handling
const upload = multer({ storage: multer.memoryStorage() });

// Serve HTML form at root
app.get("/", (req, res) => {
    res.send(`
        <form action="/api/fileanalyse" enctype="multipart/form-data" method="POST">
            <input type="file" name="upfile" />
            <button type="submit">Upload</button>
        </form>
    `);
});

// Handle file upload
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
    if (!req.file) return res.json({ error: "No file uploaded" });

    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

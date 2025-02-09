const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dns = require("dns");
const urlParser = require("url");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

let urlDatabase = {}; // Store URLs with short codes
let counter = 1; // Short URL counter

// Validate a URL
function isValidUrl(url) {
    const parsedUrl = urlParser.parse(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
}

// POST: Create a short URL
app.post("/api/shorturl", (req, res) => {
    const originalUrl = req.body.url;

    if (!isValidUrl(originalUrl)) {
        return res.json({ error: "invalid url" });
    }

    const shortUrl = counter++;
    urlDatabase[shortUrl] = originalUrl; // Store the mapping

    res.json({ original_url: originalUrl, short_url: shortUrl });
});

// GET: Redirect to original URL
app.get("/api/shorturl/:short_url", (req, res) => {
    const shortUrl = req.params.short_url;
    const originalUrl = urlDatabase[shortUrl];

    if (originalUrl) {
        return res.redirect(originalUrl);
    } else {
        return res.json({ error: "No short URL found" });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

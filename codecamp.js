const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/whoami", (req, res) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const language = req.headers["accept-language"];
    const software = req.headers["user-agent"];

    res.json({
        ipaddress: ip,
        language: language,
        software: software
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

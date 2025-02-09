const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/api/:date?", (req, res) => {
    let { date } = req.params;

    // If no date is provided, use the current date
    if (!date) {
        const now = new Date();
        return res.json({ unix: now.getTime(), utc: now.toUTCString() });
    }

    // If date is a pure number (Unix timestamp), ensure it's treated as a number
    if (!isNaN(date)) {
        date = parseInt(date);
    }

    const parsedDate = new Date(date);

    // Check if date is invalid
    if (isNaN(parsedDate.getTime())) {
        return res.json({ error: "Invalid Date" });
    }

    // Return valid response
    res.json({
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString()
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

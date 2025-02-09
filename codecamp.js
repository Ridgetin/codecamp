const express = require("express");
const app = express();

app.get("/api/:date?", (req, res) => {
    let { date } = req.params;

    // If date is undefined, use current date
    if (!date) {
        let now = new Date();
        return res.json({ unix: now.getTime(), utc: now.toUTCString() });
    }

    // If date is a number (timestamp), convert it properly
    if (!isNaN(date)) {
        date = parseInt(date); // Convert to number
    }

    let parsedDate = new Date(date);

    // Check for invalid date
    if (parsedDate.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
    }

    // Return the correct format
    res.json({
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString()
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

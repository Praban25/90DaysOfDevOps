const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(MONGO_URI);

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        app.get("/", (req, res) => {
            res.send("Express App Connected to MongoDB using Docker Compose!");
        });

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error(err);
    }
}

startServer();
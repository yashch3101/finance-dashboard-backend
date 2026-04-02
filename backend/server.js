const mongoose = require('mongoose');
const app = require("./src/app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    })
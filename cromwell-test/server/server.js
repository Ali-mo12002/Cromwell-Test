const express = require("express");
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/Routes");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB()
// API routes
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Export app for testing

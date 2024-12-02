const express = require("express");
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/Routes");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());  // Parse incoming JSON requests

connectDB() // Establish connection to the database
app.use("/user", userRoutes);  // Mount the user routes on the /user endpoint

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; 

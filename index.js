const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection (assuming it's in connectDB.js)
import '../config/connectDB.js';

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Use environment variable for port
const PORT = process.env.PORT || 5000; // Set a default port if not defined

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



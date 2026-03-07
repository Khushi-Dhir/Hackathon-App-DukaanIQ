const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
require('dotenv').config();
const app = express();
// Connect to MongoDB
connectDB();
// Middleware
app.use(cors());

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

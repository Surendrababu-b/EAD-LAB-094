// src/App.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/students', studentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// src/config/db.js
const mongoose = require('mongoose');

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/studentDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

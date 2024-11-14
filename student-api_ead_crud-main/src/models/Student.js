// src/models/Student.js
const mongoose = require('mongoose');

// Define the student schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

// Create the model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

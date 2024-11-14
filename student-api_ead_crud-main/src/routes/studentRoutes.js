// src/routes/studentRoutes.js
const express = require('express');
const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
} = require('../controllers/studentController');

const router = express.Router();

// Define the routes
router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;

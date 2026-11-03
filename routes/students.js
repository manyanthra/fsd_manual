
const router = require('express').Router();

const ctrl = require('../controllers/studentController');

// Search students
router.get('/search', ctrl.searchStudents);

// Create student
router.post('/', ctrl.createStudent);

// Get all students
router.get('/', ctrl.getStudents);

// Update student
router.put('/:id', ctrl.updateStudent);

// Delete student
router.delete('/:id', ctrl.deleteStudent);

module.exports = router;

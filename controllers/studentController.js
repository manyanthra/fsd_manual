
const Student = require('../models/Student');

// CREATE STUDENT
exports.createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json(student);

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

// GET ALL STUDENTS
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();

        res.json(students);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// UPDATE STUDENT
exports.updateStudent = async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updated) {
            return res.status(404).json({
                error: 'Student not found'
            });
        }

        res.json(updated);

    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({
                error: 'Invalid student id'
            });
        }

        res.status(400).json({
            error: err.message
        });
    }
};

// DELETE STUDENT
exports.deleteStudent = async (req, res) => {
    try {
        const deleted = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!deleted) {
            return res.status(404).json({
                error: 'Student not found'
            });
        }

        res.json({
            message: 'Student deleted',
            deleted
        });

    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({
                error: 'Invalid student id'
            });
        }

        res.status(500).json({
            error: err.message
        });
    }
};

// SEARCH AND SORT STUDENTS
exports.searchStudents = async (req, res) => {
    try {
        const { query = '', sortBy } = req.query;

        // Search by student name
        const filter = query
            ? {
                name: {
                    $regex: query,
                    $options: 'i'
                }
            }
            : {};

        // Sorting
        let sort = {};

        if (sortBy) {
            const [field, dir] = sortBy.split(':');

            // Allow only valid sort fields
            if (!['name', 'rollNo', 'age'].includes(field)) {
                return res.status(400).json({
                    error: 'Invalid sort field'
                });
            }

            if (!['asc', 'desc'].includes(dir)) {
                return res.status(400).json({
                    error: 'Invalid sort direction'
                });
            }

            sort[field] = dir === 'desc' ? -1 : 1;
        }

        const results = await Student.find(filter).sort(sort);

        res.json(results);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

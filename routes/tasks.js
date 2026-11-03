const express = require('express');

const router = express.Router();

const validateTask = require('../middleware/validateTask');

// Initial tasks
let tasks = [
    { id: 1, title: 'Learn Express', done: false },
    { id: 2, title: 'Build REST API', done: false },
    { id: 3, title: 'Learn React', done: true },
    { id: 4, title: 'Practice Node.js', done: false },
    { id: 5, title: 'Complete Assignment', done: true }
];

// GET - Retrieve tasks with filtering and pagination
router.get('/', (req, res) => {

    let result = tasks;

    // Filter by completion status
    if (req.query.done !== undefined) {
        result = result.filter(t => String(t.done) === req.query.done);
    }

    // Pagination
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const start = (page - 1) * limit;

    const paginated = result.slice(start, start + limit);

    res.json({
        data: paginated,
        page,
        totalPages: Math.ceil(result.length / limit)
    });

});

// POST - Add a new task
router.post('/', validateTask, (req, res) => {

    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        done: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);

});

module.exports = router;
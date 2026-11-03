const express = require('express');
const app = express();
app.use(express.json());
// Initial tasks
let tasks = [
    { id: 1, title: 'Learn Express', done: false },
    { id: 2, title: 'Build REST API', done: false }
];
// GET - Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});
// POST - Add a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({
            error: 'title is required'
        });
    }
    const newTask = {
        id: tasks.length + 1,
        title: title,
        done: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
// Start server
app.listen(3000, () => {
    console.log('API running on port 3000');
});

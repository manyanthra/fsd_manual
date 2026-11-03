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
        return res.status(400).json({ error: 'title is required' });
    }
    const newTask = {
        id: tasks.length + 1,
        title,
        done: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
// GET - Retrieve task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});
// PUT - Update task
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    Object.assign(task, req.body);
    res.json(task);
});
// DELETE - Delete task
app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === Number(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const [removed] = tasks.splice(index, 1);
    res.json(removed);
});
// Start server
app.listen(3000, () => {
    console.log('API running on port 3000');
});

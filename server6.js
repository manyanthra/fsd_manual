const express = require('express');

const app = express();

app.use(express.json());

// Import task routes
const taskRoutes = require('./routes/tasks');

// Connect routes
app.use('/tasks', taskRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

const express = require('express');

const app = express();

app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Full Stack Application is Running Successfully!');
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime()
    });
});

// Example API route
app.get('/api', (req, res) => {
    res.json({
        message: 'API is working successfully'
    });
});

// Server configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

const express = require('express');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page (Express)');
});

// About route
app.get('/about', (req, res) => {
    res.send('About: Full Stack Development Lab (Express)');
});

// Catch-all 404 handler (must be last)
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});

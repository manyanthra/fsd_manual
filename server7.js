
const express = require('express');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Temporary user storage
let users = [];

// Home route
app.get('/', (req, res) => {
    res.send('Authentication Server is Running!');
});

// Register route
app.post('/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                error: 'username and password are required'
            });
        }

        // Check existing username
        const existingUser = users.find(
            user => user.username === username
        );

        if (existingUser) {
            return res.status(409).json({
                error: 'username already exists'
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Store user
        users.push({
            username: username,
            passwordHash: passwordHash
        });

        return res.status(201).json({
            message: 'User registered successfully',
            username: username
        });

    } catch (error) {
        console.error('Registration error:', error);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// Start server
const server = app.listen(PORT, '127.0.0.1', () => {
    console.log(`Auth server running on http://localhost:${PORT}`);
});

server.on('error', (error) => {
    console.error('Server error:', error.message);
});

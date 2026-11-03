
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const SECRET_KEY = process.env.JWT_SECRET || 'dev_secret_key';

// Middleware
app.use(express.json());

// Temporary user storage
let users = [];

// Home route
app.get('/', (req, res) => {
    res.send('Authentication Server is Running!');
});

// REGISTER API
app.post('/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check required fields
        if (!username || !password) {
            return res.status(400).json({
                error: 'username and password are required'
            });
        }

        // Check duplicate username
        const existingUser = users.find(
            u => u.username === username
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
            username,
            passwordHash
        });

        res.status(201).json({
            message: 'User registered successfully',
            username
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// LOGIN API
app.post('/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = users.find(
            u => u.username === username
        );

        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Compare password
        const valid = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!valid) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { username },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// Start server
const server = app.listen(PORT, () => {
    console.log('--------------------------------');
    console.log(`Auth server running on port ${PORT}`);
    console.log('Server is listening:', server.listening);
    console.log('--------------------------------');
});

server.on('error', (error) => {
    console.error('Server error:', error.message);
});

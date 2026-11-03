
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const studentsRouter = require('./routes/students');

const app = express();
const PORT = 3000;

app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Student Management System is Running!');
});

// Mount student routes
app.use('/students', studentsRouter);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
    });

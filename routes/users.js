
const express = require('express');

const router = express.Router();

const users = [
    { id: 1, name: 'Ravi' },
    { id: 2, name: 'Anita' }
];

// GET all users
router.get('/', (req, res) => {
    res.json(users);
});

module.exports = router;

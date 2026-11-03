
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    rollNo: {
        type: String,
        required: true,
        unique: true
    },

    age: {
        type: Number,
        required: true,
        min: 1,
        max: 30
    }
});

module.exports = mongoose.model('Student', studentSchema);

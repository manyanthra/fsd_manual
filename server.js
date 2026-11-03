
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

console.log('Logging enabled');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

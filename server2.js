require('dotenv').config();

const http = require('http');

const handleRequest = require('./routes');

const PORT = process.env.PORT || 3000;

http.createServer(handleRequest)
    .listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
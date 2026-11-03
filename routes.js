function handleRequest(req, res) {

    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/') {
        return res.end('Welcome to the Home Page');
    }

    if (req.url === '/about') {
        return res.end('About: Full Stack Development Lab');
    }

    res.statusCode = 404;

    res.end('404 - Page Not Found');
}

module.exports = handleRequest;
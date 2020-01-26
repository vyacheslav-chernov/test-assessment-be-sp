'use strict';
const http = require('http'),
    url  = require('url'),
    appRoutes = require('./routes');

var PORT = process.env.PORT || 8080;

const server = http.createServer(
    (req, res, body) => req.path = url.parse(req.url).pathname
).listen(PORT);

server.on('request', async (req, res, body) => {
    if (appRoutes.has(req.path)) {
        appRoutes.get(req.path)(req, res, body);
    } else {
        res.statusCode = 404;
        res.end();        
    }
});
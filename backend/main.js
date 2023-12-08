"use strict";

require("dotenv").config();

const http = require("http");

const PORT = process.env.NODE_DOCKER_PORT || 3000;
const HOST = 'localhost';

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("My first server!");
};

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});


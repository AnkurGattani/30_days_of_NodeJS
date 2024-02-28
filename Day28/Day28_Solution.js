const express = require('express');
const http = require('http');
const setupWebSocketServer = require('./webSocketServer');

const app = express();
const server = http.createServer(app);

setupWebSocketServer(server);

const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

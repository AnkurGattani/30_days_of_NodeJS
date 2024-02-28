const WebSocket = require('ws');

function setupWebSocketServer(server) {
	const wss = new WebSocket.Server({ server });

	// Set up a connection event listener
	wss.on('connection', function connection(ws) {
		console.log('A new client connected.');

		// Listen for messages from the client
		ws.on('message', function incoming(message) {
			console.log('received: %s', message);

			// Broadcast the received message to all connected clients
			wss.clients.forEach(function each(client) {
				if (client !== ws && client.readyState === WebSocket.OPEN) {
					client.send(message);
				}
			});
		});

		ws.on('close', () => {
			console.log('Client disconnected');
		});
	});

	console.log('WebSocket server setup complete.');
}

module.exports = setupWebSocketServer;

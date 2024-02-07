const express = require('express');
const app = express();

function requestLoggerMiddleware(req, res, next) {
	const time = new Date().toLocaleString();
	console.log(`[${time}] ${req.method} request received.`);
	next();
}

app.use(requestLoggerMiddleware);

app.get('/', (req, res) => {
	res.send('Hello World! We are checking the logs of incoming requests to the server.');
})

app.listen(3000, () => {
	console.log(`Port is running on 3000`);
})
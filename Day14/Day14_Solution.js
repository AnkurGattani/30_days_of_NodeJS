const express = require('express');
const cachingMiddleware = require('./cachingMiddleware');
const app = express();

app.use(cachingMiddleware);

// Example route
app.get('/data', (req, res) => {
	const data = { message: 'This is cached data', date: new Date().toLocaleString() };
	res.json(data);
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
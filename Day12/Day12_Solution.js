const express = require('express');
const app = express();
const rateLimitMiddleware = require('./rateLimitMiddleware');

app.get('/', rateLimitMiddleware, (req, res) => {
	res.send("Hello There");
})

app.get('/isPremium', (req, res) => {
	res.send("Too Many Requests");
})

app.listen(3000, () => console.log("Server listening at port 3000"))
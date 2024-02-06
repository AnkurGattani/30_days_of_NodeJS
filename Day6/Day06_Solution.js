/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

function greetHandler(req, res) {
	const username = req.query.name || "Guest";
	res.send(`Hello, ${username}!`);
}

app.get('/greet', greetHandler)
app.listen(port, () => console.log(`Port is running on ${port}`));
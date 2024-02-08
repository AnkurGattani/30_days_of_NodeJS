const express = require('express');
const app = express();

function positiveIntegerHandler(req, res) {
	let num = req.query.number;
	if (!isNaN(num) && num > 0) {
		res.send("Success! The number is positive.");
	}
	else {
		throw new Error("Not a positive number");
	}
}

function errorHandler(err, req, res, next) {
	if (err.message === "Not a positive number") {
		res.status(400).send("Error! Number should be a positive integer.");
	}
	else {
		next(err);
	}
}

app.get('/positive', positiveIntegerHandler);
app.use(errorHandler);
app.listen(3000, () => {
	console.log('Server is listening on port 3000');
})
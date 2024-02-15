function loggingMiddleware(req, res, next) {

	const timestamp = new Date().toISOString();
	console.log(`Timestamp: ${timestamp}`);

	console.log(`Method: ${req.method}`);
	console.log(`URL: ${req.url}`);

	console.log('Headers:');
	Object.keys(req.headers).forEach(header => {
		console.log(`${header}: ${req.headers[header]}`);
	});

	if (req.body) {
		console.log('Body:');
		console.log(req.body);
	}

	next();
}

module.exports = loggingMiddleware;
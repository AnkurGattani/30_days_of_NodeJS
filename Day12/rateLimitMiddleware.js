function rateLimitMiddleware(req, res, next) {
	const rateLimit = 5;
	const window = 60000;
	const ip = req.ip;

	req.rateLimitData = req.rateLimitData || {};
	req.rateLimitData[ip] = req.rateLimitData[ip] || { count: 0, resetTime: Date.now() + window };
	if (req.rateLimitData[ip].count >= rateLimit && Date.now() < req.rateLimitData[ip].resetTime) {
		return res.status(429).send('Too Many Requests');
	}

	if (Date.now() > req.rateLimitData[ip].resetTime) {
		req.rateLimitData[ip].count = 0;
		req.rateLimitData[ip].resetTime = Date.now() + window;
	}

	req.rateLimitData[ip].count++;

	next();
}
module.exports = rateLimitMiddleware;

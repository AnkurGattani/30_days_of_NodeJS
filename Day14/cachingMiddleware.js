const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 30 });	//cache time in seconds

function cachingMiddleware(req, res, next) {
	const key = req.originalUrl; // Use request URL as cache key
	const cachedResponse = cache.get(key);

	if (cachedResponse) {
		console.log(`Response served from cache at ${new Date().toLocaleString()}`); //check after how much delay, the data is served from the cache
		return res.send(cachedResponse);
	} else {
		res.sendResponse = res.send;
		res.send = (body) => {
			// Cache the response before sending it
			cache.set(key, body);
			console.log('Response cached');
			res.sendResponse(body);
		};
		next();
	}
}

module.exports = cachingMiddleware;
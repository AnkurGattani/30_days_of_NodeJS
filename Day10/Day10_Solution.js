const express = require('express');
const path = require('path');
const app = express();

function staticFileServer(req, res) {
	const filePath = req.url === '/' ? 'index.html' : req.url.slice(1);
	const publicDirectoryPath = path.join(__dirname, 'public', filePath);
	res.sendFile(publicDirectoryPath, (err) => {
		if (err) {
			console.log('Error!');
			res.status(404).send('File not found!');
		}
	});
}

app.use(staticFileServer);
app.listen(3000, () => console.log("Server is Running... "));
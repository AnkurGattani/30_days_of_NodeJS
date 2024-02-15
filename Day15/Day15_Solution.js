const express = require('express');
const loggingMiddleware = require('./loggingMiddleware');

const app = express();

app.use(express.json());
app.use(loggingMiddleware);

const PORT = 3300;

app.get('/', (req, res) => {
	res.send("Hello Ankur!");
});

app.post('/data', (req, res) => {
	const postData = req.body;
	res.json({ message: 'Data received successfully', data: postData });
})

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');

const app = express();

async function connectToDatabase() {
	try {
		await mongoose.connect('mongodb://127.0.0.1:27017/');
		console.log('Connected to MongoDB database');
	} catch (error) {
		console.error('Error connecting to MongoDB:');
	}
}

connectToDatabase();

const PORT = 3300;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
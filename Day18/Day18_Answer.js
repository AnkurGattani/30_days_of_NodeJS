const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/users')
	.then(() => console.log('Connection successful'))
	.catch(err => console.log('Could not connect to database'));

const userSchema = new mongoose.Schema({
	username: String,
	email: String
})

const User = mongoose.model('User', userSchema);

async function getAllUsers(req, res) {
	try {
		const users = await User.find();
		res.json(users);
	}
	catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" })
	}
}

app.get('/users', getAllUsers);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
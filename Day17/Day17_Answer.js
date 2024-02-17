const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/users')
	.then(() => console.log('Connection successful'))
	.catch(err => console.log('Could not connect to database'));

// defining schema

const userSchema = new mongoose.Schema({
	username: String,
	email: String
})

// creating model for User schema
const User = mongoose.model('User', userSchema);

async function addUserToDatabase(user) {	// function to add user to the database
	const newUser = new User(user);
	let save = false;
	await newUser
		.save()
		.then(() => save = true)
		.catch((err) => console.error(err));

	if (save) {
		console.log('User added successfully');
	}
	else {
		console.log('Cannot add user');
	}
}

addUserToDatabase({ username: 'Ankur Gattani', email: 'itsankur@email.com' });
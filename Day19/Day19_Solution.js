const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/users')
	.then(() => console.log('Connection successful'))
	.catch(err => console.log('Could not connect to database'));

// defining schema

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: {
		type: String,
		required: true,
		validate: {
			validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
			message: 'Please enter a valid email address.',
		}
	}
})

// creating model for User schema
const User = mongoose.model('User', userSchema);

async function addUserWithValidation(user) {	// function to add user to the database
	try {
		const newUser = new User(user);
		// Attempt to save the user to the database
		await newUser.save();
		console.log("\nUser added successfully!");
	} catch (error) {
		console.error("\nError adding user: ", error.message);
	}
}

addUserWithValidation({ username: 'Ankur Maheshwari', email: 'itsankurmaheshwari*email.com' });
addUserWithValidation({ username: 'Ankur ', email: 'itsankur@email.com' });
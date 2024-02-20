const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/users')
	.then(() => console.log('Connection successful'))
	.catch(err => console.log('Could not connect to database'));

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	age: { type: Number, required: true, validate: Number.isInteger }
})

const User = mongoose.model('User2', userSchema);

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

async function averageAgeOfUsers(req, res) {
	try {
		const avgAge = await User.aggregate([{
			$group: {
				_id: null,	// Group all documents into one group. _id: null groups all documents into a single group
				avg: { $avg: "$age" } 	// Calculate the average age using $avg property
			}
		}]);

		if (avgAge.length === 0)
			res.status(404).json({ error: "No users found in database" });
		else
			res.json({ "averageAge": avgAge[0].avg });	// .avg from $group function. 
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
}

addUserToDatabase({ username: 'Ankur Gattani', age: 21 });
addUserToDatabase({ username: 'Ankur Maheshwari', age: 27 });

const port = 3000;
app.get('/average-age', averageAgeOfUsers);
app.listen(port, () => console.log(`Port is running on ${port}`));
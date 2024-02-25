const mongoose = require('mongoose');
const express = require('express');
const app = express();

// defining schema

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: Number,
	quantity: { type: Number, validate: Number.isInteger }
})


// creating model for Product schema
const Product = mongoose.model('Product', productSchema);

async function createProductRoute(req, res) {
	const newProduct = new Product(req.body);
	await newProduct
		.save()
		.then(() => res.status(201).json({ message: 'Product created successfully!', product: newProduct }))
		.catch((err) => res.status(500).json({ message: 'Error creating product!', error: err.message }));
}

async function getAllProductsRoute(req, res) {
	try {
		const products = await Product.find({});	// used to find the items. If used {} without any parameters, it returns all the items. 
		res.status(200).json({ products });
	} catch (err) {
		res.status(500).json({ message: 'Error fetching products!', error: err.message });
	}
}

async function updateProductRoute(req, res) {
	try {
		const productId = req.params.id, updatedProduct = req.body;
		let prod = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
		if (!prod) {
			return res.status(404).json({ message: "Product not found!" });
		}
		res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
	}
	catch (err) {
		res.status(500).json({ message: 'Error updating product!', error: err.message });
	}
}

async function deleteProductRoute(req, res) {
	try {
		const productId = req.params.id;
		const deletedProduct = await Product.findByIdAndDelete(productId);
		if (!deletedProduct) {
			return res.status(404).json({ message: 'Product not found!' });
		}
		res.status(200).json({ message: 'Product deleted successfully!', product: deletedProduct });
	} catch (err) {
		res.status(500).json({ message: 'Error deleting product!', error: err.message });
	}
}

function createProductNameIndex() {
	Product.collection.createIndex({ name: 1 }, (err, result) => {
		if (err) {
			console.error('Error creating index:', err);
		} else {
			console.log('Product name index created:', result);
		}
	});
}

app.post('/products', createProductRoute);
app.get('/products', getAllProductsRoute);
app.put('/products/:id', updateProductRoute);
app.delete('/products/:id', deleteProductRoute);

mongoose.connect('mongodb://127.0.0.1:27017/users')
	.then(() => {
		console.log('Connection successful');
		createProductNameIndex();

		app.listen(3000, () => {
			console.log("Server is running on port 3000");
		});
	})
	.catch((err) => console.error("Couldn't connect to database"));
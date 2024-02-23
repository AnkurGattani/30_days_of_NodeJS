const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/users')
	.then(() => console.log('Connection successful'))
	.catch((err) => console.error("Couldn't connect to database"));

// defining schema

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: Number,
	quantity: { type: Number, validate: Number.isInteger }
})


// creating model for Product schema
const Product = mongoose.model('Product', productSchema);

async function createProduct(product) {
	const newProduct = new Product(product);
	let save = false;
	await newProduct
		.save()
		.then(() => console.log('Product added successfully!'))
		.catch((err) => console.error('Cannot add the product: ', err));
}

async function getAllProducts() {
	const products = await Product.find({});	// used to find the items. If used {} without any parameters, it returns all the items. 
	console.log(products);
}

async function updateProduct(productId, updatedProduct) {
	try {
		let prod = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
		console.log('Product Updated!');
		// return prod;
		getAllProducts();
	}
	catch (err) {
		throw err;
	}
}

async function deleteProduct(productId) {
	try {
		const deletedProduct = await Product.findByIdAndDelete(productId);
		console.log('Product deleted!');
		// return deletedProduct;
		getAllProducts();
	} catch (error) {
		throw error;
	}
}

createProduct({ name: 'Product 1', price: 1999, quantity: 3 });
createProduct({ name: 'Product 2', price: 1999, quantity: 4 });
createProduct({ name: 'Product 3', price: 1999, quantity: 6 });
getAllProducts();

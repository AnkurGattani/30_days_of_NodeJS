const mongoose = require('mongoose')
const express = require('express')

// Product Schema
const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
});
// Product Model
const Product = mongoose.model('Product', productSchema);
// Connect to MongoDB dataBase
mongoose.connect('mongodb://127.0.0.1:27017/users')
	.then(() => console.log('Connection successful'))
	.catch((err) => console.error("Couldn't connect to database"));

const app = express();

// Define the category schema
const CategorySchema = new mongoose.Schema({
	name: String,
	description: String
})


// Create the Category model
const Category = mongoose.model('Category', CategorySchema);

// Define the Product schema with a reference to Category
const ProductWithCategorySchema = new mongoose.Schema({
	name: String,
	price: Number,
	quantity: Number,
	category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});


// Create the ProductWithCategory model
const ProductWithCategory = mongoose.model('ProductWithCategory', ProductWithCategorySchema);

app.get('/productsCategory', getProductsPopulatedWithCategory);
app.get('/allproducts', getAllProducts);

const PORT = process.env.PORT || 5400;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

async function getProductsPopulatedWithCategory() {
	return await ProductWithCategory.find({}).populate('category');
}

async function getAllProducts() {
	return await Product.find({});
}

// Create a category
async function createCategory(category) {
	const newCategory = new Category(category);
	return await newCategory.save();
}

// Create a product with category
async function createProductWithCategory(product) {
	const newProduct = new ProductWithCategory(product);
	return await newProduct.save();
}

// Create a category
createCategory({ name: 'Electronics', description: 'Electronic items with microchips' })
	.then(category => console.log(category))
	.catch(err => console.log(err));

// Create a product with category
createProductWithCategory({ name: 'Laptop', price: 500, quantity: 10, category: '5f6d1b0d1a7f7e1b1c6d1b0d' })
	.then(product => console.log(product))
	.catch(err => console.log(err));
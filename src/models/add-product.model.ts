const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	productId: {
		type: String,
		required: true,
		unique: true,
	},
	productName: {
		type: String,
		required: true,
	},
	productDescription: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	tags: {
		type: [String],
		default: [],
	},
	productImages: {
		type: [String], // You can store image file paths as strings
		default: "http://via.placeholder.com/640x360",
	},
	rating: {
		type: Number,
		default: 0,
	},
	mrp: {
		type: Number,
		required: true,
	},
	discountPercentage: {
		type: Number,
		default: 0,
	},
	actualValue: {
		type: Number,
		required: true,
	},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

"use client";

import React, { useState } from "react";

import { imageUploader } from "@/app/_actions/ImgUpload";

export interface ProductData {
	productName: string;
	productDescription: string;
	price: number;
	quantity: number;
	category: string;
	categories: string[];
	tags: string[];
	productImages: string;
	rating: number;
	mrp: number;
	discountPercentage: number;
	actualValue: number;
}

const AddProductForm: React.FC = () => {
	const [formData, setFormData] = useState<ProductData>({
		productName: "",
		productDescription: "",
		price: 0,
		quantity: 0,
		category: "Mobile & Electronics",
		categories: ["Woman", "Man", "Mobile & Electronics", "Home & Kitchen"],
		tags: [],
		productImages: '',
		rating: 0,
		mrp: 0,
		discountPercentage: 0,
		actualValue: 0,
	});
	const imageUploadHandler = async (e: any) => {
		const file = e.target.files[0];

		console.debug("🚀 ~ file: AddProductForm.tsx:40 ~ imageUploadHandler ~ file:", file);

		if (!file) {
			return false;
		}
		try {
			const data = new FormData();
			data.set("file", file);
			const img = await imageUploader(data); //runs on the server

			console.debug("🚀 ~ file: AddProductForm.tsx:50 ~ imageUploadHandler ~ img:", img);

			return img.fileName;
		} catch (err) {
			console.debug("🚀 ~ file: page.tsx:18 ~ imageUploadHandler ~ ", err);
			return null;
		}
	};

	const handleInputChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = event.target;
		// Convert the value to a floating-point number
		const numericValue = parseFloat(value);
		if (name === "category") {
			const selectedCategory = event.target.value;
			setFormData({
				...formData,
				category: selectedCategory,
			});
		}

		if (name === "discountPercentage" || name === "price") {
			const discountPercentage =
				name === "discountPercentage"
					? numericValue
					: formData.discountPercentage;

			const price = name === "price" ? numericValue : formData.price;
			const actualValue = price - (price * discountPercentage) / 100;

			const finalActualValue = actualValue < 0 ? 0 : actualValue;

			setFormData({
				...formData,
				[name]: numericValue,
				actualValue: finalActualValue,
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const tags = event.target.value.split(",").map((tag) => tag.trim());
		setFormData({
			...formData,
			tags,
		});
	};
	async function addProductHandler() {
		try {
			const res = await fetch("/api/add-product", {
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Assuming you are sending JSON data
				},
				body: JSON.stringify(formData), // Assuming formData is an object to be sent as JSON
			});

			if (res.ok) {
				const result = await res.json();
				console.log("Product added successfully:", result);
			} else {
				console.error("Error adding product:", res.statusText);
			}
		} catch (err) {
			console.error("An error occurred:", err);
		}
	}
	const handleImagesChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const img = await imageUploadHandler(event);
		if (img) {
			setFormData({
				...formData,
				productImages: img,
			});
		}
	};

	const handleSubmit =async  (event: React.FormEvent) => {
		event.preventDefault();
		console.log(formData, "123");
		await addProductHandler();
	};

	return (
		<div className="dark:bg-gray-900 bg-[#461959]/70 h-full  flex items-center justify-center">
			<div className="max-w-4xl w-full p-6 rounded-lg shadow-lg h-full">
				<h2 className="text-3xl font-semibold mb-6">Add New Product</h2>
				<form
					onSubmit={handleSubmit}
					className=" md:grid md:grid-cols-2 gap-4 flex flex-wrap w-full h-full"
				>
					{/* First Column */}
					<div className="h-full">
						{/* Product Name */}
						<div className="mb-4">
							<label htmlFor="productName" className="text-sm font-medium">
								Product Name
							</label>
							<input
								type="text"
								id="productName"
								name="productName"
								value={formData.productName}
								onChange={handleInputChange}
								className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300 text-gray-700 dark:text-gray-300"
								placeholder="Enter product name"
							/>
						</div>

						{/* Product Description */}
						<div className="mb-4">
							<label
								htmlFor="productDescription"
								className="text-sm font-medium"
							>
								Product Description
							</label>
							<textarea
								id="productDescription"
								name="productDescription"
								value={formData.productDescription}
								onChange={handleInputChange}
								className="mt-1 p-2 w-full h-32 border rounded-md focus:ring focus:ring-blue-300 text-gray-700 dark:text-gray-300"
								placeholder="Enter product description"
							/>
						</div>

						{/* Price */}
						<div className="mb-4">
							<label htmlFor="price" className="text-sm font-medium">
								Price
							</label>
							<input
								type="number"
								id="price"
								name="price"
								value={formData.price}
								onChange={handleInputChange}
								className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300 text-gray-700 dark:text-gray-300"
								placeholder="Enter product price"
							/>
						</div>

						{/* Quantity */}
						<div className="mb-4">
							<label htmlFor="quantity" className="text-sm font-medium">
								Quantity
							</label>
							<input
								type="number"
								id="quantity"
								name="quantity"
								value={formData.quantity}
								onChange={handleInputChange}
								className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300 text-gray-700 dark:text-gray-300"
								placeholder="Enter product quantity"
							/>
						</div>
					</div>

					{/* Second Column */}
					<div className="h-full">
						{/* Category Selection */}
						<div className="mb-4">
							<label htmlFor="category" className="text-sm font-medium">
								Category
							</label>
							<select
								id="category"
								name="category"
								value={formData.category}
								onChange={handleInputChange}
								className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300 text-gray-700 dark:text-gray-300"
							>
								{formData.categories.map((category, index) => (
									<option key={index} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>

						{/* Tags (Optional) */}
						<div className="mb-4">
							<label htmlFor="tags" className="text-sm font-medium">
								Tags (comma-separated)
							</label>
							<input
								type="text"
								id="tags"
								name="tags"
								value={formData.tags.join(", ")}
								onChange={handleTagsChange}
								className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300 text-gray-700 dark:text-gray-300"
								placeholder="Enter tags"
							/>
						</div>

						{/* Product Images (Optional) */}
						<div className="mb-4">
							<label htmlFor="productImages" className="text-sm font-medium">
								Product Images (Upload)
							</label>
							<input
								type="file"
								id="productImages"
								name="productImages"
								accept="image/*"
								onChange={handleImagesChange}
								className="mt-1 w-full border rounded-md focus:ring focus:ring-blue-300 text-gray-700 dark:text-gray-300"
								multiple
							/>
						</div>

						{/* Rating */}
						<div className="mb-4">
							<label htmlFor="rating" className="text-sm font-medium">
								Rating (out of 5)
							</label>
							<input
								type="number"
								id="rating"
								name="rating"
								value={formData.rating}
								onChange={handleInputChange}
								min="0"
								max="5"
								step="0.1"
								className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300 text-gray-700 dark:text-gray-300"
							/>
						</div>

						{/* Discount Percentage */}
						<div className="mb-4">
							<label
								htmlFor="discountPercentage"
								className="text-sm font-medium"
							>
								Discount Percentage
							</label>
							<input
								type="number"
								id="discountPercentage"
								name="discountPercentage"
								value={formData.discountPercentage}
								onChange={handleInputChange}
								className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300 text-gray-700 dark:text-gray-300"
								placeholder="Enter discount percentage"
							/>
						</div>

						{/* Actual Value (Auto-calculated) */}
						<div className="mb-4">
							<label htmlFor="actualValue" className="text-sm font-medium">
								Actual Value After Discount
							</label>
							<input
								type="number"
								id="actualValue"
								name="actualValue"
								value={formData.actualValue}
								readOnly
								className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300 text-gray-700 dark:text-gray-300"
							/>
						</div>
					</div>

					{/* Submit Button */}
					<div className="col-span-2 text-center">
						<button
							type="submit"
							className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
						>
							Add Product
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddProductForm;

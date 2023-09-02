"use server";

import { join } from "path";
import { writeFile } from "fs/promises";

function generateUniqueFileName(originalFileName: string) {
	const timestamp = new Date().getTime();
	const randomString = Math.random().toString(36).substring(2, 8); // Generates a random 6-character string
	const extension = originalFileName.split(".").pop(); // Get the file extension
	const uniqueFileName = `${timestamp}-${randomString}.${extension}`;
	return uniqueFileName;
}

export const imageUploader = async (data: FormData) => {
	const file: File | null = data.get("file") as unknown as File;
	if (!file) {
		throw new Error("No file uploaded");
	}
	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);
	const uniqueFileName = generateUniqueFileName(file.name);
	const path = join("", "imgs", uniqueFileName);
	await writeFile(path, buffer);
	console.log(`Uploaded file saved as ${path}`);
	return { success: true, fileName: uniqueFileName };
};

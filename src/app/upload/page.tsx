"use client";

import React, { useState } from "react";

import { imageUploader } from "../_actions/ImgUpload";

const UploadImage = () => {
	const [file, setFile] = useState<File>();
	const imageUploadHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!file) {
			return;
		}
		try {
			const data = new FormData();
			data.set('file',file);
			
			await imageUploader(data);//runs on the server 
			//below code for client side 
		// 	const data = new FormData();
		// data.set("file", file);
		// const res = await fetch("/api/upload", {
		// 	method: "POST",
		// 	body: data,
		// });
		// if (!res.ok) throw new Error(await res.text());
		} catch (err) {
			console.debug("🚀 ~ file: page.tsx:18 ~ imageUploadHandler ~ ", err);
		}
	};

	return (
		<div className="mt-32">
			<form onSubmit={imageUploadHandler}>
				<input
					type="file"
					name="file"
					onChange={(e) => setFile(e.target.files?.[0])}
				/>
				<input type="submit" value={"upload"} />
			</form>
		</div>
	);
};

export default UploadImage;

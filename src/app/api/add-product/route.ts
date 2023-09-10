import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
	const data = await req.json();
	console.debug("🚀 ~ file: route.ts:6 ~ addProduct ~ data:",data);
	try {
		return NextResponse.json(
			{
				message: "Product added successfully",
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "unable to Add the product" },
			{ status: 201 }
		);
	}
}

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

// GET /api/products — List all active products (public)
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

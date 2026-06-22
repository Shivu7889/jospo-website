import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Blog from "@/models/Blog";
import { requireAdmin } from "@/lib/auth-helpers";

// GET /api/admin/stats — Dashboard statistics
export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await connectDB();

    const [
      totalProducts,
      activeProducts,
      totalBlogs,
      publishedBlogs,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Blog.countDocuments(),
      Blog.countDocuments({ isPublished: true }),
    ]);

    return NextResponse.json({
      products: {
        total: totalProducts,
        active: activeProducts,
        inactive: totalProducts - activeProducts,
      },
      blogs: {
        total: totalBlogs,
        published: publishedBlogs,
        drafts: totalBlogs - publishedBlogs,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}

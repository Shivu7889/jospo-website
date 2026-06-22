import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PageSeo from "@/models/PageSeo";
import { requireAdmin } from "@/lib/auth-helpers";

// GET /api/admin/seo — List all page SEO entries
export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await connectDB();
    const seoEntries = await PageSeo.find().sort({ pageSlug: 1 }).lean();
    return NextResponse.json(seoEntries);
  } catch (error) {
    console.error("Error fetching SEO entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch SEO entries" },
      { status: 500 }
    );
  }
}

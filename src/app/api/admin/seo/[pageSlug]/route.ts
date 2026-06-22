import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PageSeo from "@/models/PageSeo";
import { requireAdmin } from "@/lib/auth-helpers";

// PUT /api/admin/seo/[pageSlug] — Update SEO for a specific page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ pageSlug: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { pageSlug } = await params;
    await connectDB();
    const body = await request.json();

    const seo = await PageSeo.findOneAndUpdate(
      { pageSlug },
      { ...body, pageSlug },
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json(seo);
  } catch (error) {
    console.error("Error updating SEO:", error);
    return NextResponse.json(
      { error: "Failed to update SEO data" },
      { status: 500 }
    );
  }
}

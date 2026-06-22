import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PageSeo from "@/models/PageSeo";

// GET /api/seo/[pageSlug] — Get SEO data for a page (public)
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ pageSlug: string }> }
) {
  try {
    const { pageSlug } = await params;
    await connectDB();
    const seo = await PageSeo.findOne({ pageSlug }).lean();

    if (!seo) {
      return NextResponse.json(
        { error: "SEO data not found for this page" },
        { status: 404 }
      );
    }

    return NextResponse.json(seo);
  } catch (error) {
    console.error("Error fetching page SEO:", error);
    return NextResponse.json(
      { error: "Failed to fetch SEO data" },
      { status: 500 }
    );
  }
}

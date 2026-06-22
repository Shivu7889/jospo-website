import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Faq from "@/models/Faq";
import { requireAdmin } from "@/lib/auth-helpers";

// GET /api/admin/faqs — List all FAQs
export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await connectDB();
    const faqs = await Faq.find()
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

// POST /api/admin/faqs — Create FAQ
export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await connectDB();
    const body = await request.json();
    const faq = await Faq.create(body);
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}

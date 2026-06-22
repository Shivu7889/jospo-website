import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function requireAdmin() {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }

  return null;
}

export async function getAdminSession() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  return session;
}

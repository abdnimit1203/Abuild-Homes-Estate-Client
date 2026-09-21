import { NextRequest, NextResponse } from "next/server";
import { deleteFirebaseUser } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, email } = body;

    if (!uid && !email) {
      return NextResponse.json(
        { error: "Either uid or email is required to delete Firebase user" },
        { status: 400 }
      );
    }

    const result = await deleteFirebaseUser({ uid, email });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error in /api/admin/delete-user:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete user from Firebase" },
      { status: 500 }
    );
  }
}

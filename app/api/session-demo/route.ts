import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * App Router Route Handler demonstrating how to read the session.
 * 
 * You can call the `auth()` function directly to fetch the session,
 * or use the wrapped `auth(req)` route handler pattern.
 */
export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Please sign in to access this endpoint.",
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: "Welcome to the secure App Router Route Handler!",
    session: {
      user: session.user,
      expires: session.expires,
    },
  });
}

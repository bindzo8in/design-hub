import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { auth } from "@/auth";
import { env } from "@/env";

function buildSignature(
  params: Record<string, string>,
  apiSecret: string
) {
  const stringToSign = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1")
    .update(`${stringToSign}${apiSecret}`)
    .digest("hex");
}

export async function DELETE(req: NextRequest) {
  const session = await auth();

  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Forbidden" },
      { status: 403 }
    );
  }

  const body = await req.json();

  const publicId = body.publicId;

  if (!publicId) {
    return NextResponse.json(
      { message: "Missing publicId" },
      { status: 400 }
    );
  }

  const timestamp = Math.round(Date.now() / 1000).toString();

  const signature = buildSignature(
    {
      public_id: publicId,
      timestamp,
    },
    env.CLOUDINARY_API_SECRET
  );

  const formData = new FormData();

  formData.append("public_id", publicId);
  formData.append("api_key", env.CLOUDINARY_API_KEY);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      {
        message:
          result?.error?.message || "Failed to delete image.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}
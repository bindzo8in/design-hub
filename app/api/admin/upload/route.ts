import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { auth } from "@/auth";
import { env } from "@/env";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_SIZE_MB = 5;

function buildSignature(params: Record<string, string>, apiSecret: string) {
  const stringToSign = Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1").update(`${stringToSign}${apiSecret}`).digest("hex");
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { message: "Cloudinary is not configured." },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const folder = formData.get("folder")?.toString() || "design-hub";

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "No file was provided." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { message: "Only PNG, JPG, WEBP, and GIF files are supported." },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return NextResponse.json(
      { message: `Maximum file size is ${MAX_SIZE_MB}MB.` },
      { status: 400 }
    );
  }

  const timestamp = Math.round(Date.now() / 1000).toString();
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .slice(0, 50);

  const publicId = safeName || "upload";
  const signature = buildSignature(
    {
      folder,
      public_id: publicId,
      timestamp,
    },
    env.CLOUDINARY_API_SECRET
  );

  const uploadForm = new FormData();
  uploadForm.append("file", new Blob([await file.arrayBuffer()], { type: file.type }), file.name);
  uploadForm.append("api_key", env.CLOUDINARY_API_KEY);
  uploadForm.append("timestamp", timestamp);
  uploadForm.append("signature", signature);
  uploadForm.append("folder", folder);
  uploadForm.append("public_id", publicId);
  uploadForm.append("resource_type", "image");

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: uploadForm,
    }
  );

  const uploadResult = await uploadResponse.json();

  if (!uploadResponse.ok) {
    return NextResponse.json(
      {
        message: uploadResult?.error?.message || "Cloudinary upload failed.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    },
    { status: 200 }
  );
}

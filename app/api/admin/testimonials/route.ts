import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { testimonialFormSchema } from "@/features/testimonials/schemas/testimonial.schema";

// GET: Fetch all testimonials (Admin only)
export async function GET() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testimonials);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to retrieve testimonials" },
      { status: 500 }
    );
  }
}

// POST: Create a new testimonial (Admin only)
export async function POST(req: NextRequest) {
  console.log("create testimonial")
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const result = testimonialFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Validation error", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { author, role, text, avatarUrl } = result.data;
    const avatarImage = avatarUrl && typeof avatarUrl === "object" ? avatarUrl : null;

    const testimonial = await prisma.testimonial.create({
      data: {
        author,
        role,
        text,
        avatarUrl: avatarImage?.url?.trim() ? avatarImage.url : null,
        avatarPublicId: avatarImage?.publicId?.trim() ? avatarImage.publicId : null,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to add testimonial" },
      { status: 500 }
    );
  }
}

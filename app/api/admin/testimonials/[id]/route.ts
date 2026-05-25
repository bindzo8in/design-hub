import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { testimonialFormSchema } from "@/features/testimonials/schemas/testimonial.schema";

// Helper to check user authorization
async function checkAuth() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return null;
  }
  return session;
}

// GET: Retrieve a single testimonial
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuthorized = await checkAuth();
  if (!isAuthorized) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json(testimonial);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to retrieve testimonial" },
      { status: 500 }
    );
  }
}

// PUT: Update a single testimonial
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("edit testimonial")
  const isAuthorized = await checkAuth();
  if (!isAuthorized) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

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

    // Check if testimonial exists
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) {
      return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        author,
        role,
        text,
        avatarUrl: avatarImage?.url?.trim() ? avatarImage.url : null,
        avatarPublicId: avatarImage?.publicId?.trim() ? avatarImage.publicId : null,
      },
    });

    return NextResponse.json(updatedTestimonial);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a testimonial
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuthorized = await checkAuth();
  if (!isAuthorized) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) {
      return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }

    await prisma.testimonial.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}

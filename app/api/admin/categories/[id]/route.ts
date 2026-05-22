import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { categoryFormSchema } from "@/features/categories/schemas/category.schema";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Helper to check user authorization
async function checkAuth() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return null;
  }
  return session;
}

// GET: Retrieve a single category
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
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { projects: true },
        },
      },
    });

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to retrieve category" },
      { status: 500 }
    );
  }
}

// PUT: Update a single category
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuthorized = await checkAuth();
  if (!isAuthorized) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const result = categoryFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Validation error", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, slug } = result.data;
    const finalSlug = slug && slug.trim() !== "" ? generateSlug(slug) : generateSlug(name);

    // Check if category exists
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    // Check if name or slug is taken by another category
    const duplicate = await prisma.category.findFirst({
      where: {
        id: { not: id },
        OR: [{ name }, { slug: finalSlug }],
      },
    });

    if (duplicate) {
      return NextResponse.json(
        { message: "A category with this name or slug already exists." },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug: finalSlug,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a category
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
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    await prisma.category.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}

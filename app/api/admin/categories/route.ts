import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { categoryFormSchema } from "@/features/categories/schemas/category.schema";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET: Fetch all categories with project counts (Admin only)
export async function GET() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { projects: true },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to retrieve categories" },
      { status: 500 }
    );
  }
}

// POST: Create a new category (Admin only)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

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

    // Check if category name or slug already exists
    const existing = await prisma.category.findFirst({
      where: {
        OR: [{ name }, { slug: finalSlug }],
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "A category with this name or slug already exists." },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug: finalSlug,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}

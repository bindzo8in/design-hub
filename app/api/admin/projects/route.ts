import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { projectFormSchema } from "@/features/projects/schemas/project.schema";

// GET: Fetch all projects (Admin only)
export async function GET() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        client: true,
      },
    });

    return NextResponse.json(projects);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Failed to retrieve projects" },
      { status: 500 },
    );
  }
}

// POST: Create a new project (Admin only)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const result = projectFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const {
      title,
      description,
      clientName,
      thumbnail,
      bannerImage,
      budget,
      status,
      startDate,
      endDate,
      categoryId,
      clientId,
    } = result.data;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        clientName,
        budget,
        status,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        categoryId: categoryId && categoryId !== "none" ? categoryId : null,
        clientId: clientId && clientId !== "none" ? clientId : null,
        thumbnail: thumbnail?.url || null,
        thumbnailPublicId: thumbnail?.publicId || null,
        bannerImage: bannerImage?.url || null,
        bannerPublicId: bannerImage?.publicId || null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Failed to create project" },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { projectFormSchema } from "@/features/projects/schemas/project.schema";

// Helper to check user authorization
async function checkAuth() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return null;
  }
  return session;
}

// GET: Retrieve a single project
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
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        category: true,
        client: true,
      },
    });

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to retrieve project" },
      { status: 500 }
    );
  }
}

// PUT: Update a single project
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
    const result = projectFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Validation error", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { title, description, clientName, budget, status, startDate, endDate, categoryId, clientId, thumbnail, bannerImage } = result.data;

    // Check if project exists
    const projectExists = await prisma.project.findUnique({ where: { id } });
    if (!projectExists) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
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

    return NextResponse.json(updatedProject);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a project
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
    const projectExists = await prisma.project.findUnique({ where: { id } });
    if (!projectExists) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    await prisma.project.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}

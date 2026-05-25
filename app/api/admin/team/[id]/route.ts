import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { teamMemberFormSchema } from "@/features/team/schemas/team.schema";

// Helper to check user authorization
async function checkAuth() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return null;
  }
  return session;
}

// GET: Retrieve a single team member
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
    const member = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!member) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json(member);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to retrieve team member" },
      { status: 500 }
    );
  }
}

// PUT: Update a single team member
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
    const result = teamMemberFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Validation error", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, role, imageUrl, bio, githubUrl, linkedinUrl } = result.data;
    const image = imageUrl && typeof imageUrl === "object" ? imageUrl : null;

    // Check if member exists
    const memberExists = await prisma.teamMember.findUnique({ where: { id } });
    if (!memberExists) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 });
    }

    const updatedMember = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        role,
        imageUrl: image?.url?.trim() ? image.url : null,
        imagePublicId: image?.publicId?.trim() ? image.publicId : null,
        bio: bio && bio.trim() !== "" ? bio : null,
        githubUrl: githubUrl && githubUrl.trim() !== "" ? githubUrl : null,
        linkedinUrl: linkedinUrl && linkedinUrl.trim() !== "" ? linkedinUrl : null,
      },
    });

    return NextResponse.json(updatedMember);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update team member" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a team member
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
    const memberExists = await prisma.teamMember.findUnique({ where: { id } });
    if (!memberExists) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 });
    }

    await prisma.teamMember.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to remove team member" },
      { status: 500 }
    );
  }
}

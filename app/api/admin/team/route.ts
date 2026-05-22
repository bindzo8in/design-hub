import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { teamMemberFormSchema } from "@/features/team/schemas/team.schema";

// GET: Fetch all team members (Admin only)
export async function GET() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(teamMembers);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to retrieve team members" },
      { status: 500 }
    );
  }
}

// POST: Create a new team member (Admin only)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

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

    const teamMember = await prisma.teamMember.create({
      data: {
        name,
        role,
        imageUrl: imageUrl && imageUrl.trim() !== "" ? imageUrl : null,
        bio: bio && bio.trim() !== "" ? bio : null,
        githubUrl: githubUrl && githubUrl.trim() !== "" ? githubUrl : null,
        linkedinUrl: linkedinUrl && linkedinUrl.trim() !== "" ? linkedinUrl : null,
      },
    });

    return NextResponse.json(teamMember, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to add team member" },
      { status: 500 }
    );
  }
}

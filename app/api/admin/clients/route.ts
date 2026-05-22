import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { clientFormSchema } from "@/features/clients/schemas/client.schema";

// GET: Fetch all clients with project counts (Admin only)
export async function GET() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const clients = await prisma.client.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { projects: true },
        },
      },
    });

    return NextResponse.json(clients);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to retrieve clients" },
      { status: 500 }
    );
  }
}

// POST: Create a new client (Admin only)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const result = clientFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Validation error", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, logoUrl, website } = result.data;

    // Check if client name already exists
    const existing = await prisma.client.findUnique({
      where: { name },
    });

    if (existing) {
      return NextResponse.json(
        { message: "A client with this name already exists." },
        { status: 400 }
      );
    }

    const client = await prisma.client.create({
      data: {
        name,
        logoUrl: logoUrl && logoUrl.trim() !== "" ? logoUrl : null,
        website: website && website.trim() !== "" ? website : null,
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to add client" },
      { status: 500 }
    );
  }
}

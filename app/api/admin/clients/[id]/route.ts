import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { clientFormSchema } from "@/features/clients/schemas/client.schema";

// Helper to check user authorization
async function checkAuth() {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return null;
  }
  return session;
}

// GET: Retrieve a single client
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
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        _count: {
          select: { projects: true },
        },
      },
    });

    if (!client) {
      return NextResponse.json({ message: "Client profile not found" }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to retrieve client profile" },
      { status: 500 }
    );
  }
}

// PUT: Update a single client
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
    const result = clientFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Validation error", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, logoUrl, website } = result.data;
    const logo = logoUrl && typeof logoUrl === "object" ? logoUrl : null;

    // Check if client exists
    const client = await prisma.client.findUnique({ where: { id } });
    if (!client) {
      return NextResponse.json({ message: "Client profile not found" }, { status: 404 });
    }

    // Check if name is taken by another client profile
    const duplicate = await prisma.client.findFirst({
      where: {
        id: { not: id },
        name,
      },
    });

    if (duplicate) {
      return NextResponse.json(
        { message: "A client profile with this name already exists." },
        { status: 400 }
      );
    }

    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        name,
        logoUrl: logo?.url?.trim() ? logo.url : null,
        website: website && website.trim() !== "" ? website : null,
      },
    });

    return NextResponse.json(updatedClient);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update client profile" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a client profile
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
    const client = await prisma.client.findUnique({ where: { id } });
    if (!client) {
      return NextResponse.json({ message: "Client profile not found" }, { status: 404 });
    }

    await prisma.client.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to delete client profile" },
      { status: 500 }
    );
  }
}

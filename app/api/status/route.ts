import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getStatus() {
  let status = await prisma.status.findFirst();
  if (!status) {
    status = await prisma.status.create({
      data: { isInUse: false },
    });
  }
  return status;
}

async function updateStatus(isInUse: boolean) {
  let status = await prisma.status.findFirst();
  if (status) {
    status = await prisma.status.update({
      where: { isInUse: status.isInUse },
      data: { isInUse },
    });
  } else {
    status = await prisma.status.create({
      data: { isInUse },
    });
  }
  return status;
}

// Handle GET requests
export async function GET() {
  try {
    const status = await getStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error("Error fetching status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Handle POST requests
export async function POST(request: Request) {
  try {
    const { isInUse } = await request.json();

    if (typeof isInUse !== "boolean") {
      return NextResponse.json(
        { error: "Invalid input. isInUse must be a boolean." },
        { status: 400 }
      );
    }

    const status = await updateStatus(isInUse);
    return NextResponse.json(status);
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

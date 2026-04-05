import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { nullifierHashes } = await request.json();

  if (!nullifierHashes || !Array.isArray(nullifierHashes)) {
    return NextResponse.json(
      { error: "Nullifier hashes array required" },
      { status: 400 }
    );
  }

  try {
    // Fetch all reviews by the provided nullifier hashes
    const reviews = await prisma.review.findMany({
      where: {
        nullifierHash: {
          in: nullifierHashes,
        },
      },
      include: {
        place: true, // Include place information
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
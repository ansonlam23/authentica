import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { placeId, rating, text, nullifierHash } = await request.json();

  if (!placeId || !rating || !text || !nullifierHash) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Check if this human already reviewed this place
  const existing = await prisma.review.findUnique({
    where: {
      nullifierHash_placeId: { nullifierHash, placeId },
    },
  });

  if (existing) {
    return NextResponse.json(
      { error: "You have already reviewed this place" },
      { status: 409 }
    );
  }

  // Create the review
  const review = await prisma.review.create({
    data: { placeId, rating, text, nullifierHash },
  });

  // Recalculate average rating for the place
  const aggregation = await prisma.review.aggregate({
    where: { placeId },
    _avg: { rating: true },
  });

  await prisma.place.update({
    where: { id: placeId },
    data: { rating: aggregation._avg.rating || 0 },
  });

  return NextResponse.json(review, { status: 201 });
}

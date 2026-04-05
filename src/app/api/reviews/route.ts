import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { businessId, rating, text, nullifierHash } = await request.json();

  if (!businessId || !rating || !text || !nullifierHash) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Create the review (allowing multiple reviews from the same user)
  const review = await prisma.review.create({
    data: { businessId, rating, text, nullifierHash },
  });

  // Recalculate average rating for the business
  const aggregation = await prisma.review.aggregate({
    where: { businessId },
    _avg: { rating: true },
  });

  await prisma.business.update({
    where: { id: businessId },
    data: { rating: aggregation._avg.rating || 0 },
  });

  return NextResponse.json(review, { status: 201 });
}

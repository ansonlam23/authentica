import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const places = await prisma.place.findMany({
    include: {
      _count: { select: { reviews: true } },
    },
    orderBy: { rating: "desc" },
  });

  const result = places.map((place) => ({
    ...place,
    reviewCount: place._count.reviews,
    _count: undefined,
  }));

  return NextResponse.json(result);
}

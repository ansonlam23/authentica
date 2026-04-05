import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let whereClause: any = {};

  if (category && category !== "All") {
    whereClause.category = category;
  }

  if (search) {
    whereClause.name = {
      contains: search,
      mode: "insensitive"
    };
  }

  const businesses = await prisma.business.findMany({
    where: whereClause,
    include: {
      reviews: true,
    },
    orderBy: { rating: "desc" },
  });

  return NextResponse.json(businesses);
}
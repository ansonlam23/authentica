import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let whereClause: any = {};

    // Build the where clause
    const conditions = [];

    // Add category filter if specified
    if (category && category !== "All") {
      conditions.push({ category: category });
    }

    // Add search filter if specified
    if (search && search.trim()) {
      conditions.push({
        OR: [
          {
            name: {
              contains: search.trim()
            }
          },
          {
            category: {
              contains: search.trim()
            }
          },
          {
            subcategory: {
              contains: search.trim()
            }
          },
          {
            address: {
              contains: search.trim()
            }
          }
        ]
      });
    }

    // Combine conditions
    if (conditions.length > 0) {
      whereClause.AND = conditions;
    }

    const businesses = await prisma.business.findMany({
      where: whereClause,
      include: {
        reviews: true,
      },
      orderBy: { rating: "desc" },
    });

    return NextResponse.json(businesses);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return NextResponse.json(
      { error: "Failed to fetch businesses" },
      { status: 500 }
    );
  }
}
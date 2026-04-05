import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Using Unsplash API for demo - free tier allows 50 requests/hour
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "demo_key";

// Generate search query based on business type
function getSearchQuery(business: any) {
  const { name, category, subcategory } = business;

  // Create specific search terms based on category
  const categorySearchTerms: { [key: string]: string } = {
    "Food & Drink": "restaurant cafe food interior",
    "Coffee Shop": "coffee shop cafe interior cozy",
    "Restaurant": "restaurant dining food",
    "Bar": "bar cocktail drinks interior",
    "Retail": "retail store shopping interior",
    "Services": "business service professional office",
    "Health": "medical health clinic professional",
    "Fitness": "gym fitness workout equipment",
    "Beauty": "beauty salon spa interior",
    "Professional": "office business professional modern"
  };

  // Try subcategory first, then category
  const searchBase = categorySearchTerms[subcategory] || categorySearchTerms[category] || "business storefront";

  return searchBase;
}

export async function POST(request: Request) {
  try {
    const { businessId } = await request.json();

    if (!businessId) {
      return NextResponse.json({ error: "Business ID required" }, { status: 400 });
    }

    // Get business details
    const business = await prisma.business.findUnique({
      where: { id: businessId }
    });

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // If we already have a valid remote image URL, return it
    if (business.imageUrl &&
        business.imageUrl !== "" &&
        !business.imageUrl.startsWith("/images/") &&
        (business.imageUrl.startsWith("http://") || business.imageUrl.startsWith("https://"))) {
      return NextResponse.json({ imageUrl: business.imageUrl });
    }

    // Generate search query
    const searchQuery = getSearchQuery(business);

    // Fetch from Unsplash
    const unsplashUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(searchQuery)}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;

    try {
      const response = await fetch(unsplashUrl);

      if (!response.ok) {
        // If Unsplash fails, use a deterministic placeholder based on category
        const placeholderColors = {
          "Food & Drink": "ff6b6b",
          "Retail": "4ecdc4",
          "Services": "95a5a6",
          "Health": "e74c3c",
          "Fitness": "27ae60",
          "Beauty": "e91e63",
          "Professional": "607d8b"
        };

        const color = placeholderColors[business.category as keyof typeof placeholderColors] || "3498db";
        const placeholderUrl = `https://via.placeholder.com/800x400/${color}/ffffff?text=${encodeURIComponent(business.name)}`;

        // Save placeholder URL
        await prisma.business.update({
          where: { id: businessId },
          data: { imageUrl: placeholderUrl }
        });

        return NextResponse.json({ imageUrl: placeholderUrl });
      }

      const data = await response.json();
      const imageUrl = data.urls?.regular || data.urls?.full;

      if (imageUrl) {
        // Save the image URL to database
        await prisma.business.update({
          where: { id: businessId },
          data: { imageUrl }
        });

        return NextResponse.json({ imageUrl });
      }
    } catch (apiError) {
      console.error("Image API error:", apiError);
    }

    // Fallback placeholder
    const fallbackUrl = `https://via.placeholder.com/800x400/3498db/ffffff?text=${encodeURIComponent(business.name)}`;

    await prisma.business.update({
      where: { id: businessId },
      data: { imageUrl: fallbackUrl }
    });

    return NextResponse.json({ imageUrl: fallbackUrl });

  } catch (error) {
    console.error("Error fetching business image:", error);
    return NextResponse.json(
      { error: "Failed to fetch business image" },
      { status: 500 }
    );
  }
}
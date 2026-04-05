import StarRating from "@/components/StarRating";
import BusinessReviews from "./BusinessReviews";
import { MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getBusiness(id: number) {
  const business = await prisma.business.findUnique({
    where: { id },
    include: { reviews: true },
  });
  return business;
}

export default async function BusinessDetails({ params }: PageProps) {
  const { id } = await params;
  const businessId = parseInt(id);
  const business = await getBusiness(businessId);

  if (!business) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Business not found</p>
          <Link
            href="/"
            className="text-green-600 hover:text-green-700 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Businesses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4">
      {/* Header with back button */}
      <div className="p-4 border-b border-gray-100">
        <Link
          href="/"
          className="text-green-600 hover:text-green-700 inline-flex items-center gap-2 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Businesses
        </Link>
      </div>

      {/* Business details */}
      <div className="p-4">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
          <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            <MapPin className="w-16 h-16 text-green-400" />
          </div>
          <div className="p-4">
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              {business.subcategory}
            </span>
            <h1 className="text-xl font-bold text-gray-900 mt-2 mb-1">
              {business.name}
            </h1>
            <p className="text-xs text-gray-500 mb-2">
              {business.address} • {business.neighborhood}
            </p>
            <p className="text-gray-600 text-sm mb-3">{business.description}</p>
            <div className="flex items-center justify-between">
              <StarRating rating={Math.round(business.rating)} />
              <span className="text-sm text-gray-500">
                {business.reviews.length}{" "}
                {business.reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>
          </div>
        </div>

        {/* Review form and reviews list wrapped in client component */}
        <BusinessReviews businessId={businessId} initialReviews={business.reviews} />
      </div>
    </div>
  );
}
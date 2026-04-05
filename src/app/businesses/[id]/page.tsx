import StarRating from "@/components/StarRating";
import BusinessReviews from "./BusinessReviews";
import BusinessImageLoader from "./BusinessImageLoader";
import {
  MapPin,
  ArrowLeft,
  Coffee,
  ShoppingBag,
  Scissors,
  Stethoscope,
  Dumbbell,
  Sparkles,
  Building2,
  Shield,
  Star
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Category icon mapping
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Food & Drink":
      return Coffee;
    case "Retail":
      return ShoppingBag;
    case "Services":
      return Scissors;
    case "Health":
      return Stethoscope;
    case "Fitness":
      return Dumbbell;
    case "Beauty":
      return Sparkles;
    case "Professional":
      return Building2;
    default:
      return ShoppingBag;
  }
};

// Category color mapping
const getCategoryColor = (category: string) => {
  switch (category) {
    case "Food & Drink":
      return "bg-orange-100 text-orange-600";
    case "Retail":
      return "bg-blue-100 text-blue-600";
    case "Services":
      return "bg-purple-100 text-purple-600";
    case "Health":
      return "bg-red-100 text-red-600";
    case "Fitness":
      return "bg-green-100 text-green-600";
    case "Beauty":
      return "bg-pink-100 text-pink-600";
    case "Professional":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

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
            className="text-teal-600 hover:text-teal-700 inline-flex items-center gap-2"
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
          className="text-teal-600 hover:text-teal-700 inline-flex items-center gap-2 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Businesses
        </Link>
      </div>

      {/* Business details */}
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white border border-gray-200 shadow-sm mb-4">
          {/* Business Image */}
          <BusinessImageLoader businessId={businessId} businessName={business.name} />

          <div className="p-4">
            {/* Top Row - Category Icon + Business Info + Review Count */}
            <div className="flex items-start gap-3 mb-4">
              {/* Category Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${getCategoryColor(business.category)}`}>
                {(() => {
                  const IconComponent = getCategoryIcon(business.category);
                  return <IconComponent className="w-8 h-8" />;
                })()}
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(business.category)}`}>
                  {business.subcategory}
                </span>
                <h1 className="text-xl font-bold text-gray-900 mt-2 mb-1">
                  {business.name}
                </h1>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <span className="font-medium">{business.category}</span>
                  <span className="text-gray-400">•</span>
                  <span>{business.neighborhood}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{business.address}</span>
                </div>
              </div>

              {/* Review Count Badge */}
              <div className="flex-shrink-0 text-right">
                <div className="text-xs text-gray-500">{business.reviews.length} reviews</div>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">{business.description}</p>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-1 pt-3 border-t border-gray-100">
              <Shield className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-700 font-medium">Human-verified reviews</span>
            </div>
          </div>
        </div>

        {/* Review form and reviews list wrapped in client component */}
        <BusinessReviews businessId={businessId} initialReviews={business.reviews} />
      </div>
    </div>
  );
}
import StarRating from "@/components/StarRating";
import PlaceReviews from "./PlaceReviews";
import { MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getPlace(id: number) {
  const place = await prisma.place.findUnique({
    where: { id },
    include: { reviews: true },
  });
  return place;
}

export default async function PlaceDetails({ params }: PageProps) {
  const { id } = await params;
  const placeId = parseInt(id);
  const place = await getPlace(placeId);

  if (!place) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Place not found</p>
          <Link
            href="/"
            className="text-green-600 hover:text-green-700 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Places
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
          Back to Places
        </Link>
      </div>

      {/* Place details */}
      <div className="p-4">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
          <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            <MapPin className="w-16 h-16 text-green-400" />
          </div>
          <div className="p-4">
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              {place.category}
            </span>
            <h1 className="text-xl font-bold text-gray-900 mt-2 mb-1">
              {place.name}
            </h1>
            <p className="text-gray-600 text-sm mb-3">{place.description}</p>
            <div className="flex items-center justify-between">
              <StarRating rating={Math.round(place.rating)} />
              <span className="text-sm text-gray-500">
                {place.reviews.length}{" "}
                {place.reviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>
          </div>
        </div>

        {/* Review form and reviews list wrapped in client component */}
        <PlaceReviews placeId={placeId} initialReviews={place.reviews} />
      </div>
    </div>
  );
}
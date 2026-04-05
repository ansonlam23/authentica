"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import StarRating from "@/components/StarRating";
import ReviewForm from "@/components/ReviewForm";
import ReviewCard from "@/components/ReviewCard";
import { MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Place {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviews: Review[];
}

interface Review {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
}

export default function PlaceDetails() {
  const params = useParams();
  const placeId = parseInt(params.id as string);
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlace();
  }, [placeId]);

  const fetchPlace = async () => {
    try {
      const res = await fetch(`/api/places/${placeId}`);
      if (!res.ok) throw new Error("Failed to fetch place");
      const data = await res.json();
      setPlace(data);
    } catch (err) {
      setError("Failed to load place details");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = () => {
    fetchPlace();
  };

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error || "Place not found"}</p>
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

        {/* Review form */}
        <div className="mb-6">
          <ReviewForm
            placeId={placeId}
            onReviewSubmitted={handleReviewSubmitted}
          />
        </div>

        {/* Reviews list */}
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-900">Reviews</h2>
          {place.reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reviews yet. Be the first to leave a verified review!
            </div>
          ) : (
            place.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
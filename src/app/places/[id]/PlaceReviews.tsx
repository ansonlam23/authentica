"use client";

import { useState } from "react";
import ReviewForm from "@/components/ReviewForm";
import ReviewCard from "@/components/ReviewCard";

interface PlaceReviewsProps {
  placeId: number;
  initialReviews: any[];
}

export default function PlaceReviews({ placeId, initialReviews }: PlaceReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews);

  const handleReviewSubmitted = async () => {
    // Refresh reviews
    const res = await fetch(`/api/places/${placeId}`);
    const data = await res.json();
    setReviews(data.reviews);
  };

  return (
    <>
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
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to leave a verified review!
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </>
  );
}
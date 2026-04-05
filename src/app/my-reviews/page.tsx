"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Star, MapPin, RefreshCw } from "lucide-react";
import Link from "next/link";

interface Review {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  place: {
    id: number;
    name: string;
    category: string;
    description: string;
  };
}

export default function MyReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    setError("");

    try {
      // Get stored nullifier hashes from localStorage
      const storedNullifiers = localStorage.getItem("userNullifiers");
      const nullifierHashes = storedNullifiers ? JSON.parse(storedNullifiers) : [];

      if (nullifierHashes.length === 0) {
        setReviews([]);
        setLoading(false);
        return;
      }

      const res = await fetch("/api/my-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nullifierHashes }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const reviewsData = await res.json();
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to fetch your reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="pb-4">
        <div className="p-4 border-b border-gray-100">
          <Link
            href="/"
            className="text-green-600 hover:text-green-700 inline-flex items-center gap-2 mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Places
          </Link>
          <h1 className="text-xl font-bold text-gray-900">My Reviews</h1>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <RefreshCw className="w-8 h-8 text-gray-400 mx-auto mb-3 animate-spin" />
            <p className="text-gray-500">Loading your reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <Link
          href="/"
          className="text-green-600 hover:text-green-700 inline-flex items-center gap-2 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Places
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">My Reviews</h1>
          <button
            onClick={fetchReviews}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={fetchReviews}
              className="mt-2 text-red-700 underline text-sm"
            >
              Try again
            </button>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              Your Reviews ({reviews.length})
            </h2>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">No reviews yet</p>
              <p className="text-gray-400 text-sm mb-4">
                Start exploring places and leave your first verified review!
              </p>
              <Link
                href="/"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Browse Places
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl border border-gray-100 p-4"
                >
                  <Link
                    href={`/places/${review.place.id}`}
                    className="block hover:bg-gray-50 transition-colors rounded-xl -m-4 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900 truncate">
                              {review.place.name}
                            </h3>
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              {review.place.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {review.text}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
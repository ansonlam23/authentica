"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  RefreshCw,
  Coffee,
  ShoppingBag,
  Scissors,
  Stethoscope,
  Dumbbell,
  Sparkles,
  Building2,
  Shield,
  User,
  CheckCircle,
  Heart,
  Edit3,
  FileText,
  BarChart3,
  Settings,
  Bell,
  Lock,
  LogOut,
  Trash2,
  Bookmark,
  TrendingUp,
  Award
} from "lucide-react";
import Link from "next/link";

interface Review {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  business: {
    id: number;
    name: string;
    category: string;
    subcategory: string;
    description: string;
    address: string;
    neighborhood: string;
  };
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

export default function ProfilePage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("reviews");

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

  // Calculate user stats
  const totalReviews = reviews.length;
  const categoriesReviewed = [...new Set(reviews.map(r => r.business.category))].length;
  const helpfulVotes = Math.floor(totalReviews * 2.3); // Mock helpful votes

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-teal-600 hover:text-teal-700 inline-flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold text-2xl">
                <User className="w-10 h-10" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-gray-900">Your Profile</h1>
                <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Verified
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="font-bold text-gray-900">{totalReviews}</div>
                  <div className="text-xs text-gray-500">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">{categoriesReviewed}</div>
                  <div className="text-xs text-gray-500">Categories</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">{helpfulVotes}</div>
                  <div className="text-xs text-gray-500">Helpful</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">

        {/* My Reviews Section */}
        <div className="bg-white border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-teal-600" />
                My Reviews ({totalReviews})
              </h2>
              <button
                onClick={fetchReviews}
                className="p-2 hover:bg-gray-100 transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
                <span className="ml-2 text-gray-500">Loading reviews...</span>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-2">No reviews yet</p>
                <p className="text-gray-400 text-sm mb-4">
                  Start exploring places and leave your first verified review!
                </p>
                <Link
                  href="/"
                  className="inline-block bg-teal-600 text-white px-4 py-2 text-sm font-medium hover:bg-teal-700 transition-colors"
                >
                  Browse Businesses
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="border border-gray-100 p-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${getCategoryColor(review.business.category)}`}>
                        {(() => {
                          const IconComponent = getCategoryIcon(review.business.category);
                          return <IconComponent className="w-5 h-5" />;
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-medium text-gray-900 text-sm">{review.business.name}</h3>
                          <div className="flex items-center gap-0.5 ml-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{review.text}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400 text-xs">{formatDate(review.createdAt)}</p>
                          <div className="flex items-center gap-1">
                            <button className="p-1 hover:bg-gray-100 transition-colors">
                              <Edit3 className="w-3 h-3 text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 transition-colors">
                              <Trash2 className="w-3 h-3 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {reviews.length > 3 && (
                  <button className="w-full text-teal-600 hover:text-teal-700 text-sm py-2 border border-teal-200 hover:bg-teal-50 transition-colors">
                    View all {reviews.length} reviews
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Saved Businesses */}
        <div className="bg-white border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-teal-600" />
              Saved Businesses
            </h2>
          </div>
          <div className="p-4">
            <div className="text-center py-8">
              <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">No saved businesses</p>
              <p className="text-gray-400 text-sm">
                Bookmark businesses you want to visit later
              </p>
            </div>
          </div>
        </div>

        {/* Review Drafts */}
        <div className="bg-white border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              Review Drafts
            </h2>
          </div>
          <div className="p-4">
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">No draft reviews</p>
              <p className="text-gray-400 text-sm">
                Unfinished reviews will appear here
              </p>
            </div>
          </div>
        </div>

        {/* Contribution Stats */}
        <div className="bg-white border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-teal-600" />
              Your Impact
            </h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="font-bold text-xl text-gray-900">{totalReviews}</div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-xl text-gray-900">{helpfulVotes}</div>
                <div className="text-sm text-gray-600">Helpful Votes</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <div className="flex items-center gap-2 mb-1">
                <Coffee className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-900">Top Category</span>
              </div>
              <div className="text-sm text-gray-600">
                {categoriesReviewed > 0 ? reviews[0]?.business.category || "Food & Drink" : "Not yet available"}
              </div>
            </div>
          </div>
        </div>


        {/* Settings */}
        <div className="bg-white border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-teal-600" />
              Settings
            </h2>
          </div>
          <div className="p-4 space-y-3">
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left">
              <Bell className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Notifications</div>
                <div className="text-sm text-gray-500">Manage your preferences</div>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left">
              <Lock className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Privacy & Security</div>
                <div className="text-sm text-gray-500">Control your data</div>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left">
              <LogOut className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Sign Out</div>
                <div className="text-sm text-gray-500">Log out of your account</div>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-red-50 transition-colors text-left mt-6 pt-6 border-t border-gray-200">
              <Trash2 className="w-5 h-5 text-red-400" />
              <div>
                <div className="font-medium text-red-600">Delete Account</div>
                <div className="text-sm text-red-400">Permanently delete your profile</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Coffee,
  ShoppingBag,
  Scissors,
  Stethoscope,
  Dumbbell,
  Sparkles,
  Building2,
  MapPin,
  Star,
  Shield,
  ImageIcon
} from "lucide-react";

interface BusinessCardProps {
  business: {
    id: number;
    name: string;
    category: string;
    subcategory: string;
    description: string;
    address: string;
    neighborhood: string;
    rating: number;
    reviews: any[];
  };
  featured?: boolean;
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

// Category color mapping for icons
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

// Category background gradient mapping
const getCategoryBackground = (category: string) => {
  switch (category) {
    case "Food & Drink":
      return "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200";
    case "Retail":
      return "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200";
    case "Services":
      return "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200";
    case "Health":
      return "bg-gradient-to-br from-red-50 to-rose-50 border-red-200";
    case "Fitness":
      return "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200";
    case "Beauty":
      return "bg-gradient-to-br from-pink-50 to-fuchsia-50 border-pink-200";
    case "Professional":
      return "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200";
    default:
      return "bg-gradient-to-br from-gray-50 to-zinc-50 border-gray-200";
  }
};

export default function BusinessCard({ business, featured = false }: BusinessCardProps) {
  const { id, name, category, subcategory, address, neighborhood, rating, reviews } = business;
  const reviewCount = reviews?.length || 0;
  const IconComponent = getCategoryIcon(category);
  const categoryColorClass = getCategoryColor(category);
  const backgroundClass = getCategoryBackground(category);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Fetch image for this business
    const fetchImage = async () => {
      try {
        const res = await fetch("/api/businesses/fetch-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ businessId: id })
        });

        if (res.ok) {
          const data = await res.json();
          setImageUrl(data.imageUrl);
        }
      } catch (error) {
        console.error("Failed to fetch image:", error);
        setImageError(true);
      } finally {
        setImageLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  return (
    <Link href={`/businesses/${id}`} className="block">
      <div className={`border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 shadow-sm ${
        featured
          ? "ring-2 ring-teal-400 ring-opacity-50"
          : ""
      } ${backgroundClass}`}>
        {/* Image Section */}
        <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {imageLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : imageError || !imageUrl ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
          {/* Category badge overlay */}
          <div className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium backdrop-blur-sm bg-white/90 ${categoryColorClass}`}>
            {subcategory}
          </div>
        </div>

        <div className="px-4 pt-3 pb-3">
          {/* Top Row - Category Icon + Name + Review Count */}
          <div className="flex items-start gap-3 mb-2">
            {/* Category Icon */}
            <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 ${categoryColorClass}`}>
              <IconComponent className="w-6 h-6" />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Business Name */}
              <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">
                {name}
              </h3>

              {/* Metadata Row */}
              <div className="flex items-center text-sm text-gray-600 mb-2 flex-wrap">
                <span className="font-medium">{category}</span>
                <span className="text-gray-400 mx-1 flex items-center">•</span>
                <span>{subcategory}</span>
              </div>

              {/* Address */}
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{address}</span>
              </div>
            </div>

            {/* Review Count Badge + Review Button */}
            <div className="flex-shrink-0 flex flex-col items-end gap-2">
              <div className="text-right">
                <div className="text-xs text-gray-500">{reviewCount} reviews</div>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <div className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                featured
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "bg-white/80 text-gray-700 hover:bg-white"
              }`}>
                Review
              </div>
            </div>
          </div>


          {/* Featured Badge */}
          {featured && (
            <div className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
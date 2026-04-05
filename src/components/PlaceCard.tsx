import Link from "next/link";
import StarRating from "./StarRating";
import { MapPin } from "lucide-react";

interface PlaceCardProps {
  place: {
    id: number;
    name: string;
    category: string;
    description: string;
    rating: number;
    reviews: any[];
  };
}

export default function PlaceCard({ place }: PlaceCardProps) {
  const { id, name, category, description, rating, reviews } = place;
  const reviewCount = reviews.length;
  return (
    <Link href={`/places/${id}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="h-40 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
          <MapPin className="w-12 h-12 text-green-400" />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              {category}
            </span>
            <span className="text-xs text-gray-400">
              {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mt-1">{name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
          <div className="mt-2">
            <StarRating rating={Math.round(rating)} />
          </div>
        </div>
      </div>
    </Link>
  );
}

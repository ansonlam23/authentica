import Link from "next/link";
import StarRating from "./StarRating";
import { MapPin } from "lucide-react";

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
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const { id, name, category, subcategory, description, address, neighborhood, rating, reviews } = business;
  const reviewCount = reviews?.length || 0;

  return (
    <Link href={`/businesses/${id}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="h-40 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
          <MapPin className="w-12 h-12 text-green-400" />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              {subcategory}
            </span>
            <span className="text-xs text-gray-400">
              {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mt-1">{name}</h3>
          <p className="text-xs text-gray-500 mb-1">{address} • {neighborhood}</p>
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
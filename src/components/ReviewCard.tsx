import StarRating from "./StarRating";
import { ShieldCheck } from "lucide-react";

interface ReviewCardProps {
  review: {
    id: number;
    rating: number;
    text: string;
    createdAt: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { rating, text, createdAt } = review;
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-2">
        <StarRating rating={rating} size={16} />
        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
          <ShieldCheck className="w-3 h-3" />
          Verified Human
        </span>
      </div>
      <p className="text-sm text-gray-700">{text}</p>
      <p className="text-xs text-gray-400 mt-2">
        {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

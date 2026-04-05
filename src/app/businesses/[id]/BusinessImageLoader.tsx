"use client";

import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";

interface BusinessImageLoaderProps {
  businessId: number;
  businessName: string;
}

export default function BusinessImageLoader({ businessId, businessName }: BusinessImageLoaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch("/api/businesses/fetch-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ businessId })
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
  }, [businessId]);

  return (
    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      {imageLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : imageError || !imageUrl ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="w-16 h-16 text-gray-400" />
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={businessName}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
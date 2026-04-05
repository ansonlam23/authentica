"use client";

import { useState, useEffect } from "react";
import BusinessCard from "@/components/BusinessCard";
import { Search, Filter } from "lucide-react";
import { BUSINESS_CATEGORIES } from "@/data/businesses";

interface Business {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  address: string;
  neighborhood: string;
  rating: number;
  reviews: any[];
}

async function fetchBusinesses(category?: string, search?: string) {
  const params = new URLSearchParams();
  if (category && category !== "All") {
    params.set("category", category);
  }
  if (search) {
    params.set("search", search);
  }

  const res = await fetch(`/api/businesses?${params.toString()}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch businesses');
  return res.json();
}

const categoryOptions = ["All", ...Object.keys(BUSINESS_CATEGORIES)];

export default function Home() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadBusinesses = async () => {
      setLoading(true);
      try {
        const data = await fetchBusinesses(selectedCategory, searchTerm);
        setBusinesses(data);
      } catch (error) {
        console.error("Failed to load businesses:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(loadBusinesses, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="p-4 text-center py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Discover Local Businesses
        </h1>
        <p className="text-gray-600 text-sm">
          Authentic reviews from verified humans
        </p>
      </div>

      {/* Search and Filter */}
      <div className="px-4 mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3">
          <Filter className="text-gray-400 w-4 h-4 flex-shrink-0" />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-500 mt-2 text-sm">Loading businesses...</p>
          </div>
        ) : businesses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No businesses found</p>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-4">
              {businesses.length} business{businesses.length !== 1 ? "es" : ""} found
            </p>
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
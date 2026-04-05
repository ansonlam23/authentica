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

  // Get featured businesses (top 3 highest rated + 1 food business, excluding hospitals)
  const topBusinesses = businesses
    .filter(b => !b.name.toLowerCase().includes('hospital'))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const topFoodBusiness = businesses
    .filter(b => b.category === "Food & Drink" && !topBusinesses.includes(b) && !b.name.toLowerCase().includes('hospital'))
    .sort((a, b) => b.rating - a.rating)[0];

  const featuredBusinesses = topFoodBusiness
    ? [...topBusinesses, topFoodBusiness]
    : businesses.filter(b => !b.name.toLowerCase().includes('hospital')).sort((a, b) => b.rating - a.rating).slice(0, 4);

  const otherBusinesses = businesses
    .filter(b => !featuredBusinesses.includes(b))
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-blue-50 to-purple-50">
      {/* Search Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search businesses, stores, or services"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-2xl text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
              style={{ fontSize: '16px' }}
            />
            <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : businesses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No businesses found</h3>
            <p className="text-gray-500 text-sm mb-4">
              Try another category or search term
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Featured Section */}
            {featuredBusinesses.length > 0 && selectedCategory === "All" && !searchTerm && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Featured local businesses</h2>
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  {featuredBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} featured={true} />
                  ))}
                </div>
              </div>
            )}

            {/* All Businesses */}
            <div>
              {(selectedCategory !== "All" || searchTerm || featuredBusinesses.length === 0) && (
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {searchTerm ? `Search results` : selectedCategory === "All" ? "All businesses" : selectedCategory}
                </h2>
              )}
              <div className="space-y-4">
                {(selectedCategory === "All" && !searchTerm && featuredBusinesses.length > 0
                  ? otherBusinesses
                  : businesses
                ).map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
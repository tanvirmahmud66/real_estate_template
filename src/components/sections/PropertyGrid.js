"use client";
import { useState, useEffect, useMemo } from "react";
import SectionTitle from "../ui/SectionTitle";
import PropertyCard from "../ui/PropertyCard";
import Button from "../ui/Button";
import { properties } from "@/data/properties";
import { 
  Search, 
  Filter, 
  Grid3x3, 
  List,
  ChevronDown,
  X,
  ArrowUpDown,
  Home,
  Building2,
  Ship,
  TreePine,
  Store,
  Factory
} from "lucide-react";

export default function PropertyGrid() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const propertyTypes = [
    { value: "", label: "All Types", icon: Home },
    { value: "Villa", label: "Villa", icon: Ship },
    { value: "Penthouse", label: "Penthouse", icon: Building2 },
    { value: "House", label: "House", icon: Home },
    { value: "Apartment", label: "Apartment", icon: Building2 },
    { value: "Cabin", label: "Cabin", icon: TreePine },
    { value: "Land", label: "Land", icon: TreePine },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "name_asc", label: "Name: A to Z" },
    { value: "name_desc", label: "Name: Z to A" },
  ];

  const priceRanges = [
    { value: "", label: "Any Price" },
    { value: "0-250000", label: "Up to $250k" },
    { value: "250000-500000", label: "$250k - $500k" },
    { value: "500000-750000", label: "$500k - $750k" },
    { value: "750000-1000000", label: "$750k - $1M" },
    { value: "1000000-2000000", label: "$1M - $2M" },
    { value: "2000000-999999999", label: "$2M+" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(property => property.type === selectedType);
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(property => 
        property.price >= min && property.price <= max
      );
    }

    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        filtered.sort((a, b) => a.id - b.id);
        break;
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name_desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [properties, searchTerm, selectedType, priceRange, sortBy]);

  const visibleProperties = filteredProperties.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProperties.length;
  const totalResults = filteredProperties.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 8);
      setIsLoading(false);
    }, 500);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setPriceRange("");
    setSortBy("newest");
    setVisibleCount(8);
  };

  const activeFiltersCount = [searchTerm, selectedType, priceRange].filter(Boolean).length;

  // Don't render animations until mounted
  if (!mounted) {
    return (
      <div className="w-full py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Latest Properties" 
            subtitle="Check out our newest and most popular listings"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Latest Properties" 
          subtitle="Check out our newest and most popular listings"
        />

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, location, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-5 py-3 pr-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 transition-colors ${
                    viewMode === "grid" 
                      ? "bg-blue-600 text-white" 
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 transition-colors ${
                    viewMode === "list" 
                      ? "bg-blue-600 text-white" 
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Advanced Filters</h3>
                <button
                  onClick={handleResetFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Reset All
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map(type => {
                      const Icon = type.icon;
                      const isActive = selectedType === type.value;
                      return (
                        <button
                          key={type.value}
                          onClick={() => setSelectedType(type.value)}
                          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                            isActive
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {priceRanges.map(range => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{totalResults}</div>
                    <div className="text-sm text-gray-500">Properties Found</div>
                  </div>
                  <div className="text-sm text-green-600">
                    {filteredProperties.filter(p => p.featured).length} Featured
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{visibleProperties.length}</span> of{" "}
            <span className="font-semibold text-gray-900">{totalResults}</span> properties
          </p>
          {searchTerm && (
            <p className="text-sm text-gray-500">
              Searching for: <span className="font-medium text-gray-700">"{searchTerm}"</span>
            </p>
          )}
        </div>

        {visibleProperties.length > 0 ? (
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" 
              : "space-y-4 mb-8"
          }>
            {visibleProperties.map((property, index) => (
              <div
                key={property.id}
                className="transform transition-all duration-300 hover:-translate-y-2"
              >
                <PropertyCard item={property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={handleResetFilters}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Clear all filters
            </button>
          </div>
        )}

        {hasMore && visibleProperties.length > 0 && (
          <div className="text-center mt-8">
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
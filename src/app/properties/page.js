"use client";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/ui/PropertyCard";
import { properties } from "@/data/properties";
import { 
  Search, 
  X, 
  ArrowUpDown,
  Home,
  DollarSign,
  Bed,
  Bath,
  Square,
  ChevronDown,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [minSqft, setMinSqft] = useState("");
  const [maxSqft, setMaxSqft] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Pagination state - 16 cards per page (4 rows x 4 columns)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  useEffect(() => {
    setMounted(true);
  }, []);

  const propertyTypes = [
    { value: "", label: "All Types" },
    { value: "Villa", label: "Villa" },
    { value: "Penthouse", label: "Penthouse" },
    { value: "House", label: "House" },
    { value: "Apartment", label: "Apartment" },
    { value: "Cabin", label: "Cabin" },
    { value: "Land", label: "Land" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "name_asc", label: "Name: A to Z" },
    { value: "name_desc", label: "Name: Z to A" },
  ];

  const bedroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1+ Bed" },
    { value: "2", label: "2+ Beds" },
    { value: "3", label: "3+ Beds" },
    { value: "4", label: "4+ Beds" },
    { value: "5", label: "5+ Beds" },
  ];

  const bathroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1+ Bath" },
    { value: "2", label: "2+ Baths" },
    { value: "3", label: "3+ Baths" },
    { value: "4", label: "4+ Baths" },
  ];

  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (propertyType) {
      filtered = filtered.filter(property => property.type === propertyType);
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(property => 
        property.price >= min && property.price <= max
      );
    }

    if (bedrooms) {
      filtered = filtered.filter(property => property.beds >= parseInt(bedrooms));
    }

    if (bathrooms) {
      filtered = filtered.filter(property => property.baths >= parseInt(bathrooms));
    }

    if (minSqft) {
      filtered = filtered.filter(property => property.sqft >= parseInt(minSqft));
    }
    if (maxSqft) {
      filtered = filtered.filter(property => property.sqft <= parseInt(maxSqft));
    }

    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "price_low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
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
  }, [properties, searchTerm, propertyType, priceRange, bedrooms, bathrooms, minSqft, maxSqft, sortBy]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, propertyType, priceRange, bedrooms, bathrooms, minSqft, maxSqft, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setPropertyType("");
    setPriceRange("");
    setBedrooms("");
    setBathrooms("");
    setMinSqft("");
    setMaxSqft("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const activeFiltersCount = [searchTerm, propertyType, priceRange, bedrooms, bathrooms, minSqft, maxSqft].filter(Boolean).length;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (!mounted) {
    return (
      <>
        <Navbar />
        <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format"
          alt="Properties background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            All Properties
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto">
            Discover your perfect property from our extensive collection
          </p>
          
          {/* Stats Badge */}
          <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">{filteredProperties.length}+ Properties Available</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 -mt-8 relative z-20">
            {/* Main Search Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, location, or type..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              
              <div className="md:col-span-3 relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  {propertyTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="md:col-span-3 relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">Any Price</option>
                  <option value="0-250000">Up to $250k</option>
                  <option value="250000-500000">$250k - $500k</option>
                  <option value="500000-750000">$500k - $750k</option>
                  <option value="750000-1000000">$750k - $1M</option>
                  <option value="1000000-2000000">$1M - $2M</option>
                  <option value="2000000-999999999">$2M+</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="md:col-span-1">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                    >
                      {bedroomOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                    >
                      {bathroomOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <Square className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Min Sq Ft"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={minSqft}
                      onChange={(e) => setMinSqft(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <Square className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Max Sq Ft"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={maxSqft}
                      onChange={(e) => setMaxSqft(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    className="px-4 py-2 pr-8 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <ArrowUpDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                </div>
                
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Reset all filters
                  </button>
                )}
              </div>
              
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{currentProperties.length}</span> of{" "}
                <span className="font-semibold text-gray-900">{filteredProperties.length}</span> properties
              </p>
            </div>
          </div>

          {/* Properties Grid - 4 cards per row */}
          {currentProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentProperties.map((property) => (
                  <div
                    key={property.id}
                    className="transform transition-all duration-500 hover:-translate-y-2"
                  >
                    <PropertyCard item={property} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-4 mt-12">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex gap-2">
                      {getPageNumbers().map((page, index) => (
                        <button
                          key={index}
                          onClick={() => typeof page === "number" && handlePageChange(page)}
                          className={`min-w-[40px] h-10 px-3 rounded-lg transition-all duration-300 font-medium ${
                            currentPage === page
                              ? "bg-blue-600 text-white shadow-md"
                              : page === "..."
                              ? "bg-transparent text-gray-400 cursor-default"
                              : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                          }`}
                          disabled={page === "..."}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg"
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Page Info */}
                  <div className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
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
        </div>
      </div>
    </>
  );
}
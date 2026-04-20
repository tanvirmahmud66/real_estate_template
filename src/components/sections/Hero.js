"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { Search, MapPin, Home, DollarSign, TrendingUp, Award, Shield, Clock, Star, ChevronDown } from "lucide-react";

export default function Hero() {
  const [searchData, setSearchData] = useState({
    keyword: "",
    location: "",
    propertyType: "",
    priceRange: ""
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [mounted, setMounted] = useState(false);

  // High-quality background images with fallbacks
  const backgroundImages = useMemo(() => [
    {
      src: "https://images.unsplash.com/photo-1507089947367-19c1da9775ae?q=80&w=2070&auto=format",
      fallback: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      alt: "Modern luxury villa with swimming pool"
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format",
      fallback: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      alt: "Contemporary house with garden"
    },
    {
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format",
      fallback: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      alt: "Luxury mansion entrance"
    },
    {
      src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format",
      fallback: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      alt: "Beachfront property"
    },
  ], []);

  const propertyTypes = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condo" },
    { value: "villa", label: "Villa" },
    { value: "land", label: "Land" },
  ];

  const priceRanges = [
    { value: "100000", label: "$100,000" },
    { value: "250000", label: "$250,000" },
    { value: "500000", label: "$500,000" },
    { value: "750000", label: "$750,000" },
    { value: "1000000", label: "$1,000,000+" },
  ];

  const popularSearches = [
    "Luxury Homes", "Beachfront", "Downtown", "Pool Included", 
    "Smart Homes", "Gated Community", "New Construction", "Fixer Upper"
  ];

  // Preload all images with fallback handling
  useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = backgroundImages.map(async (img, index) => {
        return new Promise((resolve) => {
          const image = new window.Image();
          
          const handleLoad = () => {
            setImagesLoaded(prev => ({ ...prev, [index]: true }));
            resolve(true);
          };
          
          const handleError = () => {
            // Use fallback image if main fails
            if (image.src !== img.fallback) {
              image.src = img.fallback;
            } else {
              setImagesLoaded(prev => ({ ...prev, [index]: true }));
              resolve(false);
            }
          };
          
          image.onload = handleLoad;
          image.onerror = handleError;
          image.src = img.src;
        });
      });
      
      await Promise.all(loadPromises);
    };
    
    preloadImages();
  }, [backgroundImages]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth image rotation with professional crossfade
  useEffect(() => {
    if (!mounted || Object.keys(imagesLoaded).length !== backgroundImages.length) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex(prev => {
          const newIndex = (prev + 1) % backgroundImages.length;
          setNextImageIndex((newIndex + 1) % backgroundImages.length);
          return newIndex;
        });
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, 800);
      }, 200);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [mounted, imagesLoaded, backgroundImages.length]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchData.keyword) params.append("keyword", searchData.keyword);
    if (searchData.location) params.append("location", searchData.location);
    if (searchData.propertyType) params.append("type", searchData.propertyType);
    if (searchData.priceRange) params.append("price", searchData.priceRange);
    
    window.location.href = `/properties?${params.toString()}`;
  }, [searchData]);

  const handleInputChange = useCallback((field, value) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  }, []);

  const currentImage = backgroundImages[currentImageIndex];
  const nextImage = backgroundImages[nextImageIndex];

  if (!mounted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="relative z-10 text-center text-white">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium">Loading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Container with Smooth Crossfade */}
      <div className="absolute inset-0">
        {/* Current Image */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            !isTransitioning ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
            onError={(e) => {
              e.currentTarget.src = currentImage.fallback;
            }}
          />
        </div>
        
        {/* Next Image - Crossfade Effect */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            isTransitioning ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={nextImage.src}
            alt={nextImage.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
            onError={(e) => {
              e.currentTarget.src = nextImage.fallback;
            }}
          />
        </div>

        {/* Gradient Overlays for Better Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>

      {/* Animated Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow delay-1500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 animate-slow-spin" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Trust Badges - Top Section */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 animate-fadeInUp">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <Award className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
              <span className="text-xs md:text-sm text-white font-medium">Top Rated Agency</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
              <span className="text-xs md:text-sm text-white font-medium">Verified Properties</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <Clock className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              <span className="text-xs md:text-sm text-white font-medium">24/7 Support</span>
            </div>
          </div>

          {/* Hero Headline Section */}
          <div className="text-center animate-fadeInUp animation-delay-200">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 tracking-tight">
              <span className="text-white">Find Your</span>
              <span className="block sm:inline bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                {" "}Dream Home
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-200 max-w-3xl mx-auto px-4">
              Discover luxury properties and investment opportunities tailored to your lifestyle
            </p>
            
            {/* Statistics Counter Section */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 mb-8 md:mb-12">
              {[
                { value: "10k+", label: "Properties" },
                { value: "5k+", label: "Happy Clients" },
                { value: "98%", label: "Satisfaction Rate" },
                { value: "$2.5B+", label: "Sales Volume" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center group cursor-pointer">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-blue-400 transition-all duration-300 group-hover:scale-110">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Search Form */}
          <form onSubmit={handleSearch} className="animate-fadeInUp animation-delay-400">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-300 max-w-6xl mx-auto">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {/* Keyword Search */}
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      placeholder="Enter keyword..."
                      value={searchData.keyword}
                      onChange={(e) => handleInputChange("keyword", e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      aria-label="Search keyword"
                    />
                  </div>

                  {/* Location Search */}
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      placeholder="City or zip code"
                      value={searchData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      aria-label="Location"
                    />
                  </div>

                  {/* Property Type Dropdown */}
                  <div className="relative group">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={searchData.propertyType}
                      onChange={(e) => handleInputChange("propertyType", e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                      aria-label="Property type"
                    >
                      <option value="">Property type</option>
                      {propertyTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Price Range Dropdown */}
                  <div className="relative group">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={searchData.priceRange}
                      onChange={(e) => handleInputChange("priceRange", e.target.value)}
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                      aria-label="Price range"
                    >
                      <option value="">Max price</option>
                      {priceRanges.map((range) => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Search Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Search className="w-4 h-4 inline mr-2" />
                    Search
                  </Button>
                </div>

                {/* Popular Search Tags */}
                <div className="flex flex-wrap justify-center gap-2 mt-5 pt-4 border-t border-white/20">
                  <span className="text-xs text-white/60">Popular searches:</span>
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleInputChange("keyword", search)}
                      className="text-xs bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full transition-all duration-300 hover:scale-105"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </form>

          {/* Trust Indicators Section */}
          <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-200 animate-fadeInUp animation-delay-600">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/40 hover:scale-105 transition-all duration-300">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
              <span>Market value up 12% this year</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/40 hover:scale-105 transition-all duration-300">
              <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
              <span>4.9/5 from 5,000+ reviews</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/40 hover:scale-105 transition-all duration-300">
              <Shield className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              <span>100% verified listings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-10 hidden md:block">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center hover:border-white/60 transition-colors duration-300">
          <div className="w-1 h-2 bg-white/40 rounded-full mt-2 animate-ping" />
        </div>
      </div>

      {/* Add custom animations to head */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-slow-spin {
          animation: spin 20s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  );
}
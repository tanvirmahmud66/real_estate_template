"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "../ui/SectionTitle";
import { MapPin, Home, TrendingUp, Star, ArrowRight } from "lucide-react";

const cities = [
  { 
    name: "New York", 
    properties: 1234, 
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format",
    avgPrice: "$1.2M",
    growth: "+15%"
  },
  { 
    name: "Los Angeles", 
    properties: 892, 
    image: "https://images.unsplash.com/photo-1580655653883-42d5041b52f8?q=80&w=2070&auto=format",
    avgPrice: "$950K",
    growth: "+12%"
  },
  { 
    name: "Miami", 
    properties: 654, 
    image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?q=80&w=2070&auto=format",
    avgPrice: "$750K",
    growth: "+18%"
  },
  { 
    name: "Chicago", 
    properties: 543, 
    image: "https://images.unsplash.com/photo-1494522358652-f30e61a8eff5?q=80&w=2070&auto=format",
    avgPrice: "$520K",
    growth: "+8%"
  },
  { 
    name: "San Francisco", 
    properties: 678, 
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2070&auto=format",
    avgPrice: "$1.4M",
    growth: "+10%"
  },
  { 
    name: "Seattle", 
    properties: 456, 
    image: "https://images.unsplash.com/photo-1502175353174-a7a70e73b9e9?q=80&w=2070&auto=format",
    avgPrice: "$680K",
    growth: "+11%"
  },
  { 
    name: "Austin", 
    properties: 789, 
    image: "https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=80&w=2070&auto=format",
    avgPrice: "$580K",
    growth: "+22%"
  },
  { 
    name: "Denver", 
    properties: 567, 
    image: "https://images.unsplash.com/photo-1534338580013-382cf48bd435?q=80&w=2070&auto=format",
    avgPrice: "$620K",
    growth: "+14%"
  },
];

export default function Cities() {
  const [visibleCities, setVisibleCities] = useState(8);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (cityName) => {
    setImageErrors(prev => ({ ...prev, [cityName]: true }));
  };

  const getImageSrc = (city) => {
    if (imageErrors[city.name]) {
      // Use a reliable fallback image from Unsplash instead of placehold.co
      return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format";
    }
    return city.image;
  };

  const handleViewMore = () => {
    setVisibleCities(prev => Math.min(prev + 4, cities.length));
  };

  const displayedCities = cities.slice(0, visibleCities);
  const totalProperties = cities.reduce((sum, city) => sum + city.properties, 0);

  return (
    <div className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Explore Popular Cities" 
          subtitle="Discover properties in America's most sought-after locations"
        />

        {/* Cities Grid - 4 cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCities.map((city, index) => (
            <Link
              key={index}
              href={`/properties?city=${city.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group"
            >
              <div className="relative h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Background Image */}
                <Image
                  src={getImageSrc(city)}
                  alt={city.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={() => handleImageError(city.name)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-900 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  4.8
                </div>

                {/* Growth Badge */}
                <div className="absolute top-4 left-4 bg-green-500 rounded-full px-2 py-1 text-xs font-semibold text-white flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {city.growth}
                </div>

                {/* City Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-xl font-bold mb-1">{city.name}</h3>
                  <p className="text-sm text-gray-200 mb-2">{city.properties.toLocaleString()} properties</p>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Home className="w-3 h-3" />
                      <span>Avg. {city.avgPrice}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>Popular</span>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold mb-1">{city.properties.toLocaleString()}</div>
                    <div className="text-sm mb-2">Active Listings</div>
                    <div className="flex items-center justify-center gap-1 text-sm font-semibold">
                      Explore <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Button */}
        {visibleCities < cities.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleViewMore}
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
            >
              View More Cities
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
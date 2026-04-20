"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Square, Heart, Eye, Share2 } from "lucide-react";

export default function PropertyCard({ item }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Fallback image in case the main image fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format";
  const imageSrc = imageError ? fallbackImage : item.image;

  const handleLike = (e) => {
    e.preventDefault(); // Prevent navigation
    setIsLiked(!isLiked);
  };

  const handleShare = async (e) => {
    e.preventDefault(); // Prevent navigation
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Check out this property: ${item.title}`,
          url: window.location.href + `/properties/${item.id}`,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href + `/properties/${item.id}`);
      alert('Link copied to clipboard!');
    }
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <Link href={`/properties/${item.id}`}>
      <div 
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <Image
            src={imageSrc}
            alt={item.title}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {item.featured && (
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                Featured
              </span>
            )}
            {item.isNew && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                New
              </span>
            )}
          </div>
          
          <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            {item.type}
          </span>

          {/* Action Buttons - Show on hover */}
          <div className={`absolute bottom-4 right-4 flex gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}>
            <button
              onClick={handleLike}
              className="bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
              aria-label="Like property"
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </button>
            <button
              onClick={handleShare}
              className="bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
              aria-label="Share property"
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Quick View Overlay */}
          <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}>
            <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2 transform transition-transform duration-300">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-semibold">Quick View</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">
              {item.title}
            </h3>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {formatPrice(item.price)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-gray-500 mb-3">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{item.location}</span>
          </div>

          <div className="flex justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-gray-600 group-hover:text-blue-600 transition-colors">
              <Bed className="w-4 h-4" />
              <span className="text-sm font-medium">{item.beds} {item.beds === 1 ? 'bed' : 'beds'}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 group-hover:text-blue-600 transition-colors">
              <Bath className="w-4 h-4" />
              <span className="text-sm font-medium">{item.baths} {item.baths === 1 ? 'bath' : 'baths'}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 group-hover:text-blue-600 transition-colors">
              <Square className="w-4 h-4" />
              <span className="text-sm font-medium">{item.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
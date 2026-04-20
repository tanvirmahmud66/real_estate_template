"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import SectionTitle from "../ui/SectionTitle";
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "David Miller",
    location: "New York, NY",
    rating: 5,
    text: "Houzez helped me find my dream home in just 2 weeks! The team was professional and attentive to all my needs. I couldn't be happier with my new home purchase.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format",
    role: "Homeowner",
    date: "March 2024"
  },
  {
    id: 2,
    name: "Lisa Thompson",
    location: "Los Angeles, CA",
    rating: 5,
    text: "Excellent service! They made selling my property quick and hassle-free. Highly recommended to anyone looking to buy or sell real estate.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format",
    role: "Seller",
    date: "February 2024"
  },
  {
    id: 3,
    name: "James Wilson",
    location: "Miami, FL",
    rating: 5,
    text: "The best real estate platform I've used. Great properties and amazing customer support. Will definitely use their services again.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format",
    role: "Investor",
    date: "January 2024"
  },
  {
    id: 4,
    name: "Sarah Chen",
    location: "Seattle, WA",
    rating: 5,
    text: "Outstanding experience from start to finish. The agents went above and beyond to find us the perfect property within our budget.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format",
    role: "First-time Buyer",
    date: "December 2023"
  },
  {
    id: 5,
    name: "Robert Taylor",
    location: "Austin, TX",
    rating: 5,
    text: "Professional, responsive, and knowledgeable. They made the entire home buying process stress-free and enjoyable.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format",
    role: "Buyer",
    date: "November 2023"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!mounted || !isAutoPlaying) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [mounted, isAutoPlaying, next]);

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const getImageSrc = (testimonial) => {
    if (imageErrors[testimonial.id]) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=2563EB&color=fff&bold=true&length=2&size=200`;
    }
    return testimonial.image;
  };

  const totalReviews = testimonials.length;
  const avgRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);

  if (!mounted) {
    return (
      <div className="py-16 md:py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="What Our Clients Say" 
            subtitle="Real stories from happy homeowners"
          />
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-12 h-96 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="What Our Clients Say" 
          subtitle="Real stories from happy homeowners"
        />

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{totalReviews}+</div>
            <div className="text-xs text-gray-600">Happy Clients</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{avgRating}</div>
            <div className="text-xs text-gray-600">Avg Rating</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-xs text-gray-600">Recommend</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">500+</div>
            <div className="text-xs text-gray-600">Reviews</div>
          </div>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Decorations */}
          <div className="absolute -top-6 -left-6 text-blue-200 opacity-30 hidden md:block">
            <Quote className="w-20 h-20" />
          </div>
          <div className="absolute -bottom-6 -right-6 text-blue-200 opacity-30 transform rotate-180 hidden md:block">
            <Quote className="w-20 h-20" />
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 transition-all duration-500">
            {/* Rating Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 transition-all duration-300 ${
                    i < testimonials[current].rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            
            {/* Testimonial Text */}
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center mb-8 min-h-[120px]">
              "{testimonials[current].text}"
            </p>
            
            {/* Author Info */}
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-4 ring-blue-100">
                <Image
                  src={getImageSrc(testimonials[current])}
                  alt={testimonials[current].name}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(testimonials[current].id)}
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  {testimonials[current].name}
                </h4>
                <p className="text-sm text-gray-500">{testimonials[current].location}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-blue-600 font-medium">
                    {testimonials[current].role}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">
                    {testimonials[current].date}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => { prev(); setIsAutoPlaying(false); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-blue-600" />
          </button>
          <button
            onClick={() => { next(); setIsAutoPlaying(false); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-blue-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrent(idx); setIsAutoPlaying(false); }}
              className={`transition-all duration-300 rounded-full ${
                current === idx
                  ? "bg-blue-600 w-6 h-2"
                  : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all text-sm text-gray-600 hover:text-blue-600"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Pause Auto-play</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Resume Auto-play</span>
              </>
            )}
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Verified Reviews</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>5-Star Rated</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs text-blue-600">✓</span>
            </div>
            <span>100% Real Clients</span>
          </div>
        </div>
      </div>
    </div>
  );
}
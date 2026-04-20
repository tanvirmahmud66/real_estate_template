"use client";
import { useState, useEffect } from "react";
import SectionTitle from "../ui/SectionTitle";
import Link from "next/link";
import {
  Home,
  Building,
  Factory,
  Ship,
  TreePine,
  Store,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    icon: Home,
    name: "Residential",
    count: 2345,
    color: "bg-blue-100 text-blue-600",
    hoverColor: "hover:bg-blue-600",
    href: "/properties?type=residential",
    description: "Houses, apartments & condos",
  },
  {
    icon: Building,
    name: "Commercial",
    count: 876,
    color: "bg-purple-100 text-purple-600",
    hoverColor: "hover:bg-purple-600",
    href: "/properties?type=commercial",
    description: "Offices & retail spaces",
  },
  {
    icon: Factory,
    name: "Industrial",
    count: 432,
    color: "bg-orange-100 text-orange-600",
    hoverColor: "hover:bg-orange-600",
    href: "/properties?type=industrial",
    description: "Warehouses & factories",
  },
  {
    icon: Ship,
    name: "Luxury",
    count: 156,
    color: "bg-pink-100 text-pink-600",
    hoverColor: "hover:bg-pink-600",
    href: "/properties?type=luxury",
    description: "Premium & exclusive",
  },
  {
    icon: TreePine,
    name: "Land",
    count: 654,
    color: "bg-green-100 text-green-600",
    hoverColor: "hover:bg-green-600",
    href: "/properties?type=land",
    description: "Vacant lots & acreage",
  },
  {
    icon: Store,
    name: "Retail",
    count: 321,
    color: "bg-yellow-100 text-yellow-600",
    hoverColor: "hover:bg-yellow-600",
    href: "/properties?type=retail",
    description: "Shops & storefronts",
  },
];

export default function Categories() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalListings = categories.reduce((sum, cat) => sum + cat.count, 0);

  if (!mounted) {
    return (
      <div className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 text-center h-40 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Fixed Background Image with better visibility */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format')",
        }}
      />

      {/* Lighter Overlay for better image visibility */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-white font-medium">Categories</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Browse by Category
          </h2>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto">
            Find properties that match your specific needs
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link key={index} href={category.href} className="group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/20 border border-white/20 shadow-lg">
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:text-white ${category.hoverColor}`}
                  >
                    <Icon className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors text-sm md:text-base">
                    {category.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300 mt-1">
                    {category.count.toLocaleString()} listings
                  </p>
                  <p className="text-xs text-gray-400 mt-2 hidden md:block">
                    {category.description}
                  </p>

                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowRight className="w-4 h-4 text-blue-400 mx-auto" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}

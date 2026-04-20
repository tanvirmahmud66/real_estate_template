"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "../ui/SectionTitle";
import {
  Phone,
  Mail,
  Star,
  Award,
  Calendar,
  MessageCircle,
  ChevronRight,
  MapPin,
  CheckCircle,
} from "lucide-react";

const agents = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Real Estate Agent",
    experience: "12 years",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format",
    phone: "(555) 123-4567",
    email: "sarah@houzez.com",
    rating: 4.9,
    deals: 342,
    reviews: 128,
    specialties: ["Luxury Homes", "Waterfront Properties"],
    location: "Beverly Hills, CA",
    languages: ["English", "Spanish"],
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Luxury Property Specialist",
    experience: "8 years",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format",
    phone: "(555) 234-5678",
    email: "michael@houzez.com",
    rating: 4.8,
    deals: 256,
    reviews: 94,
    specialties: ["Penthouses", "Modern Architecture"],
    location: "New York, NY",
    languages: ["English", "Mandarin"],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Commercial Real Estate Expert",
    experience: "10 years",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format",
    phone: "(555) 345-6789",
    email: "emily@houzez.com",
    rating: 5.0,
    deals: 428,
    reviews: 156,
    specialties: ["Commercial Spaces", "Investment Properties"],
    location: "Miami, FL",
    languages: ["English", "Portuguese"],
  },
  {
    id: 4,
    name: "David Williams",
    role: "First-Time Home Buyer Specialist",
    experience: "6 years",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format",
    phone: "(555) 456-7890",
    email: "david@houzez.com",
    rating: 4.7,
    deals: 189,
    reviews: 67,
    specialties: ["First-Time Buyers", "Condos"],
    location: "Austin, TX",
    languages: ["English"],
  },
];

export default function Agents() {
  const [imageErrors, setImageErrors] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageError = (agentId) => {
    setImageErrors((prev) => ({ ...prev, [agentId]: true }));
  };

  const getImageSrc = (agent) => {
    if (imageErrors[agent.id]) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=2563EB&color=fff&bold=true&length=2&size=400`;
    }
    return agent.image;
  };

  const totalDeals = agents.reduce((sum, agent) => sum + agent.deals, 0);
  const avgRating = (
    agents.reduce((sum, agent) => sum + agent.rating, 0) / agents.length
  ).toFixed(1);

  if (!mounted) {
    return (
      <div className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Meet Our Expert Agents"
            subtitle="Professional guidance for your real estate journey"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-96 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Meet Our Expert Agents"
          subtitle="Professional guidance for your real estate journey"
        />

        {/* Agents Grid - 4 cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                <Image
                  src={getImageSrc(agent)}
                  alt={agent.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={() => handleImageError(agent.id)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  {agent.rating}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-blue-600 font-semibold text-xs">
                      {agent.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">
                      {agent.deals}
                    </div>
                    <div className="text-xs text-gray-500">deals</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{agent.location}</span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {agent.specialties.slice(0, 2).map((specialty, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Experience & Languages */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    <span>{agent.experience}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>{agent.languages[0]}</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-1.5 pt-3 border-t border-gray-100">
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition text-sm group"
                  >
                    <Phone className="w-3.5 h-3.5 group-hover:scale-110 transition" />
                    <span>{agent.phone}</span>
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition text-sm group truncate"
                  >
                    <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition flex-shrink-0" />
                    <span className="truncate">{agent.email}</span>
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-blue-600 text-white text-xs py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-1 hover:scale-105">
                    <Calendar className="w-3 h-3" />
                    Schedule
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-600 text-xs py-2 rounded-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-1 hover:scale-105">
                    <MessageCircle className="w-3 h-3" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Agents CTA */}
        <div className="text-center mt-12">
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg group"
          >
            View All Agents
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

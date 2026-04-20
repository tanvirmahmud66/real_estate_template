"use client";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Search, 
  X, 
  Phone, 
  Mail, 
  Star, 
  Award, 
  Calendar, 
  MessageCircle,
  MapPin,
  CheckCircle,
  Filter,
  ChevronDown,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Users,
  TrendingUp,
  Briefcase
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Extended agents data
const agents = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Real Estate Agent",
    experience: "12 years",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format",
    phone: "(555) 123-4567",
    email: "sarah@houzez.com",
    rating: 4.9,
    deals: 342,
    reviews: 128,
    specialties: ["Luxury Homes", "Waterfront Properties"],
    location: "Beverly Hills, CA",
    languages: ["English", "Spanish"],
    license: "BRE #01234567",
    about: "Expert in luxury properties with over a decade of experience."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Luxury Property Specialist",
    experience: "8 years",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format",
    phone: "(555) 234-5678",
    email: "michael@houzez.com",
    rating: 4.8,
    deals: 256,
    reviews: 94,
    specialties: ["Penthouses", "Modern Architecture"],
    location: "New York, NY",
    languages: ["English", "Mandarin"],
    license: "BRE #02345678",
    about: "Specializing in modern luxury penthouses with stunning views."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Commercial Real Estate Expert",
    experience: "10 years",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format",
    phone: "(555) 345-6789",
    email: "emily@houzez.com",
    rating: 5.0,
    deals: 428,
    reviews: 156,
    specialties: ["Commercial Spaces", "Investment Properties"],
    location: "Miami, FL",
    languages: ["English", "Portuguese"],
    license: "BRE #03456789",
    about: "Commercial real estate expert with proven investment strategies."
  },
  {
    id: 4,
    name: "David Williams",
    role: "First-Time Home Buyer Specialist",
    experience: "6 years",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format",
    phone: "(555) 456-7890",
    email: "david@houzez.com",
    rating: 4.7,
    deals: 189,
    reviews: 67,
    specialties: ["First-Time Buyers", "Condos"],
    location: "Austin, TX",
    languages: ["English"],
    license: "BRE #04567890",
    about: "Passionate about helping first-time buyers find their dream home."
  },
  {
    id: 5,
    name: "Jessica Taylor",
    role: "Waterfront Property Expert",
    experience: "9 years",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format",
    phone: "(555) 567-8901",
    email: "jessica@houzez.com",
    rating: 4.9,
    deals: 298,
    reviews: 112,
    specialties: ["Beachfront", "Lake Properties"],
    location: "Miami, FL",
    languages: ["English", "French"],
    license: "BRE #05678901",
    about: "Waterfront property specialist with exclusive beachfront listings."
  },
  {
    id: 6,
    name: "Robert Martinez",
    role: "Investment Property Specialist",
    experience: "11 years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format",
    phone: "(555) 678-9012",
    email: "robert@houzez.com",
    rating: 4.8,
    deals: 412,
    reviews: 143,
    specialties: ["Multi-Family", "Fix & Flip"],
    location: "Chicago, IL",
    languages: ["English", "Spanish"],
    license: "BRE #06789012",
    about: "Investment property specialist with high ROI portfolio."
  },
  {
    id: 7,
    name: "Amanda Lee",
    role: "Relocation Specialist",
    experience: "7 years",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2070&auto=format",
    phone: "(555) 789-0123",
    email: "amanda@houzez.com",
    rating: 4.8,
    deals: 234,
    reviews: 89,
    specialties: ["Corporate Relocation", "Family Homes"],
    location: "Seattle, WA",
    languages: ["English", "Korean"],
    license: "BRE #07890123",
    about: "Specializing in corporate relocation and family-friendly neighborhoods."
  },
  {
    id: 8,
    name: "Thomas Brown",
    role: "Luxury Estate Agent",
    experience: "15 years",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format",
    phone: "(555) 890-1234",
    email: "thomas@houzez.com",
    rating: 5.0,
    deals: 567,
    reviews: 201,
    specialties: ["Mega Mansions", "Celebrity Homes"],
    location: "Los Angeles, CA",
    languages: ["English"],
    license: "BRE #08901234",
    about: "Top luxury estate agent with record-breaking sales."
  }
];

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setMounted(true);
  }, []);

  const specialties = [
    "All Specialties",
    "Luxury Homes",
    "Waterfront Properties",
    "Penthouses",
    "Commercial Spaces",
    "Investment Properties",
    "First-Time Buyers",
    "Beachfront",
    "Multi-Family"
  ];

  const ratingOptions = [
    { value: "", label: "Any Rating" },
    { value: "4.5", label: "4.5+ Stars" },
    { value: "4.8", label: "4.8+ Stars" },
    { value: "5", label: "5 Stars" }
  ];

  const sortOptions = [
    { value: "rating", label: "Highest Rated" },
    { value: "deals", label: "Most Deals" },
    { value: "experience", label: "Most Experienced" },
    { value: "name_asc", label: "Name: A to Z" },
    { value: "name_desc", label: "Name: Z to A" }
  ];

  const filteredAgents = useMemo(() => {
    let filtered = [...agents];

    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedSpecialty && selectedSpecialty !== "All Specialties") {
      filtered = filtered.filter(agent =>
        agent.specialties.includes(selectedSpecialty)
      );
    }

    if (minRating) {
      filtered = filtered.filter(agent => agent.rating >= parseFloat(minRating));
    }

    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "deals":
        filtered.sort((a, b) => b.deals - a.deals);
        break;
      case "experience":
        filtered.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
        break;
      case "name_asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [agents, searchTerm, selectedSpecialty, minRating, sortBy]);

  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAgents = filteredAgents.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSpecialty, minRating, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("");
    setMinRating("");
    setSortBy("rating");
    setCurrentPage(1);
  };

  const activeFiltersCount = [searchTerm, selectedSpecialty, minRating].filter(Boolean).length;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
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

  const totalDeals = agents.reduce((sum, agent) => sum + agent.deals, 0);
  const avgRating = (agents.reduce((sum, agent) => sum + agent.rating, 0) / agents.length).toFixed(1);

  if (!mounted) {
    return (
      <>
        <Navbar />
        <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
      
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format"
          alt="Our Agents"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Meet Our Expert Agents
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto">
            Professional guidance from industry leaders
          </p>
          
          <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">{agents.length}+ Licensed Professionals</span>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-white shadow-md -mt-8 relative z-20 mx-4 sm:mx-6 lg:mx-auto max-w-7xl rounded-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{agents.length}</div>
            <div className="text-sm text-gray-600">Expert Agents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalDeals.toLocaleString()}+</div>
            <div className="text-sm text-gray-600">Deals Closed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{avgRating}</div>
            <div className="text-sm text-gray-600">Avg. Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-gray-600">Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, role, location, or specialty..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              
              <div className="md:col-span-3 relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="md:col-span-3 relative">
                <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                >
                  {ratingOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="md:col-span-1">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Sort</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Sort Options */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <div className="flex flex-wrap gap-2">
                    {sortOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          sortBy === option.value
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={handleResetFilters}
                      className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 ml-auto"
                    >
                      <X className="w-3 h-3" />
                      Reset all
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Found <span className="font-semibold text-gray-900">{filteredAgents.length}</span> expert agents
            </p>
            <p className="text-sm text-gray-500">
              Showing {currentAgents.length} of {filteredAgents.length} agents
            </p>
          </div>

          {/* Agents Grid */}
          {currentAgents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentAgents.map((agent) => (
                  <Link key={agent.id} href={`/agents/${agent.id}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                        <Image
                          src={agent.image}
                          alt={agent.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold flex items-center gap-1 shadow-sm">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          {agent.rating}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {agent.name}
                            </h3>
                            <p className="text-blue-600 font-semibold text-xs">{agent.role}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900">{agent.deals}</div>
                            <div className="text-xs text-gray-500">deals</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{agent.location}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {agent.specialties.slice(0, 2).map((specialty, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                        
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
                        
                        <div className="space-y-1.5 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{agent.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 text-sm truncate">
                            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{agent.email}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <button className="flex-1 bg-blue-600 text-white text-xs py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Schedule
                          </button>
                          <button className="flex-1 border border-blue-600 text-blue-600 text-xs py-2 rounded-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
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
                          : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-md"
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
                          : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-md"
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No agents found</h3>
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
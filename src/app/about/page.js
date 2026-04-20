"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  Home, 
  Smile, 
  Award, 
  Shield, 
  Clock, 
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Star,
  Building2,
  Heart,
  Target,
  Globe
} from "lucide-react";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { icon: Users, value: "10k+", label: "Happy Clients", color: "from-blue-500 to-blue-600" },
    { icon: Home, value: "5k+", label: "Properties Sold", color: "from-green-500 to-green-600" },
    { icon: Smile, value: "98%", label: "Satisfaction Rate", color: "from-purple-500 to-purple-600" },
    { icon: Award, value: "25+", label: "Industry Awards", color: "from-yellow-500 to-yellow-600" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We believe in honest communication and transparent processes throughout your real estate journey."
    },
    {
      icon: Clock,
      title: "Efficiency",
      description: "Our streamlined processes ensure quick response times and faster closings."
    },
    {
      icon: TrendingUp,
      title: "Market Expertise",
      description: "Deep local market knowledge and data-driven insights for informed decisions."
    },
    {
      icon: Heart,
      title: "Client First",
      description: "Your goals and satisfaction are at the heart of everything we do."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format",
      experience: "15+ years"
    },
    {
      name: "Michael Chen",
      role: "Head of Sales",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format",
      experience: "12+ years"
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format",
      experience: "10+ years"
    },
    {
      name: "David Williams",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format",
      experience: "8+ years"
    }
  ];

  if (!mounted) {
    return (
      <>
        <Navbar />
        <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-2xl mb-8" />
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="h-64 bg-gray-200 rounded" />
                <div className="h-64 bg-gray-200 rounded" />
              </div>
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
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format"
          alt="About Houzez"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 mb-4">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">Since 2015</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About Houzez
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto">
            Your trusted partner in finding the perfect property with excellence and integrity
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Our Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold mb-4">
                <Heart className="w-4 h-4" />
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Building Dreams Since 2015
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2015, Houzez has grown to become one of the most trusted real estate platforms in the country. 
                We've helped thousands of families find their dream homes and assisted investors in making profitable property investments.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our mission is simple: to make the process of buying, selling, and renting properties seamless, transparent, 
                and enjoyable for everyone involved. We combine local expertise with innovative technology to deliver exceptional results.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Licensed Professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Best Price Guarantee</span>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format"
                alt="Our team working"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-medium">Our dedicated team at work</p>
              </div>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold mb-4">
                <Target className="w-4 h-4" />
                Our Values
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Drives Us
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Core principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leadership Team Section */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold mb-4">
                <Users className="w-4 h-4" />
                Leadership
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Leadership Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experienced professionals dedicated to your success
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="relative h-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 text-sm font-medium mb-1">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.experience} experience</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Office Locations */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold mb-4">
                <Globe className="w-4 h-4" />
                Our Presence
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Office Locations
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Serving clients across major metropolitan areas
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {["New York", "Los Angeles", "Miami", "Chicago"].map((city, index) => (
                <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">{city}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Contact us today and let our expert agents guide you through your real estate journey
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/properties" 
                className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Add missing ArrowRight import
import { ArrowRight } from "lucide-react";
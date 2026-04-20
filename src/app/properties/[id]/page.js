"use client";
import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { properties } from "@/data/properties";
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  MessageCircle,
  Heart,
  Share2,
  Printer,
  ArrowLeft,
  CheckCircle,
  Wifi,
  Car,
  Wind,
  Thermometer,
  Tv,
  Shield,
  Star,
  Users,
  Clock,
  Award,
  Home,
  X,
  TrendingUp,
  Building2
} from "lucide-react";

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = parseInt(params.id);
  const property = properties.find(p => p.id === propertyId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    date: "",
    time: ""
  });

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const getImageSrc = (index) => {
    if (imageErrors[index]) {
      return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format";
    }
    return images[index];
  };

  if (!mounted) {
    return (
      <>
        <Navbar />
        <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-2xl mb-8" />
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
                  <div className="h-32 bg-gray-200 rounded mb-6" />
                  <div className="h-48 bg-gray-200 rounded" />
                </div>
                <div className="h-96 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!property) {
    notFound();
  }

  const images = [
    property.image,
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format",
  ];

  const amenities = [
    { icon: Wifi, name: "High-Speed WiFi", included: true },
    { icon: Car, name: "Parking Space", included: true },
    { icon: Wind, name: "Central AC", included: true },
    { icon: Thermometer, name: "Heating System", included: true },
    { icon: Tv, name: "Smart TV", included: true },
    { icon: Shield, name: "Security System", included: property.price > 500000 },
  ];

  const similarProperties = properties
    .filter(p => p.type === property.type && p.id !== property.id)
    .slice(0, 3);

  const nearbyPlaces = [
    { name: "Central Park", distance: "0.5 miles", type: "Park", time: "5 min walk" },
    { name: "Metro Station", distance: "0.2 miles", type: "Transport", time: "3 min walk" },
    { name: "Shopping Mall", distance: "1.2 miles", type: "Shopping", time: "5 min drive" },
    { name: "City Hospital", distance: "1.5 miles", type: "Healthcare", time: "7 min drive" },
    { name: "International School", distance: "0.8 miles", type: "Education", time: "4 min drive" },
    { name: "Restaurant District", distance: "0.3 miles", type: "Dining", time: "6 min walk" },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("✓ Thank you! An agent will contact you shortly.");
    setFormData({ name: "", email: "", phone: "", message: "", date: "", time: "" });
    setShowContactForm(false);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    alert("✓ Tour scheduled! We'll send a confirmation email with details.");
    setFormData({ name: "", email: "", phone: "", message: "", date: "", time: "" });
    setShowScheduleForm(false);
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${price.toLocaleString()}`;
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <Image
          src={property.image}
          alt={property.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-white transition">Properties</Link>
            <span>/</span>
            <span className="text-white">{property.title}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            {property.title}
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-gray-200 mb-4">
            <MapPin className="w-4 h-4" />
            <span>{property.location}</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5">
              <Bed className="w-4 h-4" />
              <span className="text-sm">{property.beds} Beds</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5">
              <Bath className="w-4 h-4" />
              <span className="text-sm">{property.baths} Baths</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5">
              <Square className="w-4 h-4" />
              <span className="text-sm">{formatNumber(property.sqft)} Sq Ft</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5">
              <Home className="w-4 h-4" />
              <span className="text-sm">{property.type}</span>
            </div>
          </div>
          
          <div className="mt-6 inline-flex items-center gap-2 bg-green-500/90 backdrop-blur-md rounded-full px-5 py-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-semibold">{formatPrice(property.price)}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          
          {/* Back Button */}
          <div className="mb-6">
            <Link 
              href="/properties" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition bg-white px-4 py-2 rounded-lg shadow-md group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
              Back to Properties
            </Link>
          </div>

          {/* Action Buttons Bar */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-3">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-red-50 transition group"
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600 group-hover:text-red-500"}`} />
                <span className="text-sm">Save</span>
              </button>
              <button 
                onClick={() => navigator.share ? navigator.share({ title: property.title, url: window.location.href }) : alert("Link copied!")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-blue-50 transition group"
              >
                <Share2 className="w-4 h-4 text-gray-600 group-hover:text-blue-500" />
                <span className="text-sm">Share</span>
              </button>
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <Printer className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Print</span>
              </button>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{formatPrice(property.price)}</div>
              <p className="text-xs text-gray-500">Est. payment: {formatPrice(property.price * 0.007)}/mo</p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid lg:grid-cols-4 gap-4 mb-8">
            <div className="lg:col-span-3 relative h-80 md:h-96 lg:h-[450px] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
              <Image
                src={getImageSrc(selectedImage)}
                alt={property.title}
                fill
                className="object-cover"
                priority
                onError={() => handleImageError(selectedImage)}
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {images.slice(1, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx + 1)}
                  className="relative h-32 lg:h-[140px] rounded-xl overflow-hidden hover:opacity-80 transition bg-gray-100 shadow-md"
                >
                  <Image
                    src={getImageSrc(idx + 1)}
                    alt={`Property view ${idx + 2}`}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(idx + 1)}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Features */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Key Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                    <Bed className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="font-bold text-gray-900">{property.beds}</div>
                    <div className="text-xs text-gray-500">Bedrooms</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                    <Bath className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="font-bold text-gray-900">{property.baths}</div>
                    <div className="text-xs text-gray-500">Bathrooms</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                    <Square className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="font-bold text-gray-900">{formatNumber(property.sqft)}</div>
                    <div className="text-xs text-gray-500">Sq Ft</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                    <Building2 className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="font-bold text-gray-900">{property.type}</div>
                    <div className="text-xs text-gray-500">Property Type</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {property.description || `Welcome to this stunning ${property.type.toLowerCase()} located in the heart of ${property.location}. This beautiful property offers ${property.beds} bedrooms and ${property.baths} bathrooms across ${formatNumber(property.sqft)} square feet of luxurious living space.

                  The home features modern finishes, an open floor plan, and abundant natural light. The gourmet kitchen comes equipped with stainless steel appliances, granite countertops, and a large island perfect for entertaining.

                  The master suite includes a walk-in closet and spa-like bathroom. Additional features include hardwood floors throughout, central HVAC, and a private backyard. Located in a prime neighborhood close to schools, shopping, and dining.`}
                </p>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities & Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.map((amenity, idx) => {
                    const Icon = amenity.icon;
                    return (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition">
                        {amenity.included ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                        <Icon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{amenity.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Nearby Places */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Places</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {nearbyPlaces.map((place, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div>
                        <div className="font-medium text-gray-900">{place.name}</div>
                        <div className="text-xs text-gray-500">{place.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-700">{place.distance}</div>
                        <div className="text-xs text-gray-400">{place.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar Properties */}
              {similarProperties.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Properties</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {similarProperties.map((similar) => (
                      <Link key={similar.id} href={`/properties/${similar.id}`}>
                        <div className="group cursor-pointer">
                          <div className="relative h-40 rounded-lg overflow-hidden mb-2 bg-gray-100">
                            <Image
                              src={similar.image}
                              alt={similar.title}
                              fill
                              className="object-cover group-hover:scale-110 transition duration-300"
                            />
                          </div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">
                            {similar.title}
                          </h3>
                          <p className="text-sm text-gray-500">{similar.location}</p>
                          <p className="text-lg font-bold text-blue-600">{formatPrice(similar.price)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Agent & Contact */}
            <div className="space-y-6">
              {/* Agent Card */}
              {property.agent && (
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-28">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Listing Agent</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src={property.agent.avatar}
                        alt={property.agent.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{property.agent.name}</h3>
                      <p className="text-sm text-gray-500">Real Estate Agent</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-medium">4.9</span>
                        <span className="text-xs text-gray-500">(128 reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <a href={`tel:${property.agent.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{property.agent.phone}</span>
                    </a>
                    <a href={`mailto:${property.agent.email}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm truncate">{property.agent.email}</span>
                    </a>
                  </div>

                  <div className="flex gap-2">
                    <a 
                      href={`tel:${property.agent.phone}`}
                      className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </a>
                    <button 
                      onClick={() => setShowContactForm(true)}
                      className="flex-1 border border-blue-600 text-blue-600 py-2.5 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span>Top Producer 2024</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>342+ Deals Closed</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span>Response within 1 hour</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Schedule Tour */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2">Schedule a Tour</h3>
                <p className="text-sm text-blue-100 mb-4">Visit this property in person</p>
                <button 
                  onClick={() => setShowScheduleForm(true)}
                  className="w-full bg-white text-blue-600 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Request Showing
                </button>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Quick Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Property ID:</span>
                    <span className="text-gray-900 font-medium">#{property.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price per Sq Ft:</span>
                    <span className="text-gray-900 font-medium">${Math.round(property.price / property.sqft)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Property Type:</span>
                    <span className="text-gray-900 font-medium">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Year Built:</span>
                    <span className="text-gray-900 font-medium">2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Listing Date:</span>
                    <span className="text-gray-900 font-medium">March 2024</span>
                  </div>
                </div>
              </div>

              {/* Market Trend */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  Market Trend
                </h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+12.5%</div>
                  <p className="text-xs text-gray-500">Estimated value increase in last year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowContactForm(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Contact Agent</h3>
              <button onClick={() => setShowContactForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name *"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Your Email *"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <textarea
                placeholder="Message *"
                rows="3"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Tour Modal */}
      {showScheduleForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowScheduleForm(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Schedule a Tour</h3>
              <button onClick={() => setShowScheduleForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name *"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Your Email *"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Your Phone *"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  placeholder="Date"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
                <input
                  type="time"
                  placeholder="Time"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
              <textarea
                placeholder="Additional Notes"
                rows="2"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold">
                Request Showing
              </button>
            </form>
          </div>
        </div>
      )}

    </>
  );
}
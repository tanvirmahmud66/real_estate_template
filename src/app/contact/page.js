"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  MessageCircle,
  Headphones,
  Award,
  Users
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["(555) 123-4567", "(555) 123-4568"],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@houzez.com", "support@houzez.com"],
      color: "bg-green-100 text-green-600"
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Real Estate Avenue", "New York, NY 10001"],
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const faqs = [
    {
      question: "How can I schedule a property viewing?",
      answer: "You can schedule a viewing by calling our office directly or using the contact form above. Our agents will get back to you within 24 hours."
    },
    {
      question: "What areas do you serve?",
      answer: "We serve major metropolitan areas across the United States including New York, Los Angeles, Miami, Chicago, San Francisco, and Austin."
    },
    {
      question: "Do you offer virtual tours?",
      answer: "Yes, we offer 3D virtual tours for all our properties. You can view them online or request a live video tour with one of our agents."
    },
    {
      question: "How do I get a property valuation?",
      answer: "Contact us through the form or call our office to schedule a free property valuation with one of our expert agents."
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1422222948315-28aadb7a2cb8?q=80&w=2070&auto=format"
          alt="Contact Us"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto">
            We're here to help with all your real estate needs
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-8 relative z-20">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className={`w-12 h-12 ${info.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-sm text-gray-600">{detail}</p>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">10k+</div>
              <div className="text-xs text-gray-500">Happy Clients</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <MessageCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">24/7</div>
              <div className="text-xs text-gray-500">Support Available</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <Headphones className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">&lt; 1hr</div>
              <div className="text-xs text-gray-500">Response Time</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <Award className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">98%</div>
              <div className="text-xs text-gray-500">Satisfaction</div>
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you shortly</p>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-700">Thank you! Your message has been sent successfully.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map and Social */}
            <div className="space-y-6">
              {/* Map */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb2c4a5%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition hover:scale-110">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition hover:scale-110">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition hover:scale-110">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2" stroke="none"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition hover:scale-110">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2">Emergency?</h3>
                <p className="text-red-100 mb-4">24/7 Emergency support available</p>
                <a href="tel:+15551234567" className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                  <Phone className="w-4 h-4" />
                  Call Emergency Line
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
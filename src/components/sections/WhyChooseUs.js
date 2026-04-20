"use client";
import {
  Shield,
  Clock,
  ThumbsUp,
  Award,
  Users,
  Headphones,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "100% safe and secure property deals with escrow protection",
    stat: "$2.5B+ Protected",
  },
  {
    icon: Clock,
    title: "Fast Process",
    description:
      "Quick and efficient service with average closing time of 30 days",
    stat: "30 Days Avg",
  },
  {
    icon: ThumbsUp,
    title: "Best Price Guarantee",
    description:
      "We match any competitor price and ensure you get the best deal",
    stat: "98% Match Rate",
  },
  {
    icon: Award,
    title: "Expert Agents",
    description: "Certified real estate professionals with years of experience",
    stat: "500+ Experts",
  },
  {
    icon: Users,
    title: "Happy Clients",
    description: "Trusted by thousands of satisfied homeowners and investors",
    stat: "10,000+ Happy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help you with dedicated customer support team",
    stat: "24/7 Available",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Why Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Why Choose <span className="text-blue-600">Houzez?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide the best real estate experience with unmatched service
            and expertise
          </p>
          <div className="w-20 h-1 bg-blue-600 rounded-full mt-4 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-3">{feature.description}</p>
                <div className="flex items-center gap-1 text-sm text-blue-600 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  {feature.stat}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

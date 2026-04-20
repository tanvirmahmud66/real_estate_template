// "use client";
// import { useState, useEffect } from "react";
// import SectionTitle from "../ui/SectionTitle";
// import PropertyCard from "../ui/PropertyCard";
// import { properties } from "@/data/properties";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function FeaturedListings() {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const itemsPerPage = 3;
  
//   const featuredProperties = properties.filter(p => p.featured).slice(0, 6);
//   const totalPages = Math.ceil(featuredProperties.length / itemsPerPage);
//   const currentProperties = featuredProperties.slice(
//     currentPage * itemsPerPage,
//     (currentPage + 1) * itemsPerPage
//   );

//   useEffect(() => {
//     // Simulate loading for smooth animation
//     const timer = setTimeout(() => setIsLoading(false), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   const nextPage = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto py-20 px-6">
//         <SectionTitle title="Discover Our Featured Listings" />
//         <div className="grid md:grid-cols-3 gap-6">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse" />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto py-20 px-6">
//       <SectionTitle 
//         title="Discover Our Featured Listings" 
//         subtitle="Handpicked properties just for you"
//       />
      
//       {featuredProperties.length > 0 ? (
//         <>
//           <div className="grid md:grid-cols-3 gap-6">
//             {currentProperties.map((item, index) => (
//               <div 
//                 key={item.id} 
//                 className="animate-fadeInUp"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <PropertyCard item={item} />
//               </div>
//             ))}
//           </div>

//           {/* Pagination for more than 3 featured properties */}
//           {featuredProperties.length > 3 && (
//             <div className="flex justify-center items-center gap-4 mt-10">
//               <button
//                 onClick={prevPage}
//                 disabled={currentPage === 0}
//                 className={`p-2 rounded-full transition-all ${
//                   currentPage === 0
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-700"
//                 }`}
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
              
//               <div className="flex gap-2">
//                 {Array.from({ length: totalPages }).map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentPage(idx)}
//                     className={`w-2 h-2 rounded-full transition-all ${
//                       currentPage === idx
//                         ? "bg-blue-600 w-6"
//                         : "bg-gray-300 hover:bg-gray-400"
//                     }`}
//                   />
//                 ))}
//               </div>
              
//               <button
//                 onClick={nextPage}
//                 disabled={currentPage === totalPages - 1}
//                 className={`p-2 rounded-full transition-all ${
//                   currentPage === totalPages - 1
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-700"
//                 }`}
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No featured properties available at the moment.</p>
//         </div>
//       )}
//     </div>
//   );
// }

























"use client";
import { useState, useEffect } from "react";
import SectionTitle from "../ui/SectionTitle";
import PropertyCard from "../ui/PropertyCard";
import { properties } from "@/data/properties";
import { ChevronLeft, ChevronRight, TrendingUp, Home, DollarSign } from "lucide-react";

export default function FeaturedListings() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 4;
  
  const featuredProperties = properties.filter(p => p.featured).slice(0, 8);
  const totalPages = Math.ceil(featuredProperties.length / itemsPerPage);
  const currentProperties = featuredProperties.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalValue = featuredProperties.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = totalValue / featuredProperties.length;

  if (isLoading) {
    return (
      <div className="w-full py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Discover Our Featured Listings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Loading amazing properties...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Discover Our Featured Listings" 
          subtitle="Handpicked properties just for you"
        />
        
        
        {featuredProperties.length > 0 ? (
          <>
            {/* Properties Grid - 4 cards in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentProperties.map((item, index) => (
                <div 
                  key={item.id} 
                  className="transform transition-all duration-500 hover:-translate-y-2"
                  style={{ 
                    animation: 'fadeInUp 0.5s ease-out forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  <PropertyCard item={item} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {featuredProperties.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    currentPage === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        currentPage === idx
                          ? "bg-blue-600 w-6 h-2"
                          : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    currentPage === totalPages - 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No featured properties available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for new listings!</p>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Button from "../ui/Button";
// import { Menu, X, ChevronDown, Home, Building2, Users, Newspaper, Phone, User, LogIn, UserPlus, Search } from "lucide-react";

// export default function Navbar() {
//   const [scroll, setScroll] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScroll(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [pathname]);

//   const navLinks = [
//     { name: "Home", href: "/", icon: Home },
//     { name: "Properties", href: "/properties", icon: Building2 },
//     { name: "Agents", href: "/agents", icon: Users },
//     { name: "Blog", href: "/blog", icon: Newspaper },
//     { name: "About", href: "/about", icon: User },
//     { name: "Contact", href: "/contact", icon: Phone },
//   ];

//   const isActive = (href) => pathname === href;

//   return (
//     <>
//       <nav
//         className={`fixed w-full z-50 transition-all duration-300 ${
//           scroll 
//             ? "bg-white/95 backdrop-blur-md shadow-lg py-2" 
//             : "bg-transparent py-4"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             {/* Logo */}
//             <Link href="/" className="flex items-center space-x-2 group">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
//                 <span className="text-white font-bold text-xl">H</span>
//               </div>
//               <div>
//                 <span className={`text-xl font-bold transition-colors duration-300 ${
//                   scroll ? "text-gray-900" : "text-white"
//                 }`}>
//                   Houzez
//                 </span>
//                 <span className={`text-xs block -mt-1 transition-colors duration-300 ${
//                   scroll ? "text-gray-500" : "text-gray-300"
//                 }`}>
//                   Real Estate
//                 </span>
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-1">
//               {navLinks.map((link) => {
//                 const Icon = link.icon;
//                 const active = isActive(link.href);
//                 return (
//                   <Link
//                     key={link.name}
//                     href={link.href}
//                     className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${
//                       active
//                         ? scroll
//                           ? "text-blue-600 bg-blue-50"
//                           : "text-white bg-white/20"
//                         : scroll
//                         ? "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
//                         : "text-gray-200 hover:text-white hover:bg-white/10"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       <Icon className="w-4 h-4" />
//                       <span>{link.name}</span>
//                     </div>
//                     {active && (
//                       <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${
//                         scroll ? "bg-blue-600" : "bg-white"
//                       } rounded-full mx-4`} />
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* Desktop Auth Buttons */}
//             <div className="hidden lg:flex items-center gap-3">
//               <button
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
//                   scroll
//                     ? "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
//                     : "text-white hover:bg-white/10"
//                 }`}
//               >
//                 <LogIn className="w-4 h-4" />
//                 <span>Login</span>
//               </button>
//               <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
//                 <UserPlus className="w-4 h-4 inline mr-2" />
//                 Register
//               </Button>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
//                 scroll ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
//               }`}
//             >
//               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`lg:hidden fixed inset-x-0 top-[72px] bg-white shadow-xl transition-all duration-300 transform ${
//             mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
//           }`}
//         >
//           <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
//             {navLinks.map((link) => {
//               const Icon = link.icon;
//               const active = isActive(link.href);
//               return (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
//                     active
//                       ? "bg-blue-50 text-blue-600 font-semibold"
//                       : "text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span>{link.name}</span>
//                   {active && (
//                     <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full" />
//                   )}
//                 </Link>
//               );
//             })}
            
//             <div className="pt-4 border-t border-gray-200 space-y-3">
//               <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
//                 <LogIn className="w-4 h-4" />
//                 Login
//               </button>
//               <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg">
//                 <UserPlus className="w-4 h-4 inline mr-2" />
//                 Register
//               </Button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Overlay for mobile menu */}
//       {mobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setMobileMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// }





















"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";
import { Menu, X, ChevronDown, Home, Building2, Users, Newspaper, Phone, User, LogIn, UserPlus, Search } from "lucide-react";

export default function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Properties", href: "/properties", icon: Building2 },
    { name: "Agents", href: "/agents", icon: Users },
    { name: "About", href: "/about", icon: User },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scroll 
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <span className={`text-xl font-bold transition-colors duration-300 ${
                  scroll ? "text-gray-900" : "text-white"
                }`}>
                  Haven Properties
                </span>
                <span className={`text-xs block -mt-1 transition-colors duration-300 ${
                  scroll ? "text-gray-500" : "text-gray-300"
                }`}>
                  Real Estate
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${
                      active
                        ? scroll
                          ? "text-blue-600 bg-blue-50"
                          : "text-white bg-white/20"
                        : scroll
                        ? "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                        : "text-gray-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </div>
                    {active && (
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        scroll ? "bg-blue-600" : "bg-white"
                      } rounded-full mx-4`} />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  scroll
                    ? "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <UserPlus className="w-4 h-4 inline mr-2" />
                  Register
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                scroll ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-x-0 top-[72px] bg-white shadow-xl transition-all duration-300 transform ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    active
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  )}
                </Link>
              );
            })}
            
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link href="/register">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg">
                  <UserPlus className="w-4 h-4 inline mr-2" />
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <h2 className="text-2xl font-bold">Haven Properties</h2>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Find your dream home with Haven Properties. Professional real estate solutions with exceptional service.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">📘</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">🐦</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">📷</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">🔗</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/properties" className="text-gray-400 hover:text-white transition">Properties</Link></li>
              <li><Link href="/agents" className="text-gray-400 hover:text-white transition">Agents</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <span>📍</span>
                <span>123 Real Estate Ave, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <span>📞</span>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <span>✉️</span>
                <span>info@houzez.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span>🕒</span>
                <span>Mon-Fri: 9am - 6pm</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe for latest property updates
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-green-400 mt-2">
                ✓ Subscribed successfully!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Haven Properties. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms</Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
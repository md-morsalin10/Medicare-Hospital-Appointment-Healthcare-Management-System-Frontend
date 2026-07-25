'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  
  // Dummy Auth State (আপনার Auth Context বা Firebase/Better-Auth দিয়ে এটি পরে রিপ্লেস করবেন)
  const [user, setUser] = useState(null); // e.g., { name: 'Morsalin', photo: '...' }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Doctors', path: '/doctors' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAFC] border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-[#0E7490] hover:opacity-90 transition">
              MediCare
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-base font-medium transition-all duration-200 pb-1 relative ${
                    isActive
                      ? 'text-[#0E7490] font-semibold border-b-2 border-[#0E7490]'
                      : 'text-gray-600 hover:text-[#0E7490]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons / User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // Logged-in view: Dashboard & Profile dropdown trigger
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="text-[#0E7490] font-medium hover:underline"
                >
                  Dashboard
                </Link>
                <div className="w-10 h-10 rounded-full bg-[#0E7490] text-white flex items-center justify-center font-bold cursor-pointer border-2 border-white shadow-md">
                  {user.name ? user.name[0] : 'U'}
                </div>
              </div>
            ) : (
              // Guest view: Sign In & Join Now buttons (hides as per your reference image)
              <>
                <Link
                  href="/login"
                  className="px-6 py-2 rounded-full border-2 border-[#0E7490] text-[#0E7490] font-medium hover:bg-[#0E7490] hover:text-white transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 rounded-full bg-[#0E7490] text-white font-medium hover:bg-[#085369] shadow-sm hover:shadow transition-all duration-200"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button (Optional for responsiveness) */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-600 hover:text-[#0E7490] focus:outline-none"
              onClick={() => alert('Mobile menu toggle')}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Better Auth Client Hook
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log(user, "navbar")


  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/login';
        },
      },
    });
  };

  // Base Nav Links
  const baseNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Doctors', path: '/doctors' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Role-based dashboard path
  const roleMap = {
    admin: '/dashboard/admin',
    doctor: '/dashboard/doctor',
    patient: '/dashboard/patient',
  };
  const dashboardPath = roleMap[user?.role] || '/dashboard/patient';

  // Dynamically add Dashboard link if user is logged in
  const navLinks = user 
    ? [...baseNavLinks, { name: 'Dashboard', path: dashboardPath }]
    : baseNavLinks;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Height: h-16 */}
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-xl bg-[#0E7490]/10 text-[#0E7490] group-hover:scale-105 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-[#0E7490] tracking-tight">
                MediCare
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm transition-all duration-200 py-1 relative ${
                    isActive
                      ? 'text-[#0E7490] font-bold'
                      : 'text-slate-600 hover:text-[#0E7490] font-medium'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0E7490] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons / User Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
            ) : user ? (
              /* User Profile Avatar with Dropdown */
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'User Avatar'}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover border-2 border-[#0E7490] shadow-sm"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#0E7490] text-white flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <Link
                      href={dashboardPath}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#0E7490]" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Guest Buttons */
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl border border-[#0E7490] text-[#0E7490] text-xs font-bold hover:bg-[#0E7490] hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl bg-[#0E7490] text-white text-xs font-bold hover:bg-[#085369] shadow-sm hover:shadow transition-all duration-200"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="p-1.5 rounded-lg text-slate-600 hover:text-[#0E7490] focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-sm font-semibold ${
                pathname === link.path ? 'text-[#0E7490]' : 'text-slate-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <button
                onClick={handleSignOut}
                className="w-full text-center py-2 rounded-xl bg-red-50 text-red-600 font-bold text-xs"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-xl border border-[#0E7490] text-[#0E7490] font-bold text-xs"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-xl bg-[#0E7490] text-white font-bold text-xs"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
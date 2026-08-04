"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Bell,
  Search,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Home,
} from "lucide-react";

// Maps route paths to human-readable page titles
const PAGE_TITLES = {
  "/dashboard/doctor":              "Overview",
  "/dashboard/doctor/appointments": "Appointment Requests",
  "/dashboard/doctor/schedules":    "Manage Schedule",
  "/dashboard/doctor/prescriptions":"Prescriptions",
  "/dashboard/doctor/profile":      "Profile Settings",
  "/dashboard/patient":             "Overview",
  "/dashboard/patient/appointments":"My Appointments",
  "/dashboard/patient/prescriptions":"My Prescriptions",
  "/dashboard/patient/reviews":     "My Reviews",
  "/dashboard/patient/payment-history": "Payment History",
  "/dashboard/patient/profile":     "Profile",
  "/dashboard/admin":               "Overview",
  "/dashboard/admin/manage-users":  "Manage Users",
  "/dashboard/admin/manage-doctors":"Manage Doctors",
  "/dashboard/admin/appointments":  "All Appointments",
  "/dashboard/admin/transactions":  "Transactions",
  "/dashboard/admin/analytics":     "Analytics",
};

const ROLE_BADGE = {
  doctor:  { label: "Doctor",  bg: "bg-[#0E7490]/10 text-[#0E7490]" },
  patient: { label: "Patient", bg: "bg-emerald-100 text-emerald-700" },
  admin:   { label: "Admin",   bg: "bg-violet-100 text-violet-700"   },
};

export default function DashboardNavbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const pageTitle = PAGE_TITLES[pathname] || "Dashboard";
  const role = user?.role || "patient";
  const badge = ROLE_BADGE[role] || ROLE_BADGE.patient;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => { window.location.href = "/login"; } },
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">

        {/* ── Left: Page Title & Breadcrumb ── */}
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-0.5">
              <Home size={11} />
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-600 font-medium">{pageTitle}</span>
            </div>
            <h1 className="text-lg font-bold text-gray-800 leading-none">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* ── Right: Actions ── */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Search (desktop only) */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-48 focus-within:border-[#0E7490] transition-colors">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
            />
          </div>

          {/* Notifications */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 hover:border-[#0E7490] hover:bg-[#0E7490]/5 transition-all group">
            <Bell size={16} className="text-gray-500 group-hover:text-[#0E7490] transition-colors" />
            {/* Notification dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0E7490] rounded-full border-2 border-white" />
          </button>

          {/* User Profile Dropdown */}
          {isPending ? (
            <div className="w-32 h-9 rounded-xl bg-gray-100 animate-pulse" />
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 hover:border-[#0E7490] transition-all group"
              >
                {/* Avatar */}
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#0E7490] text-white flex items-center justify-center text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}

                {/* Name + Role badge (hidden on small screens) */}
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-gray-800 leading-none truncate max-w-[100px]">
                    {user?.name || "User"}
                  </p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full mt-0.5 inline-block ${badge.bg}`}>
                    {badge.label}
                  </span>
                </div>

                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {/* User Info Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-[#0E7490]/5 to-transparent border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1.5 inline-block ${badge.bg}`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1.5">
                    <Link
                      href={`/dashboard/${role}/profile`}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0E7490] transition-colors"
                    >
                      <User size={15} className="text-gray-400" />
                      My Profile
                    </Link>
                    <Link
                      href={`/dashboard/${role}`}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0E7490] transition-colors"
                    >
                      <Settings size={15} className="text-gray-400" />
                      Dashboard
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 py-1.5">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

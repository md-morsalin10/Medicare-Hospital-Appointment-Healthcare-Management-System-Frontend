"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  Activity,
  LayoutDashboard,
  Calendar,
  Users,
  UserCheck,
  FileText,
  Star,
  Settings,
  Clock,
  CreditCard,
  Stethoscope,
  FilePlus,
  BarChart2,
  ChevronRight,
  LogOut,
  X,
  Menu,
  Home,
  ChevronUp,
} from "lucide-react";

// ─── Nav Item Config ───────────────────────────────────────────
const doctorNavItems = [
  { icon: LayoutDashboard, href: "/dashboard/doctor", label: "Overview" },
  { icon: Calendar, href: "/dashboard/doctor/appointments", label: "Appointments" },
  { icon: Clock, href: "/dashboard/doctor/schedules", label: "Manage Schedule" },
  { icon: FilePlus, href: "/dashboard/doctor/prescriptions", label: "Prescriptions" },
  { icon: Settings, href: "/dashboard/doctor/profile", label: "Profile Settings" },
];

const patientNavItems = [
  { icon: LayoutDashboard, href: "/dashboard/patient", label: "Overview" },
  { icon: Calendar, href: "/dashboard/patient/appointments", label: "My Appointments" },
  { icon: Stethoscope, href: "/dashboard/patient/prescriptions", label: "Prescriptions" },
  { icon: Star, href: "/dashboard/patient/reviews", label: "My Reviews" },
  { icon: CreditCard, href: "/dashboard/patient/payment-history", label: "Payment History" },
  { icon: Settings, href: "/dashboard/patient/profile", label: "Profile" },
];

const adminNavItems = [
  { icon: LayoutDashboard, href: "/dashboard/admin", label: "Overview" },
  { icon: Users, href: "/dashboard/admin/manage-users", label: "Manage Users" },
  { icon: UserCheck, href: "/dashboard/admin/manage-doctors", label: "Manage Doctors" },
  { icon: FileText, href: "/dashboard/admin/appointments", label: "All Appointments" },
  { icon: CreditCard, href: "/dashboard/admin/transactions", label: "Transactions" },
  { icon: BarChart2, href: "/dashboard/admin/analytics", label: "Analytics" },
];

const roleMeta = {
  doctor: { label: "Doctor Panel", gradient: "from-[#0E7490] to-[#0891B2]", badgeBg: "bg-cyan-100 text-cyan-800" },
  admin: { label: "Admin Panel", gradient: "from-[#7C3AED] to-[#9333EA]", badgeBg: "bg-purple-100 text-purple-800" },
  patient: { label: "Patient Portal", gradient: "from-[#059669] to-[#10B981]", badgeBg: "bg-emerald-100 text-emerald-800" },
};

// ─── Single Nav Link ───────────────────────────────────────────
function NavLink({ item, pathname, onClick }) {
  const isExactOverview =
    item.href === "/dashboard/patient" ||
    item.href === "/dashboard/doctor" ||
    item.href === "/dashboard/admin";

  const isActive = isExactOverview
    ? pathname === item.href
    : pathname === item.href || pathname?.startsWith(item.href + "/");

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`
        relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium
        transition-all duration-200 group
        ${isActive
          ? "bg-white/10 text-white"
          : "text-slate-400 hover:text-white hover:bg-white/5"
        }
      `}
    >
      {/* Active left accent bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#0E7490] rounded-r-full" />
      )}

      <span
        className={`
        flex items-center justify-center w-8 h-8 rounded-lg transition-all
        ${isActive
            ? "bg-[#0E7490] text-white shadow-lg shadow-[#0E7490]/30"
            : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white"
          }
      `}
      >
        <item.icon size={15} />
      </span>

      <span className="flex-1">{item.label}</span>

      {isActive && <ChevronRight size={14} className="text-[#0E7490]" />}
    </Link>
  );
}

// ─── Sidebar Content ───────────────────────────────────────────
function SidebarContent({ onClose }) {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const currentRole = user?.role || "patient";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navMap = { doctor: doctorNavItems, patient: patientNavItems, admin: adminNavItems };
  const navItems = navMap[currentRole] || patientNavItems;
  const meta = roleMeta[currentRole] || roleMeta.patient;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0B1120] text-white overflow-hidden">
      
      {/* ── Top Brand Bar ── */}
      <div className={`bg-gradient-to-r ${meta.gradient} px-5 py-5 flex-shrink-0`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
              <Activity size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-base leading-none">MediCare</p>
              <p className="text-white/70 text-[10px] uppercase tracking-widest mt-0.5">
                {meta.label}
              </p>
            </div>
          </Link>

          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 hover:bg-white/20 rounded-lg transition"
            >
              <X size={18} className="text-white" />
            </button>
          )}
        </div>
      </div>

      {/* ── Navigation List ── */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {isPending ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-10 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          navItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              pathname={pathname}
              onClick={onClose}
            />
          ))
        )}
      </nav>

      {/* ── Bottom User Profile & Popover Dropdown Menu ── */}
      <div className="p-3 border-t border-white/10 relative flex-shrink-0" ref={dropdownRef}>
        
        {/* Dropdown Menu (Opens Above the Profile Card) */}
        {dropdownOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* User Info Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#0E7490]/10 to-transparent border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Signed in as</p>
              <p className="text-sm font-bold text-gray-800 truncate">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
            </div>

            {/* Menu Links */}
            <div className="py-1.5">
              <Link
                href="/"
                onClick={() => {
                  setDropdownOpen(false);
                  if (onClose) onClose();
                }}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0E7490] transition-colors"
              >
                <Home size={16} className="text-gray-400" />
                Home Page
              </Link>
            </div>

            {/* Sign Out Action */}
            <div className="border-t border-gray-100 py-1.5">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Profile Button (Trigger) */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`w-full text-left rounded-xl p-2.5 flex items-center gap-3 transition-all ${
            dropdownOpen ? "bg-white/15" : "bg-white/5 hover:bg-white/10"
          }`}
        >
          {isPending ? (
            <div className="w-9 h-9 rounded-full bg-white/20 animate-pulse" />
          ) : user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border border-white/20"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#0E7490] flex items-center justify-center font-bold text-sm text-white">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}

          <div className="overflow-hidden flex-1">
            <p className="text-white font-semibold text-sm truncate leading-tight">
              {user?.name || "User"}
            </p>
            <p className="text-slate-400 text-[11px] truncate mt-0.5">
              {user?.email || "Manage Account"}
            </p>
          </div>

          <ChevronUp
            size={16}
            className={`text-slate-400 transition-transform duration-200 ${
              dropdownOpen ? "rotate-180 text-white" : ""
            }`}
          />
        </button>

      </div>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────
export function DashboardSideBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#0E7490] text-white rounded-full shadow-lg shadow-[#0E7490]/40 flex items-center justify-center hover:bg-[#085369] active:scale-95 transition-all"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl">
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
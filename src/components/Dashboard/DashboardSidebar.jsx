"use client";

import React, { useState } from "react";
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
} from "lucide-react";

// ─── Nav Item Config ───────────────────────────────────────────
const doctorNavItems = [
  { icon: LayoutDashboard, href: "/dashboard/doctor",              label: "Overview",          section: null },
  { icon: Calendar,        href: "/dashboard/doctor/appointments", label: "Appointments",      section: "MANAGE" },
  { icon: Clock,           href: "/dashboard/doctor/schedules",    label: "Manage Schedule",   section: null },
  { icon: FilePlus,        href: "/dashboard/doctor/prescriptions",label: "Prescriptions",     section: null },
  { icon: Settings,        href: "/dashboard/doctor/profile",      label: "Profile Settings",  section: "SETTINGS" },
];

const patientNavItems = [
  { icon: LayoutDashboard, href: "/dashboard/patient",                  label: "Overview",        section: null },
  { icon: Calendar,        href: "/dashboard/patient/appointments",      label: "My Appointments", section: "HEALTH" },
  { icon: Stethoscope,     href: "/dashboard/patient/prescriptions",     label: "Prescriptions",   section: null },
  { icon: Star,            href: "/dashboard/patient/reviews",           label: "My Reviews",      section: null },
  { icon: CreditCard,      href: "/dashboard/patient/payment-history",   label: "Payment History", section: null },
  { icon: Settings,        href: "/dashboard/patient/profile",           label: "Profile",         section: "SETTINGS" },
];

const adminNavItems = [
  { icon: LayoutDashboard, href: "/dashboard/admin",                label: "Overview",         section: null },
  { icon: Users,           href: "/dashboard/admin/manage-users",   label: "Manage Users",     section: "MANAGEMENT" },
  { icon: UserCheck,       href: "/dashboard/admin/manage-doctors", label: "Manage Doctors",   section: null },
  { icon: FileText,        href: "/dashboard/admin/appointments",   label: "All Appointments", section: null },
  { icon: CreditCard,      href: "/dashboard/admin/transactions",   label: "Transactions",     section: null },
  { icon: BarChart2,       href: "/dashboard/admin/analytics",      label: "Analytics",        section: "REPORTS" },
];

const roleMeta = {
  doctor:  { label: "Doctor Panel",   gradient: "from-[#0E7490] to-[#0891B2]" },
  admin:   { label: "Admin Panel",    gradient: "from-[#7C3AED] to-[#9333EA]" },
  patient: { label: "Patient Portal", gradient: "from-[#059669] to-[#10B981]" },
};

// ─── Single Nav Link ───────────────────────────────────────────
function NavLink({ item, pathname, onClick }) {
  const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
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

      <span className={`
        flex items-center justify-center w-8 h-8 rounded-lg transition-all
        ${isActive
          ? "bg-[#0E7490] text-white shadow-lg shadow-[#0E7490]/30"
          : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white"
        }
      `}>
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

  const navMap = { doctor: doctorNavItems, patient: patientNavItems, admin: adminNavItems };
  const navItems = navMap[currentRole] || patientNavItems;
  const meta = roleMeta[currentRole] || roleMeta.patient;

  const handleSignOut = async () => {
    await authClient.signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/login"; } } });
  };

  // Group items by section
  const grouped = navItems.reduce((acc, item) => {
    const key = item.section || "__default";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full bg-[#0B1120] text-white overflow-y-auto">
      
      {/* ── Top Brand Bar ── */}
      <div className={`bg-gradient-to-r ${meta.gradient} px-5 py-5`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
              <Activity size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-base leading-none">MediCare</p>
              <p className="text-white/70 text-[10px] uppercase tracking-widest mt-0.5">{meta.label}</p>
            </div>
          </Link>

          {/* Mobile close button */}
          {onClose && (
            <button onClick={onClose} className="lg:hidden p-1.5 hover:bg-white/20 rounded-lg transition">
              <X size={18} className="text-white" />
            </button>
          )}
        </div>

        {/* User mini card */}
        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
          {isPending ? (
            <div className="w-9 h-9 rounded-full bg-white/20 animate-pulse" />
          ) : user?.image ? (
            <img src={user.image} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2 border-white/30" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm text-white">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}
          <div className="overflow-hidden flex-1">
            <p className="text-white font-semibold text-sm truncate">{user?.name || "Loading..."}</p>
            <p className="text-white/60 text-[11px] truncate">{user?.email || ""}</p>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {isPending ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-10 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          Object.entries(grouped).map(([section, items]) => (
            <div key={section} className="mb-2">
              {section !== "__default" && (
                <p className="text-[10px] text-slate-600 font-semibold uppercase tracking-widest px-3 py-2">
                  {section}
                </p>
              )}
              <div className="space-y-0.5">
                {items.map((item) => (
                  <NavLink key={item.href} item={item} pathname={pathname} onClick={onClose} />
                ))}
              </div>
            </div>
          ))
        )}
      </nav>

      {/* ── Divider + Quick links ── */}
      <div className="px-3 pb-3 space-y-1 border-t border-white/5 pt-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Activity size={15} />
          </span>
          Go to Main Site
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
        >
          <span className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
            <LogOut size={15} />
          </span>
          Sign Out
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
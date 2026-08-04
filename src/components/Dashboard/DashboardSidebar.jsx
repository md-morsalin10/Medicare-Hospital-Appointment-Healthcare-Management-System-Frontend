"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Drawer } from "@heroui/react";

// Icons
import {
  Activity,
  LayoutDashboard,
  Calendar,
  Users,
  UserCheck,
  FileText,
  Bookmark,
  Settings,
  Clock,
  CreditCard,
  Menu,
  Stethoscope
} from "lucide-react";

export function DashboardSideBar() {
  const pathname = usePathname();

  // 👥 Better-Auth সেশন রিড করা
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // 🎯 সেফটি ফলব্যাক: ইউজার রোল না পাওয়া গেলে ডিফল্ট 'patient' সেট হবে
  const currentRole = user?.role || "patient";

  // 👨‍⚕️ ডাক্তার (Doctor) প্যানেল মেনু
  const doctorNavItems = [
    { icon: LayoutDashboard, href: "/dashboard/doctor", label: "Dashboard" },
    { icon: Calendar, href: "/dashboard/doctor/appointments", label: "Appointments" },
    { icon: Users, href: "/dashboard/doctor/patients", label: "My Patients" },
    { icon: Clock, href: "/dashboard/doctor/schedules", label: "Manage Schedule" },
    { icon: Settings, href: "/dashboard/doctor/profile", label: "Profile Settings" },
  ];

  // 🩺 পেশেন্ট (Patient/User) প্যানেল মেনু
  const patientNavItems = [
    { icon: LayoutDashboard, href: "/dashboard/patient", label: "Dashboard" },
    { icon: Calendar, href: "/dashboard/patient/appointments", label: "My Appointments" },
    { icon: Stethoscope, href: "/dashboard/patient/prescriptions", label: "Prescriptions" },
    { icon: Bookmark, href: "/dashboard/patient/saved-doctors", label: "Saved Doctors" },
    { icon: Settings, href: "/dashboard/patient/profile", label: "Profile Management" },
  ];

  // 👑 অ্যাডমিন (Admin) প্যানেল মেনু
  const adminNavItems = [
    { icon: LayoutDashboard, href: "/dashboard/admin", label: "Dashboard Home" },
    { icon: Users, href: "/dashboard/admin/manage-users", label: "Manage Users" },
    { icon: UserCheck, href: "/dashboard/admin/manage-doctors", label: "Manage Doctors" },
    { icon: FileText, href: "/dashboard/admin/appointments", label: "All Appointments" },
    { icon: CreditCard, href: "/dashboard/admin/transactions", label: "Transactions" },
  ];

  const navLinksMap = {
    patient: patientNavItems,
    doctor: doctorNavItems,
    admin: adminNavItems,
  };

  const navItems = navLinksMap[currentRole] || patientNavItems;

  const navContent = (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-300 py-6 px-4">
      
      {/* 🏥 MediCare Brand Identity */}
      <div className="px-3 mb-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-[#0E7490] text-white shadow-md shadow-[#0E7490]/20 group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold text-white tracking-tight block">
              MediCare
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#0E7490] font-bold block -mt-1">
              {currentRole === "doctor"
                ? "Doctor Panel"
                : currentRole === "admin"
                ? "Admin Panel"
                : "Patient Portal"}
            </span>
          </div>
        </Link>
      </div>

      {/* 🔗 Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1.5">
        {isPending ? (
          <div className="space-y-2 px-2 pt-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-10 bg-slate-800/60 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-xs uppercase tracking-wider font-semibold transition-all duration-200 group ${
                  isActive
                    ? "bg-[#0E7490] text-white shadow-md shadow-[#0E7490]/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })
        )}
      </nav>

      {/* 👤 Bottom Quick User Info */}
      {user && (
        <div className="pt-4 border-t border-slate-800/80 px-2 flex items-center gap-3">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-8 h-8 rounded-full object-cover border border-[#0E7490]"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#0E7490] text-white flex items-center justify-center font-bold text-xs">
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>
          )}
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{user.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* 🖥️ Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 h-full flex-shrink-0 bg-[#0F172A]">
        {navContent}
      </aside>

      {/* 📱 Mobile Responsive Trigger Button & HeroUI Drawer */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Drawer>
          <Drawer.Trigger>
            <div className="bg-[#0E7490] text-white font-bold uppercase tracking-wider rounded-full shadow-lg shadow-[#0E7490]/40 p-4 cursor-pointer flex items-center justify-center hover:bg-[#085369] active:scale-95 transition-all">
              <Menu className="w-5 h-5" />
            </div>
          </Drawer.Trigger>

          <Drawer.Backdrop>
            <Drawer.Content placement="left" className="bg-[#0F172A] p-0 max-w-[260px]">
              <Drawer.Dialog className="bg-[#0F172A] h-full p-0">
                <Drawer.Body className="p-0 h-full">
                  {navContent}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}
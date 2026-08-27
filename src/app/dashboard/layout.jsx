import { DashboardSideBar } from "@/components/Dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import { getUserSeason } from "@/lib/core/session";
import { Ban } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({ children }) {
  const user = await getUserSeason();

  if (user?.isSuspended) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-sm border border-red-100">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Ban className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Account Suspended</h1>
          <p className="text-gray-500 mb-8">
            Your user account has been suspended by an administrator. You currently do not have access to the dashboard. Please contact support if you believe this is a mistake.
          </p>
          <Link 
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-xl transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── Sidebar ── */}
      <DashboardSideBar />

      {/* ── Main Content Area ── */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Sticky Topbar */}
        <DashboardNavbar />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
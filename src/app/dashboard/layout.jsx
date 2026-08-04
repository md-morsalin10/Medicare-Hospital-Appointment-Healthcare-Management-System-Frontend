import { DashboardSideBar } from "@/components/Dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";

export default function DashboardLayout({ children }) {
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
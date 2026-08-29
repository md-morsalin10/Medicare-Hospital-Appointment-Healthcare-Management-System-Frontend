"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Calendar,
    Clock,
    User,
    Stethoscope,
    CreditCard,
    CheckCircle2,
    XCircle,
    Clock3,
    CalendarX,
    Filter
} from "lucide-react";
import Image from "next/image";
import { getClientToken } from "@/lib/core/tokenClinet";

const AppointmentManagementTable = ({ initialAppointments = [] }) => {
    const [appointments, setAppointments] = useState(initialAppointments);
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // Handle Status Change API Call
    const handleStatusUpdate = async (id, newStatus) => {
        // Optimistic UI Update
        setAppointments((prev) =>
            prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );

        try {
            const token = await getClientToken()
            const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:5000"
            const res = await fetch(`${baseUrl}/api/bookings/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();
            if (!data.success) {
                console.error("Failed to update status:", data.message);
            }
        } catch (error) {
            console.error("Error updating appointment status:", error);
        }
    };

    // Filter & Search Logic
    const filteredAppointments = appointments.filter((item) => {
        const matchesFilter = filter === "All" || (item.status || "Pending") === filter;
        const matchesSearch =
            item.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.patientEmail?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case "Confirmed":
                return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
            case "Completed":
                return "bg-blue-50 text-blue-700 border-blue-200/60";
            case "Cancelled":
                return "bg-rose-50 text-rose-700 border-rose-200/60";
            default:
                return "bg-amber-50 text-amber-700 border-amber-200/60";
        }
    };

    return (
        <div className="space-y-6">
            {/* ── SEARCH & FILTER CONTROLS ── */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                    {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${filter === tab
                                ? "bg-slate-900 text-white shadow-sm"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search patient, doctor, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 text-slate-700"
                    />
                </div>
            </div>

            {/* ── APPOINTMENTS TABLE ── */}
            {filteredAppointments.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-md mx-auto my-8">
                    <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <CalendarX className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1">No Appointments Found</h3>
                    <p className="text-xs text-slate-500">There are no records matching your selected filter or search query.</p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">Patient</th>
                                    <th className="py-4 px-6">Doctor</th>
                                    <th className="py-4 px-6">Date & Time</th>
                                    <th className="py-4 px-6">Fee & Payment</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {filteredAppointments.map((item) => (
                                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                                        {/* Patient Details */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={item.patientImage || "https://cdn-icons-png.flaticon.com/512/9193/9193824.png"}
                                                    alt={item.patientName || "Patient"}
                                                    width={38}
                                                    height={38}
                                                    className="rounded-xl object-cover border border-slate-200 shrink-0"
                                                />
                                                <div>
                                                    <p className="font-bold text-slate-800 text-sm">{item.patientName}</p>
                                                    <p className="text-[11px] text-slate-400">{item.patientEmail}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Doctor Details */}
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-bold text-slate-700">{item.doctorName}</p>
                                                <p className="text-[11px] text-slate-400">{item.doctorEmail}</p>
                                            </div>
                                        </td>

                                        {/* Date & Time Slot */}
                                        <td className="py-4 px-6">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>{item.appointmentDate}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>{item.appointmentTime}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Fee & Payment Status */}
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-bold text-slate-800">${item.doctorFee}</p>
                                                <span className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                                                    {item.paymentStatus || "Paid"}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Current Status */}
                                        <td className="py-4 px-6">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                                                    item.status || "Pending"
                                                )}`}
                                            >
                                                {item.status || "Pending"}
                                            </span>
                                        </td>

                                        {/* Update Status Actions */}
                                        <td className="py-4 px-6 text-right">
                                            <select
                                                value={item.status || "Pending"}
                                                onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                                                className="bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentManagementTable;
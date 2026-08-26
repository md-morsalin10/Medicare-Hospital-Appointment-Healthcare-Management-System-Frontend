"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarX } from "lucide-react";
import DoctorAppointmentCard from "./DoctorAppointmentCard";

const DoctorAppointmentList = ({ initialBookings = [] }) => {
    const [bookings, setBookings] = useState(initialBookings);
    const [filter, setFilter] = useState("All");

    const handleStatusChange = async (id, newStatus) => {
        setBookings((prev) =>
            prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );

        try {
            // 2. Database Status Update API Call
            const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();

            if (!data.success) {
                console.error("Failed to update status:", data.message);
            }
        } catch (error) {
            console.error("Error updating booking status:", error);
        }
    };

    const filteredBookings = bookings.filter((item) => {
        if (filter === "All") return true;
        return (item.status || "Pending") === filter;
    });

    return (
        <div className="space-y-6">
            {/* FILTER TABS */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200/80 w-fit">
                {["All", "Pending", "Confirmed", "Cancelled"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filter === tab
                                ? "bg-emerald-600 text-white shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* APPOINTMENTS GRID */}
            {filteredBookings.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-md mx-auto my-8">
                    <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <CalendarX className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1">No Appointments Found</h3>
                    <p className="text-xs text-slate-500">There are no patient requests matching this filter.</p>
                </div>
            ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <AnimatePresence>
                        {filteredBookings.map((item) => (
                            <DoctorAppointmentCard
                                key={item._id}
                                appointment={item}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default DoctorAppointmentList;
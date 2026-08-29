"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarX } from "lucide-react";
import AppointmentCard from "./AppointmentCard";
import { getClientToken } from "@/lib/core/tokenClinet";

const BACKEND_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:5000";

const AppointmentList = ({ initialBookings = [] }) => {
    const [bookings, setBookings] = useState(initialBookings);

    // Handle Cancel — mark as Cancelled in DB and UI
    const handleCancel = async (id) => {
        setBookings((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, status: "Cancelled" } : item
            )
        );

        try {
            const token = await getClientToken();
            const res = await fetch(`${BACKEND_URL}/api/bookings/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: "Cancelled" })
            });
            const data = await res.json();
            if (!data.success) console.error("Cancel failed:", data.message);
        } catch (err) {
            console.error("Cancel error:", err);
        }
    };

    // Handle Delete — permanently remove from DB and UI
    const handleDelete = async (id) => {
        setBookings((prev) => prev.filter((item) => item._id !== id));


        try {
            const token = await getClientToken();
            const res = await fetch(`${BACKEND_URL}/api/bookings/${id}`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!data.success) console.error("Delete failed:", data.message);
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // Handle Reschedule — update date/time in UI state (API call done inside AppointmentCard)
    const handleReschedule = (id, newDate, newTime) => {
        setBookings((prev) =>
            prev.map((item) =>
                item._id === id
                    ? { ...item, appointmentDate: newDate, appointmentTime: newTime }
                    : item
            )
        );
    };

    if (!bookings || bookings.length === 0) {
        return (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-md mx-auto my-12">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">No Appointments Found</h3>
                <p className="text-xs text-slate-500">You don't have any doctor consultations scheduled right now.</p>
            </div>
        );
    }

    return (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
                {bookings.map((item) => (
                    <AppointmentCard
                        key={item._id}
                        appointment={item}
                        onCancel={handleCancel}
                        onDelete={handleDelete}
                        onReschedule={handleReschedule}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default AppointmentList;
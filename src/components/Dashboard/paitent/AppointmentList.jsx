"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarX } from "lucide-react";
import AppointmentCard from "./AppointmentCard";

const AppointmentList = ({ initialBookings = [] }) => {
    const [bookings, setBookings] = useState(initialBookings);

    // Handle Cancel Action
    const handleCancel = async (id) => {
        // Optimistic UI Update
        setBookings((prev) => prev.filter((item) => item._id !== id));

        // TODO: Call your Backend API to Delete/Cancel from DB
        // await fetch(`/api/schedules/cancel/${id}`, { method: 'DELETE' });
    };

    // Handle Reschedule Action
    const handleReschedule = (appointment) => {
        // Navigate or trigger reschedule flow
        alert(`Reschedule feature triggered for ${appointment.doctorName}`);
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
        <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
            <AnimatePresence>
                {bookings.map((item) => (
                    <AppointmentCard
                        key={item._id}
                        appointment={item}
                        onCancel={handleCancel}
                        onReschedule={handleReschedule}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default AppointmentList;
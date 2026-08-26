"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Clock,
    Eye,
    RefreshCw,
    XCircle,
    Stethoscope,
    X,
    Trash2,
    CheckCircle,
    Loader2,
    AlertCircle,
    CalendarX2
} from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:5000";

const AppointmentCard = ({ appointment, onCancel, onDelete, onReschedule }) => {
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

    // Reschedule state
    const [schedules, setSchedules] = useState([]);      // all available doctor schedules
    const [schedulesLoading, setSchedulesLoading] = useState(false);
    const [schedulesError, setSchedulesError] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState(""); // timeSlot string
    const [rescheduleLoading, setRescheduleLoading] = useState(false);
    const [rescheduleError, setRescheduleError] = useState("");
    const [rescheduleSuccess, setRescheduleSuccess] = useState(false);

    const status = appointment.status || appointment.paymentStatus || "Paid";
    const isCompleted = status === "Completed";
    const isCancelled = status === "Cancelled";
    const isLocked = isCompleted || isCancelled;

    const statusConfig = {
        Completed: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200/60", dot: "bg-indigo-500", label: "Completed" },
        Confirmed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200/60", dot: "bg-emerald-500", label: "Confirmed" },
        Cancelled: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200/60", dot: "bg-rose-500", label: "Cancelled" },
        Paid: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200/60", dot: "bg-emerald-500", label: "Paid" },
        Pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200/60", dot: "bg-amber-500", label: "Pending" },
    };
    const badge = statusConfig[status] || statusConfig["Paid"];

    // Group schedules by date
    const groupedByDate = schedules.reduce((acc, s) => {
        if (!acc[s.date]) acc[s.date] = [];
        acc[s.date].push(s);
        return acc;
    }, {});
    const availableDates = Object.keys(groupedByDate).sort();
    const slotsForSelectedDate = selectedDate ? groupedByDate[selectedDate] || [] : [];

    const fetchDoctorSchedules = async () => {
        setSchedulesLoading(true);
        setSchedulesError("");
        try {
            const today = new Date().toISOString().split("T")[0];
            const res = await fetch(`${BACKEND_URL}/api/schedules?doctorId=${appointment.doctorId}`);
            const data = await res.json();

            // Filter: only Available slots from today onwards (excluding current appointment slot)
            const filtered = Array.isArray(data)
                ? data.filter(
                    (s) =>
                        s.status === "Available" &&
                        s.date >= today &&
                        !(s.date === appointment.appointmentDate && s.timeSlot === appointment.appointmentTime)
                )
                : [];

            setSchedules(filtered);

            if (filtered.length === 0) {
                setSchedulesError("No available slots found for this doctor. Please check back later.");
            }
        } catch (err) {
            setSchedulesError("Failed to load doctor's schedule. Please try again.");
        } finally {
            setSchedulesLoading(false);
        }
    };

    const openReschedule = () => {
        setSelectedDate("");
        setSelectedSlot("");
        setRescheduleError("");
        setRescheduleSuccess(false);
        setSchedules([]);
        setIsRescheduleOpen(true);
        fetchDoctorSchedules();
    };

    const handleRescheduleSubmit = async () => {
        if (!selectedDate || !selectedSlot) {
            setRescheduleError("Please select a date and time slot.");
            return;
        }

        setRescheduleError("");
        setRescheduleLoading(true);

        try {
            const res = await fetch(`${BACKEND_URL}/api/bookings/${appointment._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    appointmentDate: selectedDate,
                    appointmentTime: selectedSlot
                })
            });

            const data = await res.json();

            if (!data.success) {
                setRescheduleError(data.message || "Reschedule failed. Please try again.");
                return;
            }

            setRescheduleSuccess(true);
            if (onReschedule) onReschedule(appointment._id, selectedDate, selectedSlot);

            setTimeout(() => {
                setIsRescheduleOpen(false);
                setRescheduleSuccess(false);
            }, 1800);
        } catch (err) {
            setRescheduleError("Network error. Please try again.");
        } finally {
            setRescheduleLoading(false);
        }
    };

    return (
        <>
            {/* ─── APPOINTMENT CARD ─── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text} border ${badge.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        {badge.label}
                    </span>
                    <span className="text-xs font-bold text-slate-400">${appointment.doctorFee}</span>
                </div>

                {/* Doctor Info */}
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={appointment.doctorImage || "https://i.ibb.co/dH2LgKb/images-5.jpg"}
                        alt={appointment.doctorName}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-inner"
                    />
                    <div>
                        <h3 className="font-bold text-slate-800 text-base line-clamp-1">{appointment.doctorName}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                            Specialist Consult
                        </p>
                    </div>
                </div>

                {/* Date & Time */}
                <div className="bg-slate-50 rounded-xl p-3 mb-5 space-y-1.5 border border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{appointment.appointmentDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{appointment.appointmentTime}</span>
                    </div>
                </div>

                {/* Action Buttons 2×2 */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <button
                        onClick={() => setIsViewOpen(true)}
                        className="flex items-center justify-center gap-1.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors"
                    >
                        <Eye className="w-3.5 h-3.5" /> View
                    </button>

                    <button
                        disabled={isLocked}
                        onClick={() => !isLocked && openReschedule()}
                        className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                            isLocked ? "bg-slate-50 text-slate-300 cursor-not-allowed" : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                        }`}
                    >
                        <RefreshCw className="w-3.5 h-3.5" /> Reschedule
                    </button>

                    <button
                        disabled={isLocked}
                        onClick={() => !isLocked && setIsCancelOpen(true)}
                        className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                            isLocked ? "bg-slate-50 text-slate-300 cursor-not-allowed" : "bg-amber-50 hover:bg-amber-100 text-amber-700"
                        }`}
                    >
                        <XCircle className="w-3.5 h-3.5" /> Cancel
                    </button>

                    <button
                        disabled={isLocked}
                        onClick={() => !isLocked && setIsDeleteOpen(true)}
                        className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                            isLocked ? "bg-slate-50 text-slate-300 cursor-not-allowed" : "bg-rose-50 hover:bg-rose-100 text-rose-600"
                        }`}
                    >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                </div>
            </motion.div>

            {/* ─── VIEW MODAL ─── */}
            <AnimatePresence>
                {isViewOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative"
                        >
                            <button onClick={() => setIsViewOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Appointment Details</h2>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
                                    <img src={appointment.doctorImage} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                    <div>
                                        <p className="font-bold text-slate-800">{appointment.doctorName}</p>
                                        <p className="text-xs text-slate-500">{appointment.doctorEmail}</p>
                                    </div>
                                </div>
                                <div className="space-y-2 border-t border-slate-100 pt-3">
                                    <div className="flex justify-between"><span className="text-slate-500">Date:</span><span className="font-semibold text-slate-800">{appointment.appointmentDate}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-500">Time:</span><span className="font-semibold text-slate-800">{appointment.appointmentTime}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-500">Fee Paid:</span><span className="font-semibold text-emerald-600">${appointment.doctorFee}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-500">Status:</span><span className={`font-semibold ${badge.text}`}>{badge.label}</span></div>
                                </div>
                                <div className="border-t border-slate-100 pt-3">
                                    <span className="text-slate-500 block mb-1">Symptoms:</span>
                                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700 text-xs">{appointment.symptoms || "No symptoms specified."}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ─── RESCHEDULE MODAL ─── */}
            <AnimatePresence>
                {isRescheduleOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden my-auto"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                                        <RefreshCw className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-white font-bold text-base">Reschedule Appointment</h2>
                                        <p className="text-emerald-100 text-xs mt-0.5">
                                            {appointment.doctorName} · Current: {appointment.appointmentDate}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsRescheduleOpen(false)}
                                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Success state */}
                                {rescheduleSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center py-10 gap-3"
                                    >
                                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-8 h-8 text-emerald-600" />
                                        </div>
                                        <p className="font-bold text-slate-800 text-base">Rescheduled Successfully!</p>
                                        <p className="text-xs text-slate-500">{selectedDate} · {selectedSlot}</p>
                                    </motion.div>
                                ) : schedulesLoading ? (
                                    /* Loading state */
                                    <div className="flex flex-col items-center py-10 gap-3 text-slate-500">
                                        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                                        <p className="text-sm font-medium">Loading available slots...</p>
                                    </div>
                                ) : schedulesError && schedules.length === 0 ? (
                                    /* No slots available */
                                    <div className="flex flex-col items-center py-10 gap-3 text-center">
                                        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center">
                                            <CalendarX2 className="w-7 h-7 text-slate-400" />
                                        </div>
                                        <p className="font-bold text-slate-700">No Available Slots</p>
                                        <p className="text-xs text-slate-500 max-w-xs">{schedulesError}</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Error inline */}
                                        {rescheduleError && (
                                            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl px-4 py-3 text-xs font-medium">
                                                <AlertCircle className="w-4 h-4 shrink-0" />
                                                {rescheduleError}
                                            </div>
                                        )}

                                        {/* Step 1 — Pick a Date */}
                                        <div>
                                            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
                                                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                                                Select a Date
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {availableDates.map((date) => (
                                                    <button
                                                        key={date}
                                                        type="button"
                                                        onClick={() => { setSelectedDate(date); setSelectedSlot(""); }}
                                                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                                                            selectedDate === date
                                                                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/30"
                                                                : "bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"
                                                        }`}
                                                    >
                                                        {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                                                            weekday: "short", month: "short", day: "numeric"
                                                        })}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Step 2 — Pick a Time Slot */}
                                        {selectedDate && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
                                                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                                                    Available Time Slots on {selectedDate}
                                                </label>

                                                {slotsForSelectedDate.length === 0 ? (
                                                    <p className="text-xs text-slate-500 text-center py-3">No slots for this date.</p>
                                                ) : (
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {slotsForSelectedDate.map((slot) => (
                                                            <button
                                                                key={slot._id}
                                                                type="button"
                                                                onClick={() => setSelectedSlot(slot.timeSlot)}
                                                                className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all text-center ${
                                                                    selectedSlot === slot.timeSlot
                                                                        ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                                                                        : "bg-slate-50 border border-slate-200 text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
                                                                }`}
                                                            >
                                                                {slot.timeSlot}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}

                                        {/* Summary */}
                                        {selectedDate && selectedSlot && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-emerald-50 border border-emerald-200/60 rounded-2xl px-4 py-3 text-xs font-medium text-emerald-800"
                                            >
                                                ✅ New slot: <span className="font-bold">{selectedDate}</span> · <span className="font-bold">{selectedSlot}</span>
                                            </motion.div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Footer Buttons */}
                            {!rescheduleSuccess && !schedulesLoading && schedules.length > 0 && (
                                <div className="px-6 pb-6 flex gap-3">
                                    <button
                                        onClick={() => setIsRescheduleOpen(false)}
                                        className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleRescheduleSubmit}
                                        disabled={rescheduleLoading || !selectedDate || !selectedSlot}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-colors"
                                    >
                                        {rescheduleLoading
                                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                                            : <><CheckCircle className="w-4 h-4" /> Confirm</>
                                        }
                                    </button>
                                </div>
                            )}

                            {/* Close button when no slots */}
                            {!rescheduleSuccess && !schedulesLoading && schedules.length === 0 && (
                                <div className="px-6 pb-6">
                                    <button
                                        onClick={() => setIsRescheduleOpen(false)}
                                        className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ─── CANCEL MODAL ─── */}
            <AnimatePresence>
                {isCancelOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center"
                        >
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <XCircle className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-base mb-2">Cancel Appointment?</h3>
                            <p className="text-xs text-slate-500 mb-6">
                                Are you sure you want to cancel your booking with <span className="font-semibold text-slate-700">{appointment.doctorName}</span>?
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setIsCancelOpen(false)} className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors">
                                    No, Keep It
                                </button>
                                <button
                                    onClick={() => { onCancel(appointment._id); setIsCancelOpen(false); }}
                                    className="w-full py-2.5 bg-amber-500 text-white rounded-xl text-xs font-semibold hover:bg-amber-600 transition-colors"
                                >
                                    Yes, Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ─── DELETE MODAL ─── */}
            <AnimatePresence>
                {isDeleteOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center"
                        >
                            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-base mb-2">Delete Appointment?</h3>
                            <p className="text-xs text-slate-500 mb-6">
                                This will <span className="font-semibold text-rose-600">permanently delete</span> this booking with <span className="font-semibold text-slate-700">{appointment.doctorName}</span>. This cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setIsDeleteOpen(false)} className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors">
                                    No, Keep It
                                </button>
                                <button
                                    onClick={() => { onDelete(appointment._id); setIsDeleteOpen(false); }}
                                    className="w-full py-2.5 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AppointmentCard;
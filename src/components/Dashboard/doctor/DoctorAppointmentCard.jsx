"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Calendar,
    Clock,
    User,
    Check,
    X,
    FilePlus,
    AlertCircle,
    FileText
} from "lucide-react";

const DoctorAppointmentCard = ({ appointment, onStatusChange }) => {
    const router = useRouter();
    const [status, setStatus] = useState(appointment.status || "Pending"); // Pending, Confirmed, Cancelled, Completed
    const [isRejectOpen, setIsRejectOpen] = useState(false);

    // Status Accept handler
    const handleAccept = () => {
        setStatus("Confirmed");
        if (onStatusChange) onStatusChange(appointment._id, "Confirmed");
    };

    // Status Reject handler
    const handleReject = () => {
        setStatus("Cancelled");
        if (onStatusChange) onStatusChange(appointment._id, "Cancelled");
        setIsRejectOpen(false);
    };

    // Mark Completed and navigate to Prescription route
    const handleAddPrescription = () => {
        // Navigate to prescription page with patient and appointment info query params
        router.push(
            `/dashboard/doctor/prescriptions/create?appointmentId=${appointment._id}&patientId=${appointment.patientId}&patientName=${encodeURIComponent(appointment.patientName)}`
        );
    };

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
                {/* Top Header: Patient & Status Badge */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status === "Confirmed"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                    : status === "Cancelled"
                                        ? "bg-rose-50 text-rose-600 border border-rose-200/60"
                                        : "bg-amber-50 text-amber-700 border border-amber-200/60"
                                }`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${status === "Confirmed" ? "bg-emerald-500" : status === "Cancelled" ? "bg-rose-500" : "bg-amber-500 animate-pulse"
                                }`} />
                            {status}
                        </span>

                        <span className="text-xs font-semibold text-slate-400">
                            Fee: ${appointment.doctorFee}
                        </span>
                    </div>

                    {/* Patient Details */}
                    <div className="flex items-center gap-3.5 mb-4">
                        <img
                            src={appointment.patientImage || "https://i.ibb.co/LDFjvZJD/m-9.jpg"}
                            alt={appointment.patientName}
                            className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shrink-0"
                        />
                        <div>
                            <h3 className="font-bold text-slate-800 text-base line-clamp-1">
                                {appointment.patientName}
                            </h3>
                            <p className="text-xs text-slate-400">{appointment.patientEmail}</p>
                        </div>
                    </div>

                    {/* Date & Time Slot */}
                    <div className="bg-slate-50 rounded-2xl p-3.5 mb-4 space-y-2 border border-slate-100 text-xs">
                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                            <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{appointment.appointmentDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{appointment.appointmentTime}</span>
                        </div>
                    </div>

                    {/* Symptoms Section */}
                    <div className="mb-5 bg-amber-50/50 rounded-2xl p-3 border border-amber-100/60">
                        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                            Patient Symptoms:
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            {appointment.symptoms || "No symptoms specified by patient."}
                        </p>
                    </div>
                </div>

                {/* Dynamic Action Buttons */}
                <div className="pt-3 border-t border-slate-100">
                    {status === "Pending" && (
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setIsRejectOpen(true)}
                                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-semibold transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Reject
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                            >
                                <Check className="w-4 h-4" />
                                Accept
                            </button>
                        </div>
                    )}

                    {status === "Confirmed" && (
                        <button
                            onClick={handleAddPrescription}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/10"
                        >
                            <FilePlus className="w-4 h-4" />
                            Add Prescription & Complete
                        </button>
                    )}

                    {status === "Cancelled" && (
                        <div className="text-center py-2 bg-slate-100 text-slate-400 rounded-xl text-xs font-medium">
                            Appointment Rejected
                        </div>
                    )}
                </div>
            </motion.div>

            {/* REJECT CONFIRMATION MODAL */}
            <AnimatePresence>
                {isRejectOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center"
                        >
                            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-base mb-1">
                                Reject Appointment?
                            </h3>
                            <p className="text-xs text-slate-500 mb-6">
                                Are you sure you want to decline booking for {appointment.patientName}?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsRejectOpen(false)}
                                    className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
                                >
                                    Keep Request
                                </button>
                                <button
                                    onClick={handleReject}
                                    className="w-full py-2.5 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors"
                                >
                                    Yes, Reject
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DoctorAppointmentCard;
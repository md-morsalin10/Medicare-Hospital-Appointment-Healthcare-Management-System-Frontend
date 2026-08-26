"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Clock,
    User,
    Eye,
    RefreshCw,
    XCircle,
    CheckCircle2,
    Stethoscope,
    X
} from "lucide-react";

const AppointmentCard = ({ appointment, onReschedule, onCancel }) => {
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    return (
        <>
            {/* Appointment Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between"
            >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {appointment.paymentStatus || "Paid"}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                        ${appointment.doctorFee}
                    </span>
                </div>

                {/* Doctor Info */}
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={appointment.doctorImage || "https://i.ibb.co/dH2LgKb/images-5.jpg"}
                        alt={appointment.doctorName}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-inner"
                    />
                    <div>
                        <h3 className="font-bold text-slate-800 text-base line-clamp-1">
                            {appointment.doctorName}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                            Specialist Consult
                        </p>
                    </div>
                </div>

                {/* Date & Time Slot */}
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

                {/* Action Buttons (CRUD) */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    {/* View */}
                    <button
                        onClick={() => setIsViewOpen(true)}
                        className="flex items-center justify-center gap-1 py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors"
                    >
                        <Eye className="w-3.5 h-3.5" />
                        View
                    </button>

                    {/* Reschedule */}
                    <button
                        onClick={() => onReschedule(appointment)}
                        className="flex items-center justify-center gap-1 py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-medium transition-colors"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reschedule
                    </button>

                    {/* Cancel */}
                    <button
                        onClick={() => setIsCancelOpen(true)}
                        className="flex items-center justify-center gap-1 py-2 px-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-medium transition-colors"
                    >
                        <XCircle className="w-3.5 h-3.5" />
                        Cancel
                    </button>
                </div>
            </motion.div>

            {/* VIEW DETAILS MODAL */}
            <AnimatePresence>
                {isViewOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative"
                        >
                            <button
                                onClick={() => setIsViewOpen(false)}
                                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-lg font-bold text-slate-800 mb-4">
                                Appointment Details
                            </h2>

                            <div className="space-y-4 text-sm">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
                                    <img
                                        src={appointment.doctorImage}
                                        className="w-12 h-12 rounded-xl object-cover"
                                        alt=""
                                    />
                                    <div>
                                        <p className="font-bold text-slate-800">{appointment.doctorName}</p>
                                        <p className="text-xs text-slate-500">{appointment.doctorEmail}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 border-t border-slate-100 pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Date:</span>
                                        <span className="font-semibold text-slate-800">{appointment.appointmentDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Time:</span>
                                        <span className="font-semibold text-slate-800">{appointment.appointmentTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Fee Paid:</span>
                                        <span className="font-semibold text-emerald-600">${appointment.doctorFee}</span>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-3">
                                    <span className="text-slate-500 block mb-1">Symptoms:</span>
                                    <p className="p-3 bg-slate-50 rounded-xl text-slate-700 text-xs">
                                        {appointment.symptoms || "No symptoms specified."}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* CANCEL CONFIRMATION MODAL */}
            <AnimatePresence>
                {isCancelOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center"
                        >
                            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <XCircle className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-800 text-base mb-2">
                                Cancel Appointment?
                            </h3>
                            <p className="text-xs text-slate-500 mb-6">
                                Are you sure you want to cancel this booking with {appointment.doctorName}?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsCancelOpen(false)}
                                    className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
                                >
                                    No, Keep It
                                </button>
                                <button
                                    onClick={() => {
                                        onCancel(appointment._id);
                                        setIsCancelOpen(false);
                                    }}
                                    className="w-full py-2.5 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors"
                                >
                                    Yes, Cancel
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
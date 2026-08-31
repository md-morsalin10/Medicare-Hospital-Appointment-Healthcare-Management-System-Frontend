"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Calendar, User, ClipboardList, Star } from "lucide-react";
import ReviewModal from "./ReviewModal";

const PatientPrescriptionListClient = ({ initialPrescriptions}) => {
    const [prescriptions] = useState(initialPrescriptions);
    const [reviewingPrescription, setReviewingPrescription] = useState(null);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                    My Prescriptions
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    View your medical prescriptions and write reviews for your doctors.
                </p>
            </div>

            {prescriptions.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-md mx-auto mt-8">
                    <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <ClipboardList className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1">No Prescriptions Found</h3>
                    <p className="text-xs text-slate-500">You don't have any prescriptions yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <AnimatePresence>
                        {prescriptions.map((item) => (
                            <motion.div
                                key={item._id}
                                layout
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                                className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            Prescribed
                                        </span>
                                        <button
                                            onClick={() => setReviewingPrescription(item)}
                                            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold transition-colors"
                                        >
                                            <Star className="w-3.5 h-3.5" />
                                            Review Doctor
                                        </button>
                                    </div>

                                    {/* Doctor Details */}
                                    <div className="flex items-center gap-3.5 mb-4">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-base line-clamp-1">
                                                {item.doctorName}
                                            </h3>
                                            <p className="text-xs text-slate-400">Doctor</p>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="bg-slate-50 rounded-2xl p-3 mb-4 flex items-center gap-2 border border-slate-100 text-xs text-slate-600 font-medium">
                                        <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
                                        <span>{item.appointmentDate}</span>
                                    </div>

                                    {/* Diagnosis Section */}
                                    <div className="mb-3 bg-indigo-50/50 rounded-2xl p-3 border border-indigo-100/60">
                                        <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                                            Diagnosis
                                        </span>
                                        <p className="text-xs text-slate-700 leading-relaxed font-medium line-clamp-2">
                                            {item.diagnosis}
                                        </p>
                                    </div>

                                    {/* Medicines list snippet */}
                                    {item.medicines && item.medicines.length > 0 && (
                                        <div className="mb-5 bg-amber-50/50 rounded-2xl p-3 border border-amber-100/60">
                                            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                                                Medicines
                                            </span>
                                            <ul className="text-xs text-slate-700 font-medium space-y-1">
                                                {item.medicines.slice(0, 2).map((med, idx) => (
                                                    <li key={idx}>• {med.name} - {med.dosage}</li>
                                                ))}
                                                {item.medicines.length > 2 && (
                                                    <li className="text-slate-500 italic">+{item.medicines.length - 2} more</li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Bottom Info */}
                                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-medium">
                                    <FileText className="w-4 h-4" />
                                    {item.medicines?.length || 0} Medicines Prescribed
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Review Modal */}
            {reviewingPrescription && (
                <ReviewModal
                    prescription={reviewingPrescription}
                    onClose={() => setReviewingPrescription(null)}
                />
            )}
        </div>
    );
};

export default PatientPrescriptionListClient;

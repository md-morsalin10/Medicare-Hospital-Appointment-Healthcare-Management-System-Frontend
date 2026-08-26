"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    FilePlus,
    Plus,
    Trash2,
    Stethoscope,
    Pill,
    FileText,
    CheckCircle,
    Loader2,
    AlertCircle
} from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:5000";

const PrescriptionModal = ({ appointment, onClose, onCompleted }) => {
    const [diagnosis, setDiagnosis] = useState("");
    const [notes, setNotes] = useState("");
    const [medicines, setMedicines] = useState([
        { name: "", dosage: "", frequency: "", duration: "" }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const addMedicine = () => {
        setMedicines([...medicines, { name: "", dosage: "", frequency: "", duration: "" }]);
    };

    const removeMedicine = (index) => {
        if (medicines.length === 1) return;
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    const updateMedicine = (index, field, value) => {
        const updated = [...medicines];
        updated[index][field] = value;
        setMedicines(updated);
    };

    const handleSubmit = async () => {
        if (!diagnosis.trim()) {
            setError("Diagnosis is required!");
            return;
        }

        setError("");
        setLoading(true);

        const payload = {
            appointmentId: appointment._id,
            doctorId: appointment.doctorId,
            doctorName: appointment.doctorName,
            doctorEmail: appointment.doctorEmail,
            patientId: appointment.patientId,
            patientName: appointment.patientName,
            patientEmail: appointment.patientEmail,
            appointmentDate: appointment.appointmentDate,
            diagnosis: diagnosis.trim(),
            medicines: medicines.filter(m => m.name.trim() !== ""),
            notes: notes.trim()
        };

        try {
            const res = await fetch(`${BACKEND_URL}/api/prescriptions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.message || "Failed to create prescription.");
                return;
            }

            setSuccess(true);
            // Notify parent to mark appointment as Completed in UI
            setTimeout(() => {
                if (onCompleted) onCompleted(appointment._id);
                onClose();
            }, 1500);

        } catch (err) {
            setError("Network error. Please check if backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 20 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative w-full max-w-2xl my-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                                <FilePlus className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-white font-bold text-base">Write Prescription</h2>
                                <p className="text-indigo-200 text-xs mt-0.5">
                                    Patient: <span className="font-semibold text-white">{appointment.patientName}</span>
                                    {" · "}{appointment.appointmentDate}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>
                    </div>

                    <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">

                        {/* Success state */}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-8 gap-3"
                            >
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                                </div>
                                <p className="font-bold text-slate-800 text-base">Prescription Created!</p>
                                <p className="text-xs text-slate-500">Appointment marked as Completed.</p>
                            </motion.div>
                        )}

                        {!success && (
                            <>
                                {/* Error */}
                                {error && (
                                    <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl px-4 py-3 text-xs font-medium">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        {error}
                                    </div>
                                )}

                                {/* Patient Symptoms (read-only) */}
                                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                                    <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1.5">
                                        Patient Reported Symptoms
                                    </p>
                                    <p className="text-sm text-slate-700 font-medium">
                                        {appointment.symptoms || "No symptoms specified."}
                                    </p>
                                </div>

                                {/* Diagnosis */}
                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                                        <Stethoscope className="w-3.5 h-3.5 text-indigo-500" />
                                        Diagnosis <span className="text-rose-500">*</span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={diagnosis}
                                        onChange={(e) => setDiagnosis(e.target.value)}
                                        placeholder="e.g. Acute upper respiratory tract infection with mild fever..."
                                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 text-slate-700 resize-none transition-colors"
                                    />
                                </div>

                                {/* Medicines */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                            <Pill className="w-3.5 h-3.5 text-indigo-500" />
                                            Medicines
                                        </label>
                                        <button
                                            type="button"
                                            onClick={addMedicine}
                                            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-colors"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            Add Medicine
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {medicines.map((med, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-slate-50 rounded-2xl p-3 border border-slate-200 relative"
                                            >
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Medicine name"
                                                        value={med.name}
                                                        onChange={(e) => updateMedicine(index, "name", e.target.value)}
                                                        className="col-span-2 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 text-slate-700"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Dosage (e.g. 500mg)"
                                                        value={med.dosage}
                                                        onChange={(e) => updateMedicine(index, "dosage", e.target.value)}
                                                        className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 text-slate-700"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Frequency (e.g. 3x daily)"
                                                        value={med.frequency}
                                                        onChange={(e) => updateMedicine(index, "frequency", e.target.value)}
                                                        className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 text-slate-700"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Duration (e.g. 7 days)"
                                                        value={med.duration}
                                                        onChange={(e) => updateMedicine(index, "duration", e.target.value)}
                                                        className="col-span-2 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 text-slate-700"
                                                    />
                                                </div>

                                                {medicines.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeMedicine(index)}
                                                        className="absolute top-3 right-3 w-6 h-6 bg-rose-100 hover:bg-rose-200 text-rose-500 rounded-lg flex items-center justify-center transition-colors"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                                        <FileText className="w-3.5 h-3.5 text-indigo-500" />
                                        Additional Notes
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="e.g. Rest for 3 days, avoid cold foods, follow-up after 1 week..."
                                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 text-slate-700 resize-none transition-colors"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Footer Buttons */}
                    {!success && (
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3 bg-slate-50/60">
                            <button
                                onClick={onClose}
                                disabled={loading}
                                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !diagnosis.trim()}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-colors shadow-md shadow-indigo-600/20"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        Complete & Save
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PrescriptionModal;

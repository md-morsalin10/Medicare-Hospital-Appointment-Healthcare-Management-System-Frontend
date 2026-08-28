"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MessageSquare, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const BACKEND_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:5000";

const ReviewModal = ({ prescription, onClose }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) {
            setError("Please select a rating!");
            return;
        }

        setError("");
        setLoading(true);

        const payload = {
            doctorId: prescription.doctorId,
            doctorName: prescription.doctorName,
            patientId: user?.id || prescription.patientId,
            patientName: user?.name || prescription.patientName,
            patientImage: user?.image || "",
            rating,
            reviewText: reviewText.trim()
        };

        try {

            
            const res = await fetch(`${BACKEND_URL}/api/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.message || "Failed to submit review.");
                return;
            }

            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            setError("Network error. Please try again.");
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
                    className="relative w-full max-w-lg my-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-white font-bold text-base">Write a Review</h2>
                                <p className="text-blue-100 text-xs mt-0.5">
                                    For {prescription.doctorName}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={loading || success}
                            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>
                    </div>

                    <div className="p-6 space-y-5">
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-8 gap-3"
                            >
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                                </div>
                                <p className="font-bold text-slate-800 text-base">Review Submitted!</p>
                                <p className="text-xs text-slate-500">Thank you for your feedback.</p>
                            </motion.div>
                        )}

                        {!success && (
                            <>
                                {error && (
                                    <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl px-4 py-3 text-xs font-medium">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 text-center">
                                        Rate Your Experience
                                    </label>
                                    <div className="flex items-center justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="transition-transform hover:scale-110 focus:outline-none"
                                            >
                                                <Star
                                                    className={`w-10 h-10 ${
                                                        star <= (hoverRating || rating)
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "text-slate-300"
                                                    } transition-colors`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                                        <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                                        Your Review (Optional)
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="How was your consultation? Would you recommend this doctor?"
                                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 resize-none transition-colors"
                                    />
                                </div>
                            </>
                        )}
                    </div>

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
                                disabled={loading || rating === 0}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-colors shadow-md shadow-blue-600/20"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        Submit Review
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

export default ReviewModal;

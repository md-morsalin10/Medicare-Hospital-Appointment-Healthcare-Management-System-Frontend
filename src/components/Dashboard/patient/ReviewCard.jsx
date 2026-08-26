"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Edit3, Trash2, XCircle, Calendar } from "lucide-react";

const ReviewCard = ({ review, onEdit, onDelete }) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Render stars based on rating
    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${
                            star <= rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-100 text-slate-200"
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
                <div>
                    {/* Header: Date & Action */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(review.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                            })}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onEdit(review)}
                                className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                                title="Edit Review"
                            >
                                <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsDeleteOpen(true)}
                                className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-colors"
                                title="Delete Review"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg shrink-0">
                            {review.doctorName?.charAt(0) || "D"}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-base">{review.doctorName}</h3>
                            {renderStars(review.rating)}
                        </div>
                    </div>

                    {/* Review Text */}
                    <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                        <p className="text-sm text-slate-600 italic leading-relaxed line-clamp-3">
                            "{review.reviewText}"
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Delete Confirmation Modal */}
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
                            <h3 className="font-bold text-slate-800 text-base mb-2">Delete Review?</h3>
                            <p className="text-xs text-slate-500 mb-6">
                                Are you sure you want to delete your review for <span className="font-semibold text-slate-700">{review.doctorName}</span>? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsDeleteOpen(false)}
                                    className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(review._id);
                                        setIsDeleteOpen(false);
                                    }}
                                    className="w-full py-2.5 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ReviewCard;

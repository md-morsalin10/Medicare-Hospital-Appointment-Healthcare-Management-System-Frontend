"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareOff, X, Loader2, Star } from "lucide-react";
import ReviewCard from "./ReviewCard";
import { getClientToken } from "@/lib/core/tokenClinet";

const BACKEND_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:5000";

const ReviewListClient = ({ initialReviews = [] }) => {
    const safeReviews = Array.isArray(initialReviews) ? initialReviews : [];
    const [reviews, setReviews] = useState(safeReviews);

    // Edit modal state
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [editRating, setEditRating] = useState(0);
    const [editHoverRating, setEditHoverRating] = useState(0);
    const [editReviewText, setEditReviewText] = useState("");
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState("");

    // DELETE handler
    const handleDelete = async (id) => {
        // Optimistic UI update
        setReviews((prev) => prev.filter((r) => r._id !== id));

        try {
            const token = await getClientToken()
            const res = await fetch(`${BACKEND_URL}/api/reviews/${id}`, {
                method: "DELETE",
                headers: {

                    "authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!data.success) {
                console.error("Delete failed:", data.message);
                // Could rollback here if needed
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // Open Edit Modal
    const handleOpenEdit = (review) => {
        setEditingReview(review);
        setEditRating(review.rating);
        setEditReviewText(review.reviewText);
        setEditError("");
        setIsEditOpen(true);
    };

    // EDIT handler
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (editRating === 0) {
            setEditError("Please select a rating.");
            return;
        }

        setEditLoading(true);
        setEditError("");

        try {
            const token = await getClientToken()
            const res = await fetch(`${BACKEND_URL}/api/reviews/${editingReview._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    rating: editRating,
                    reviewText: editReviewText
                })
            });

            const data = await res.json();

            if (!data.success) {
                setEditError(data.message || "Failed to update review.");
                return;
            }

            // Update UI state
            setReviews((prev) =>
                prev.map((r) =>
                    r._id === editingReview._id
                        ? { ...r, rating: editRating, reviewText: editReviewText }
                        : r
                )
            );

            setIsEditOpen(false);
            setEditingReview(null);
        } catch (err) {
            setEditError("Network error. Please try again.");
        } finally {
            setEditLoading(false);
        }
    };

    if (!reviews || reviews.length === 0) {
        return (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-md mx-auto mt-8">
                <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MessageSquareOff className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">No Reviews Found</h3>
                <p className="text-xs text-slate-500">You haven't reviewed any doctors yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence>
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                            onEdit={handleOpenEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* EDIT REVIEW MODAL */}
            <AnimatePresence>
                {isEditOpen && editingReview && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-slate-800">Edit Review</h3>
                                    <button
                                        onClick={() => setIsEditOpen(false)}
                                        className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <form onSubmit={handleEditSubmit} className="space-y-5">
                                    {/* Star Rating Input */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                                            Update Rating <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onMouseEnter={() => setEditHoverRating(star)}
                                                    onMouseLeave={() => setEditHoverRating(0)}
                                                    onClick={() => setEditRating(star)}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={`w-8 h-8 transition-colors ${star <= (editHoverRating || editRating)
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "fill-slate-100 text-slate-200 hover:fill-amber-200"
                                                            }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Review Text Input */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                                            Review Details
                                        </label>
                                        <textarea
                                            rows="4"
                                            value={editReviewText}
                                            onChange={(e) => setEditReviewText(e.target.value)}
                                            placeholder="Write your experience with this doctor..."
                                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 text-slate-700 transition-colors resize-none"
                                        ></textarea>
                                    </div>

                                    {/* Error Message */}
                                    {editError && (
                                        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3 py-2 rounded-xl font-medium">
                                            {editError}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={editLoading || editRating === 0}
                                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                                    >
                                        {editLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ReviewListClient;

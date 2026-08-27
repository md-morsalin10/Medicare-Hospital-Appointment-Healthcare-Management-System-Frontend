'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';

export default function DoctorReviewsClient({ reviewsData }) {
  const safeReviews = Array.isArray(reviewsData) ? reviewsData : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
            <MessageSquare className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Patient Reviews
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              See what your patients are saying about you.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeReviews.length > 0 ? (
          safeReviews.slice().reverse().map((review, i) => (
            <motion.div
              key={review._id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={review.patientImage || 'https://cdn-icons-png.flaticon.com/512/9193/9193824.png'} 
                  alt={review.patientName || 'Patient'}
                  className="w-14 h-14 rounded-full border border-gray-200 object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{review.patientName || 'Anonymous Patient'}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star 
                        key={idx} 
                        className={`w-4 h-4 ${idx < (review.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm font-medium text-gray-600 ml-2">
                      {review.rating ? `${review.rating}.0` : '0.0'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-600 text-sm leading-relaxed">
                  "{review.reviewText || 'No review text provided.'}"
                </p>
              </div>
              {review.createdAt && (
                <div className="mt-6 pt-4 border-t border-gray-100 text-right">
                  <p className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-20 bg-white border border-gray-100 rounded-3xl shadow-sm">
            <Star className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No Reviews Yet</h3>
            <p className="text-gray-500 mt-2 text-center max-w-md">
              You haven't received any patient reviews yet. When patients leave feedback, it will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// components/doctors/DoctorCard.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Star, Briefcase, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const DoctorCard = ({ doc, itemVariants }) => {
    return (
        <motion.div
            variants={itemVariants}
            layout
            whileHover={{ y: -6 }}
            className="group relative bg-white rounded-3xl border border-slate-100 p-5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden"
        >
            {/* Top Section: Avatar & Basic Info */}
            <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="relative">
                        <img
                            src={doc.profileImage || 'https://i.ibb.co/0yN3Pn9K/g-9.jpg'}
                            alt={doc.doctorName}
                            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-[#0E7490]/20 transition-all"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>

                    <button
                        aria-label="Add to favorites"
                        className="p-2.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    >
                        <Heart size={18} />
                    </button>
                </div>

                {/* Doctor Name & Title */}
                <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-800 text-lg group-hover:text-[#0E7490] transition-colors truncate">
                            {doc.doctorName}
                        </h3>
                        {doc.verificationStatus === 'Verified' && (
                            <CheckCircle2 size={16} className="text-[#0E7490] shrink-0" />
                        )}
                    </div>
                    <p className="text-xs font-semibold text-[#0E7490] tracking-wide">
                        {doc.specialization}
                    </p>
                </div>

                {/* Rating & Qualification */}
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md font-bold text-amber-700">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span>4.9</span>
                    </div>
                    <span>•</span>
                    <span className="truncate">{doc.qualifications || 'MBBS, FCPS'}</span>
                </div>

                {/* Meta Info: Experience & Hospital */}
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                        <Briefcase size={14} className="text-slate-400" />
                        <span>{doc.experience}+ Yrs Exp</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 truncate">
                        <Building2 size={14} className="text-slate-400 shrink-0" />
                        <span className="truncate">{doc.hospitalName || 'Central Hospital'}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Fee & CTA */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Fee</span>
                    <span className="text-lg font-black text-slate-800">${doc.consultationFee}</span>
                </div>

                <Link
                    href={`/doctors/${doc._id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-[#0E7490] text-white text-xs font-bold transition-all shadow-md group-hover:shadow-lg"
                >
                    <span>Book Now</span>
                    <ArrowRight size={14} />
                </Link>
            </div>
        </motion.div>
    );
};
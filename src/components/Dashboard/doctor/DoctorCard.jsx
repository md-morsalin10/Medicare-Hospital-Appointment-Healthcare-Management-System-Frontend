"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Star, Briefcase, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export const DoctorCard = ({ doc }) => {
    return (
        <div
            className="group relative bg-white rounded-3xl border border-slate-200/80 p-5 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:shadow-cyan-900/10 hover:border-cyan-300 hover:-translate-y-1.5 transition-all duration-500 transform-gpu overflow-hidden"
        >
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
                {/* Image & Favorite/Rating */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-slate-100 group-hover:ring-cyan-200 transition-all duration-500 shadow-sm group-hover:shadow-md">
                            <img
                                src={doc.profileImage || 'https://i.ibb.co/0yN3Pn9K/g-9.jpg'}
                                alt={doc.doctorName}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></span>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                        <button
                            aria-label="Add to favorites"
                            className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:scale-110 active:scale-95 transition-all duration-200"
                        >
                            <Heart size={18} />
                        </button>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-xs font-bold text-amber-700 border border-amber-200/50 shadow-sm">
                            <Star size={12} className="fill-amber-400 text-amber-400" />
                            <span>4.9</span>
                        </div>
                    </div>
                </div>

                {/* Doctor Name & Title */}
                <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-[#0E7490] transition-colors duration-300 truncate">
                            {doc.doctorName}
                        </h3>
                        {doc.verificationStatus === 'Verified' && (
                            <CheckCircle2 size={16} className="text-[#0E7490] shrink-0" />
                        )}
                    </div>

                    <p className="text-xs font-bold text-[#0E7490] uppercase tracking-wider group-hover:translate-x-0.5 transition-transform duration-300">
                        {doc.specialization}
                    </p>

                    <p className="text-xs text-slate-500 font-medium line-clamp-1 pt-0.5 group-hover:text-slate-600 transition-colors duration-300">
                        {doc.qualifications || 'MBBS, FCPS'}
                    </p>
                </div>

                {/* Meta Info */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 group-hover:border-cyan-100/50 space-y-1.5 text-xs transition-colors duration-300">
                    <div className="flex items-center gap-2 text-slate-600">
                        <Briefcase size={14} className="text-slate-400 shrink-0 group-hover:text-cyan-500 transition-colors duration-300" />
                        <span className="font-medium">{doc.experience}+ Yrs Exp</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <Building2 size={14} className="text-slate-400 shrink-0 group-hover:text-cyan-500 transition-colors duration-300" />
                        <span className="truncate font-medium">{doc.hospitalName || 'Central Hospital'}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Fee & CTA */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 group-hover:border-cyan-100/50 flex items-center justify-between relative z-10 transition-colors duration-300">
                <div>
                    <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider group-hover:text-cyan-600/70 transition-colors duration-300">Fee</span>
                    <span className="text-lg font-black text-slate-900 group-hover:text-[#0E7490] transition-colors duration-300">${doc.consultationFee}</span>
                </div>

                <Link
                    href={`/doctors/${doc._id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 group-hover:bg-[#0E7490] text-white text-xs font-bold transition-all duration-300 shadow-sm group-hover:shadow-cyan-600/30 hover:-translate-y-0.5 active:scale-95"
                >
                    <span>Book Now</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>
        </div>
    );
};
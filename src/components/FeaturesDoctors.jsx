import { getFeaturedDoctors } from '@/lib/api/bookingData';
import React from 'react';

import Link from 'next/link';
import { ArrowRight, Stethoscope } from 'lucide-react';
import { DoctorCard } from './Dashboard/doctor/DoctorCard';

const FeaturesDoctors = async () => {
    // ব্যাকএন্ড থেকে ৪টি ডাটা এনে দেখাবে
    const doctors = await getFeaturedDoctors();

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    };

    return (
        <section className="bg-slate-50/60 py-20 lg:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#0E7490] text-xs font-bold uppercase tracking-wide mb-3">
                            <Stethoscope className="w-4 h-4 text-[#0E7490]" />
                            Top Specialists
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Our Expert <span className="text-[#0E7490]">Doctors</span>
                        </h2>
                        <p className="text-slate-600 mt-2 text-sm sm:text-base">
                            Book appointments with our top-rated medical specialists.
                        </p>
                    </div>

                    <Link
                        href="/doctors"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#0E7490] hover:text-cyan-800 transition-colors group"
                    >
                        View All Doctors
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* 4 Columns Responsive Grid */}
                {doctors && doctors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {doctors.slice(0, 4).map((doc) => (
                            <DoctorCard 
                                key={doc._id || doc.id} 
                                doc={doc} 
                                itemVariants={itemVariants} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
                        <p className="text-slate-500 font-medium text-sm">No featured doctors available right now.</p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default FeaturesDoctors;
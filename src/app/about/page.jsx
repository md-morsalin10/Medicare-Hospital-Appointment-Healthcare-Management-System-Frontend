'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const stats = [
    { id: 1, name: 'Specialist Doctors', value: '120+' },
    { id: 2, name: 'Satisfied Patients', value: '15,000+' },
    { id: 3, name: 'Medical Departments', value: '25+' },
    { id: 4, name: 'Client Satisfaction', value: '99.2%' },
];

const features = [
    {
        title: '24/7 Clinical Support',
        desc: 'Round-the-clock emergency assistance and instant doctor consultations at your convenience.',
        icon: (
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        title: 'Verified Medical Specialists',
        desc: 'All doctors are board-certified practitioners with extensive experience in clinical care.',
        icon: (
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        title: 'Seamless Appointment System',
        desc: 'Hassle-free online booking system designed to reduce wait times and optimize care.',
        icon: (
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
];

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Ambient Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/60 to-transparent blur-3xl pointer-events-none -z-10" />

            {/* 1. Hero Section */}
            <section className="max-w-5xl mx-auto text-center pt-8 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-6"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    About MediCare Platform
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
                >
                    Revolutionizing Healthcare with <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                        Modern Clinical Intelligence
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
                >
                    MediCare connects patients with world-class medical specialists through a seamless, smart digital platform. Our goal is to make quality healthcare accessible, efficient, and reliable for everyone.
                </motion.p>
            </section>

            {/* 2. Interactive ECG Core Card */}
            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="max-w-4xl mx-auto mb-20"
            >
                <div className="relative p-8 sm:p-12 rounded-[2.5rem] bg-white border border-emerald-100 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.12)] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 max-w-md text-center md:text-left">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Our Core Commitment
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            We bridge the gap between patient care and technology by offering automated scheduling, real-time medical record tracking, and verified practitioner profiles.
                        </p>
                    </div>

                    {/* Animated Medical Badge Element */}
                    <div className="relative flex flex-col items-center justify-center p-6 bg-emerald-50/80 rounded-2xl border border-emerald-100/80 w-full md:w-64">
                        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white mb-3 shadow-md shadow-emerald-600/20">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                            </svg>
                        </div>
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                            Patient-First Approach
                        </span>
                    </div>
                </div>
            </motion.section>

            {/* 3. Key Statistics Section */}
            <section className="max-w-5xl mx-auto mb-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center hover:border-emerald-200 transition-colors"
                        >
                            <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-600 mb-1">
                                {stat.value}
                            </h3>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                {stat.name}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. Features Grid */}
            <section className="max-w-5xl mx-auto mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">
                        Why Choose MediCare?
                    </h2>
                    <p className="text-slate-600 text-sm max-w-lg mx-auto">
                        Designed with precision to offer an intuitive healthcare management experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-white border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col items-start"
                        >
                            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 mb-5">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5. Call To Action Footer */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl shadow-emerald-600/20"
            >
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                    Ready to Experience Better Healthcare?
                </h2>
                <p className="text-emerald-100 text-sm mb-6 max-w-md mx-auto">
                    Browse our directory of top medical specialists and book your appointment today.
                </p>
                <Link
                    href="/doctors"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-emerald-700 font-bold text-sm shadow-md hover:bg-emerald-50 transition-all active:scale-95"
                >
                    Find a Doctor
                </Link>
            </motion.section>
        </div>
    );
};

export default AboutPage;
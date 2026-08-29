'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 relative overflow-hidden">
            {/* Background Medical Ambient Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative max-w-lg w-full text-center z-10">
                {/* 404 & ECG Heartbeat Visual */}
                <div className="relative flex items-center justify-center mb-6">
                    <div className="relative p-8 rounded-3xl bg-white/80 border border-emerald-100 shadow-[0_20px_50px_-15px_rgba(16,185,129,0.12)] backdrop-blur-xl w-full">

                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-7xl font-black text-slate-800 tracking-tighter">4</span>

                            {/* Pulse Cross Icon */}
                            <div className="relative flex items-center justify-center w-16 h-16 mx-1">
                                <div className="absolute inset-0 rounded-2xl bg-emerald-100/60 animate-ping"></div>
                                <div className="relative w-14 h-14 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 transform rotate-3">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                                    </svg>
                                </div>
                            </div>

                            <span className="text-7xl font-black text-slate-800 tracking-tighter">4</span>
                        </div>

                        {/* Flatline ECG Wave */}
                        <div className="relative w-full h-8 my-3 flex items-center justify-center overflow-hidden bg-emerald-50/50 rounded-xl border border-emerald-100 px-2">
                            <svg
                                className="w-full h-full text-emerald-600"
                                viewBox="0 0 200 40"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    d="M 0 20 L 50 20 L 60 12 L 70 28 L 80 20 L 100 20 L 110 4 L 120 36 L 130 10 L 138 26 L 145 20 L 200 20"
                                    className="stroke-emerald-600 [stroke-dasharray:400] [stroke-dashoffset:400] animate-[ecgSweep_2s_ease-in-out_infinite]"
                                />
                            </svg>
                        </div>

                        {/* Status Label */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-600 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span>Page Signal Lost / Not Found</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                    Medical Record Not Found
                </h1>
                <p className="text-slate-600 text-sm mb-8 leading-relaxed max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-emerald-600/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Back to Home
                    </Link>

                    <button
                        onClick={() => router.back()}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
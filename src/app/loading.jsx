import React from 'react';

const GlobalLoading = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/20 backdrop-blur-md transition-all duration-500">

            {/* Main Light Holographic Container */}
            <div className="relative flex flex-col items-center justify-center p-10 rounded-[3rem] bg-white/90 border border-emerald-100 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.15)] backdrop-blur-2xl max-w-sm w-full mx-4 overflow-hidden">

                {/* 1. Light Ambient Glow Effects */}
                <div className="absolute -top-16 -left-16 w-36 h-36 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-teal-400/15 rounded-full blur-2xl pointer-events-none"></div>

                {/* 2. Light AI Core Sphere with Medical Cross */}
                <div className="relative flex items-center justify-center w-36 h-36 mb-6">

                    {/* Soft Ripple Ping Ring */}
                    <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>

                    {/* Dotted HUD Outer Ring */}
                    <div className="absolute inset-1 rounded-full border-2 border-dashed border-emerald-300/60 animate-[spin_20s_linear_infinite]"></div>

                    {/* Gradient Rotating Halo 1 */}
                    <div className="absolute inset-2 rounded-full border-2 border-t-emerald-500 border-r-teal-500 border-b-transparent border-l-transparent animate-[spin_2s_linear_infinite] shadow-sm"></div>

                    {/* Gradient Rotating Halo 2 (Reverse) */}
                    <div className="absolute inset-4 rounded-full border-2 border-t-transparent border-r-transparent border-b-cyan-500 border-l-emerald-400 animate-[spin_1.5s_linear_infinite_reverse]"></div>

                    {/* Glowing Light Core Orb */}
                    <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-300 flex items-center justify-center shadow-[0_8px_25px_rgba(16,185,129,0.35)] animate-[orbGlow_2.5s_ease-in-out_infinite]">

                        {/* Soft Glass Overlay */}
                        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-[1px]"></div>

                        {/* Medical Plus Cross Icon */}
                        <div className="relative z-20 text-white animate-[crossPulse_1.5s_ease-in-out_infinite]">
                            <svg
                                className="w-10 h-10 drop-shadow-sm"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                            </svg>
                        </div>
                    </div>

                    {/* Orbiting Particle */}
                    <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
                        <div className="w-3 h-3 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)] top-0 left-1/2 -translate-x-1/2 absolute"></div>
                    </div>
                </div>

                {/* 3. Clean Medical ECG Pulse Box */}
                <div className="relative w-full h-10 mb-5 flex items-center justify-center overflow-hidden bg-emerald-50/60 rounded-2xl border border-emerald-100/80 px-3">
                    {/* Soft Clinical Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98112_1px,transparent_1px),linear-gradient(to_bottom,#10b98112_1px,transparent_1px)] bg-[size:8px_8px]"></div>

                    <svg
                        className="w-full h-full text-emerald-600 z-10"
                        viewBox="0 0 200 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path
                            d="M 0 20 L 40 20 L 50 12 L 60 28 L 70 20 L 85 20 L 95 4 L 105 36 L 115 10 L 123 26 L 130 20 L 200 20"
                            className="stroke-emerald-600 [stroke-dasharray:400] [stroke-dashoffset:400] animate-[ecgSweep_1.6s_ease-in-out_infinite]"
                        />
                    </svg>

                    {/* Scanning Light Beam */}
                    <div className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent animate-[scan_1.6s_linear_infinite]"></div>
                </div>

                {/* 4. Medicare Branding & Status Badge */}
                <div className="text-center space-y-2 z-10">
                    <h3 className="text-2xl font-black tracking-tight text-slate-800">
                        Medi<span className="text-emerald-600">Care</span>
                    </h3>

                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[11px] font-bold tracking-wider text-emerald-700 uppercase">
                            Clinical Data Loading...
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GlobalLoading;
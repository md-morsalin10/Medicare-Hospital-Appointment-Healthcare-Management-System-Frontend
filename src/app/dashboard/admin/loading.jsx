import React from 'react';

const AdminDashboardLoading = () => {
    return (
        <div className="w-full space-y-6 animate-pulse p-4 sm:p-6 bg-slate-50/50 min-h-screen">

            {/* 1. Header Banner Skeleton (Lighter Soft Dark Tone) */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-700/80 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
                <div className="space-y-3 max-w-lg w-full">
                    <div className="h-6 w-36 bg-slate-500/50 rounded-full"></div>
                    <div className="h-9 w-3/4 bg-slate-500/60 rounded-xl"></div>
                    <div className="h-4 w-full bg-slate-500/30 rounded-md"></div>
                </div>
                {/* Right Total Revenue Card Placeholder */}
                <div className="w-full md:w-64 h-24 bg-slate-600/50 rounded-2xl border border-slate-500/30 p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-500/40 rounded-xl shrink-0"></div>
                    <div className="space-y-2 w-full">
                        <div className="h-3 w-20 bg-slate-500/40 rounded"></div>
                        <div className="h-6 w-24 bg-slate-500/60 rounded"></div>
                    </div>
                </div>
            </div>

            {/* 2. Top Metric Cards Row Skeleton (5 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">

                {/* Card 1: User Demographics / Donut Chart */}
                <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
                    <div className="h-3 w-28 bg-slate-200/80 rounded"></div>
                    <div className="flex items-center gap-2">
                        <div className="h-7 w-8 bg-slate-200 rounded"></div>
                        <div className="h-3 w-16 bg-slate-100 rounded"></div>
                    </div>
                    <div className="flex items-center justify-center py-2">
                        <div className="w-20 h-20 rounded-full border-8 border-slate-100 border-t-emerald-300"></div>
                    </div>
                </div>

                {/* Card 2: Total Patients */}
                <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="h-3 w-20 bg-slate-200/80 rounded"></div>
                            <div className="h-8 w-10 bg-slate-200 rounded"></div>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-blue-50/70"></div>
                    </div>
                    <div className="space-y-2 pt-2">
                        <div className="flex justify-between">
                            <div className="h-3 w-16 bg-slate-150 rounded"></div>
                            <div className="h-3 w-8 bg-slate-150 rounded"></div>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                    </div>
                </div>

                {/* Card 3: Total Doctors */}
                <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="h-3 w-20 bg-slate-200/80 rounded"></div>
                            <div className="h-8 w-10 bg-slate-200 rounded"></div>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-emerald-50/70"></div>
                    </div>
                    <div className="space-y-2 pt-2">
                        <div className="flex justify-between">
                            <div className="h-3 w-16 bg-slate-150 rounded"></div>
                            <div className="h-3 w-8 bg-slate-150 rounded"></div>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                    </div>
                </div>

                {/* Card 4: Appointments */}
                <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="h-3 w-20 bg-slate-200/80 rounded"></div>
                            <div className="h-8 w-10 bg-slate-200 rounded"></div>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-amber-50/70"></div>
                    </div>
                    <div className="h-6 w-24 bg-slate-100 rounded-full"></div>
                </div>

                {/* Card 5: Transactions */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="h-3 w-20 bg-slate-200/80 rounded"></div>
                            <div className="h-8 w-10 bg-slate-200 rounded"></div>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-purple-50/70"></div>
                    </div>
                    <div className="h-6 w-24 bg-slate-100 rounded-full"></div>
                </div>

            </div>

            {/* 3. Bottom Charts Section (Revenue & Doctor Performance) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Revenue Trajectory Chart Placeholder */}
                <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="h-5 w-40 bg-slate-200 rounded"></div>
                            <div className="h-3 w-32 bg-slate-100 rounded"></div>
                        </div>
                        <div className="h-8 w-24 bg-emerald-50 rounded-full"></div>
                    </div>
                    {/* Simulated Graph Skeleton */}
                    <div className="h-52 w-full bg-slate-50 rounded-2xl flex items-end p-4 gap-3">
                        {[40, 65, 30, 85, 55, 90, 75].map((height, i) => (
                            <div
                                key={i}
                                style={{ height: `${height}%` }}
                                className="w-full bg-slate-200/70 rounded-t-lg"
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Doctor Performance Placeholder */}
                <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="h-5 w-36 bg-slate-200 rounded"></div>
                            <div className="h-3 w-28 bg-slate-100 rounded"></div>
                        </div>
                        <div className="h-7 w-20 bg-amber-50 rounded-full"></div>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200/80"></div>
                                    <div className="space-y-1">
                                        <div className="h-4 w-28 bg-slate-200 rounded"></div>
                                        <div className="h-3 w-16 bg-slate-150 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-6 w-12 bg-slate-200/70 rounded-md"></div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AdminDashboardLoading;
import React from 'react';

const DoctorDashboardLoading = () => {
    return (
        <div className="w-full space-y-6 animate-pulse p-2 sm:p-4">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
                <div className="space-y-2">
                    <div className="h-7 w-48 bg-slate-200 rounded-lg"></div>
                    <div className="h-4 w-64 bg-slate-100 rounded-md"></div>
                </div>
                <div className="h-10 w-32 bg-slate-200 rounded-xl"></div>
            </div>

            {/* Quick Stats Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="h-4 w-20 bg-slate-100 rounded"></div>
                            <div className="w-8 h-8 rounded-xl bg-emerald-50"></div>
                        </div>
                        <div className="h-8 w-16 bg-slate-200 rounded-md"></div>
                        <div className="h-3 w-28 bg-slate-100 rounded"></div>
                    </div>
                ))}
            </div>

            {/* Main Content Area / Table Skeleton */}
            <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="h-5 w-40 bg-slate-200 rounded-md"></div>
                    <div className="h-4 w-20 bg-slate-100 rounded"></div>
                </div>

                {/* Table Row Placeholders */}
                {[1, 2, 3, 4, 5].map((row) => (
                    <div key={row} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0"></div>
                            <div className="space-y-1.5">
                                <div className="h-4 w-32 bg-slate-200 rounded"></div>
                                <div className="h-3 w-24 bg-slate-100 rounded"></div>
                            </div>
                        </div>
                        <div className="h-4 w-20 bg-slate-100 rounded hidden sm:block"></div>
                        <div className="h-6 w-16 bg-emerald-100/60 rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorDashboardLoading;
import React from 'react';

const PatientDashboardLoading = () => {
    return (
        <div className="w-full space-y-6 animate-pulse p-2 sm:p-4">
            {/* Greeting Banner Skeleton */}
            <div className="p-6 rounded-3xl bg-slate-200/70 h-32 flex flex-col justify-center space-y-2">
                <div className="h-6 w-48 bg-slate-300 rounded-md"></div>
                <div className="h-4 w-64 bg-slate-300/60 rounded-md"></div>
            </div>

            {/* Appointments / Prescriptions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="h-5 w-32 bg-slate-200 rounded"></div>
                            <div className="h-6 w-20 bg-emerald-100/60 rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-slate-100 rounded"></div>
                            <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientDashboardLoading;
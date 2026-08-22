import ManageSchedulesClient from '@/components/Dashboard/doctor/ManageSchedulesClient';
import { getDoctorsProfileById } from '@/lib/api/doctors';
import { getUserSeason } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowRight, UserCheck } from 'lucide-react';

const SchedulesPage = async () => {
    const user = await getUserSeason();
    console.log('User Session:', user);
    const doctorId = user?.id;

    const doctorData = await getDoctorsProfileById({ doctorId });

    const doctor = Array.isArray(doctorData) ? doctorData[0] : doctorData;

    console.log('Fetched Doctor Profile:', doctor);

    if (!doctor) {
        redirect('/dashboard/doctor/profile');
    }

    
    if (doctor?.verificationStatus !== 'Verified') {
        return (
            <div className="max-w-2xl mx-auto my-12 p-6 sm:p-8 bg-white border border-amber-200/80 rounded-3xl shadow-sm text-center space-y-6">
                {/* Warning Icon Badge */}
                <div className="w-16 h-16 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto text-amber-600 shadow-inner">
                    <ShieldAlert size={32} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                        Account Verification Required
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 max-w-md mx-auto leading-relaxed">
                        Your doctor profile is currently{" "}
                        <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            {doctor?.verificationStatus || "Pending"}
                        </span>.
                        You can manage your schedules once an administrator verifies your account.
                    </p>
                </div>

                {/* Information Card */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left text-xs text-slate-600 space-y-1">
                    <p className="font-bold text-slate-700 flex items-center gap-1.5">
                        <UserCheck size={14} className="text-[#0E7490]" /> What happens next?
                    </p>
                    <p className="pl-5 text-slate-500">
                        Our admin team is reviewing your profile details and documents. This process usually takes a short time. Please check back later or update your profile info.
                    </p>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                    <Link
                        href="/dashboard/doctor/profile"
                        className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#0E7490] hover:bg-[#085369] rounded-xl transition shadow-sm hover:shadow"
                    >
                        View Profile Status <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        );
    }

    return <ManageSchedulesClient doctor={doctor} />;
};

export default SchedulesPage;
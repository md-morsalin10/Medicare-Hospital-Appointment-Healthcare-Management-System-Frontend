import { getPrescriptionsByDoctorId } from '@/lib/api/prescriptions';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';
import PrescriptionListClient from '@/components/Dashboard/doctor/PrescriptionListClient';

const PrescriptionsPage = async () => {
    const user = await getUserSeason();
    const prescriptionsData = await getPrescriptionsByDoctorId({ doctorId: user?.id });

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <PrescriptionListClient initialPrescriptions={prescriptionsData || []} />
            </div>
        </div>
    );
};

export default PrescriptionsPage;
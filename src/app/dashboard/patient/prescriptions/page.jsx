import { getPrescriptionsByPatientId } from '@/lib/api/prescriptions';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';
import PatientPrescriptionListClient from '@/components/Dashboard/patient/PatientPrescriptionListClient';

const PrescriptionPage = async () => {
    const user = await getUserSeason();
    const prescriptionsData = await getPrescriptionsByPatientId({ patientId: user?.id });

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <PatientPrescriptionListClient initialPrescriptions={prescriptionsData || []} />
            </div>
        </div>
    );
};

export default PrescriptionPage;
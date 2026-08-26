import { getReviewsByPatientId } from '@/lib/api/reviews';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';
import ReviewListClient from '@/components/Dashboard/patient/ReviewListClient';

const PatientPage = async () => {
    const user = await getUserSeason();
    const reviewsData = await getReviewsByPatientId({ patientId: user?.id });

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                
                {/* Header Section */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                        My Reviews
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        View and manage the feedback you've given to doctors.
                    </p>
                </div>

                <ReviewListClient initialReviews={reviewsData || []} />
            </div>
        </div>
    );
};

export default PatientPage;
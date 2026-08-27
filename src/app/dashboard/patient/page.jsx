import { getBookingDataByPatientId } from '@/lib/api/bookingData';
import { getPrescriptionsByPatientId } from '@/lib/api/prescriptions';
import { getReviewsByPatientId } from '@/lib/api/reviews';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';
import PatientDashboardClient from './components/PatientDashboardClient';

const PatientPage = async () => {
    const user = await getUserSeason();
    
    // If user is null, the API calls will be made with undefined, but for safety:
    const patientId = user?.id;

    const reviewsData = await getReviewsByPatientId({ patientId });
    const bookingData = await getBookingDataByPatientId({ patientId });
    const prescriptionsData = await getPrescriptionsByPatientId({ patientId });

    return (
        <PatientDashboardClient 
            userData={user}
            bookingData={bookingData}
            reviewsData={reviewsData}
            prescriptionsData={prescriptionsData}
        />
    );
};

export default PatientPage;
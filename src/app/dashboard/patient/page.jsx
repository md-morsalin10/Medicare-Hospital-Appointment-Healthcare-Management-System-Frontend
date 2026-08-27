import { getReviewsByPatientId } from '@/lib/api/reviews';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';

const PatientPage = async () => {
    const user = await getUserSeason();
    const reviewsData = await getReviewsByPatientId({ patientId: user?.id });
    console.log('Reviews Data:', reviewsData);
    


    return (
        <div>

        </div>
    );
};

export default PatientPage;
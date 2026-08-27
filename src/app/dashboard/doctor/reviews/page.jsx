import { getReviewsByDoctorId } from '@/lib/api/reviews';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';
import DoctorReviewsClient from '../components/DoctorReviewsClient';

const DoctorReviewsPage = async () => {
    const user = await getUserSeason();
    const reviewsData = await getReviewsByDoctorId({ doctorId: user?.id });

    return (
        <DoctorReviewsClient 
            reviewsData={reviewsData}
        />
    );
};

export default DoctorReviewsPage;

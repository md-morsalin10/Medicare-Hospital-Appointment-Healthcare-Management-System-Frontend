import { getDoctorsProfileById } from '@/lib/api/doctors';
import { getPrescriptionsByDoctorId } from '@/lib/api/prescriptions';
import { getDoctorsScheduleById } from '@/lib/api/schedules';
import { getReviewsByDoctorId } from '@/lib/api/reviews';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';
import DoctorDashboardClient from './components/DoctorDashboardClient';
import { getBookingDataByDoctorId } from '@/lib/api/bookingData';

const DoctorPage = async () => {
    const user = await getUserSeason();
    // console.log('User Session:', user);
    const doctorId = user?.id;
    const doctorData = await getDoctorsProfileById({ doctorId });
    const schedulesData = await getDoctorsScheduleById({ doctorId });
    const reviewsData = await getReviewsByDoctorId({ doctorId: user?.id });
    const prescriptionsData = await getPrescriptionsByDoctorId({ doctorId: user?.id });
    const bookingData = await getBookingDataByDoctorId({ doctorId: user?.id });

    return (
        <DoctorDashboardClient 
            doctorData={doctorData}
            schedulesData={schedulesData}
            reviewsData={reviewsData}
            prescriptionsData={prescriptionsData}
            bookingData={bookingData}
        />
    );
};

export default DoctorPage;
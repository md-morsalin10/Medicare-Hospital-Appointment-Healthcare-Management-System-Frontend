import { getBookingDataByPatientId } from '@/lib/api/bookingData';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';

const AppointmentPage = async () => {
const user = await getUserSeason();

const bookingData = await getBookingDataByPatientId({ patientId: user?.id });

console.log('Booking Data:', bookingData);
    return (
        <div>

        </div>
    );
};

export default AppointmentPage;
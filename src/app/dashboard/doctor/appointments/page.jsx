import DoctorAppointmentList from '@/components/Dashboard/doctor/DoctorAppointmentList';
import { getBookingDataByDoctorId } from '@/lib/api/bookingData';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';


const AppointmentPage = async () => {
    const user = await getUserSeason();
    console.log("User Data:", user?.id);
    const bookingData = await getBookingDataByDoctorId({ doctorId: user?.id });
    console.log("Booking Data:", bookingData);

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header Section */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                        Appointment Requests
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Review patient symptoms, manage bookings, and prescribe treatments.
                    </p>
                </div>

                {/* Doctor Appointment List Component */}
                <DoctorAppointmentList initialBookings={bookingData || []} />

            </div>
        </div>
    );
};

export default AppointmentPage;
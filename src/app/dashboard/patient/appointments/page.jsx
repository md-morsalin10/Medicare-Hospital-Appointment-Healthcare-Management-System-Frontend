import AppointmentList from '@/components/Dashboard/paitent/AppointmentList';
import { getBookingDataByPatientId } from '@/lib/api/bookingData';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';


const AppointmentPage = async () => {
    const user = await getUserSeason();
    const bookingData = await getBookingDataByPatientId({ patientId: user?.id });
    console.log(bookingData, "bookingData")

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header Section */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                        My Appointments
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Manage your upcoming medical consultations and schedule updates.
                    </p>
                </div>

                {/* Client-side List Component */}
                <AppointmentList initialBookings={bookingData} />

            </div>
        </div>
    );
};

export default AppointmentPage;
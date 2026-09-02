import AppointmentManagementTable from '@/components/Dashboard/admin/AppointmentManagementTable';
import { getBookingData } from '@/lib/api/bookingData';
import React from 'react';


const ManageAppointment = async () => {
    const allAppointments = await getBookingData();

    // console.log("All Appointments:", allAppointments);

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header Section */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                        Manage Appointments
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        View all appointments and update patient booking status in real-time.
                    </p>
                </div>

                {/* Appointments Table Client Component */}
                <AppointmentManagementTable initialAppointments={allAppointments || []} />

            </div>
        </div>
    );
};

export default ManageAppointment;
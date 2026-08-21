import ManageSchedulesClient from '@/components/Dashboard/doctor/ManageSchedulesClient';
import { getDoctorsProfileById } from '@/lib/api/doctors';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';

const SchedulesPage = async () => {
    const user = await getUserSeason();
    console.log('User Session:', user);
    const doctorId = user?.id; 

    const doctorData = await getDoctorsProfileById({ doctorId });
    
    const doctor = Array.isArray(doctorData) ? doctorData[0] : doctorData;
    
    console.log('Fetched Doctor Profile:', doctor);

    if (!doctor) {
        return (
            <div className="p-8 text-center text-red-500 font-bold">
                Doctor Profile Not Found!
            </div>
        );
    }

    return <ManageSchedulesClient doctor={doctor} />;
};

export default SchedulesPage;
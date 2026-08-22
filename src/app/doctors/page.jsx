import { getAllDoctorsProfile } from '@/lib/api/doctors';
import React from 'react';

const DoctorPage = async () => {
    const doctorsData = await getAllDoctorsProfile();

    console.log('Fetched Doctors Profile:', doctorsData);
    return (
        <div>
            doctor page
        </div>
    );
};

export default DoctorPage;
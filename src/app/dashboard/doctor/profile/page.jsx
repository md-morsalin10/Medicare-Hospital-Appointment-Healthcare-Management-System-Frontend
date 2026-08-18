import DoctorProfileManager from '@/components/Dashboard/doctor/DoctorProfileManager';
import { getDoctorsProfileById } from '@/lib/api/doctors';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';


// Server Component (Renders on Server)
const DoctorProfiles = async () => {

    const user = await getUserSeason();
    console.log("User Data:", user);

    const data = await getDoctorsProfileById({ doctorId: user?.id });
    const initialProfile = data || null;

    console.log("Initial Profile Data:", initialProfile);

    return (
        <div className="w-full min-h-screen bg-slate-50/50 py-6">
            <DoctorProfileManager initialProfile={initialProfile} />
        </div>
    );
};

export default DoctorProfiles;
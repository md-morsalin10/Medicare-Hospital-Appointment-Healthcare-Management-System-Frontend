import DoctorProfileManager from '@/components/Dashboard/doctor/DoctorProfileManager';
import React from 'react';


// Server Component (Renders on Server)
const DoctorProfiles = async () => {
    // optional: Fetch existing doctor profile data from database/API here
    const initialProfile = null; // Set profile data object if doctor already exists

    return (
        <div className="w-full min-h-screen bg-slate-50/50 py-6">
            <DoctorProfileManager initialProfile={initialProfile} />
        </div>
    );
};

export default DoctorProfiles;
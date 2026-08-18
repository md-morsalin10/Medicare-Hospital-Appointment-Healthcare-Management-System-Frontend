import DoctorProfileManager from '@/components/Dashboard/doctor/DoctorProfileManager';
import React from 'react';


// Server Component (Renders on Server)
const DoctorProfiles = async () => {
    const initialProfile = null; 

    return (
        <div className="w-full min-h-screen bg-slate-50/50 py-6">
            <DoctorProfileManager initialProfile={initialProfile} />
        </div>
    );
};

export default DoctorProfiles;
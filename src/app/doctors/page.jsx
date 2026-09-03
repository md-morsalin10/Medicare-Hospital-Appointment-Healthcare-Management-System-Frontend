import { getAllDoctorsProfile } from '@/lib/api/doctors';
import FindDoctorsClient from './FindDoctorsClient';

const DoctorPage = async () => {
    const doctorsData = await getAllDoctorsProfile();

    // Optimize filtering and duplicate removal using a Map for O(n) time complexity
    const verifiedDoctorsMap = new Map();
    
    if (Array.isArray(doctorsData)) {
        doctorsData.forEach(doc => {
            if (doc.verificationStatus === 'Verified' && !verifiedDoctorsMap.has(doc._id)) {
                // Only pass necessary fields to the Client Component to avoid massive HTML serialization payload
                verifiedDoctorsMap.set(doc._id, {
                    _id: doc._id.toString(),
                    doctorName: doc.doctorName,
                    specialization: doc.specialization,
                    consultationFee: doc.consultationFee,
                    experience: doc.experience,
                    verificationStatus: doc.verificationStatus,
                    profileImage: doc.profileImage,
                    qualifications: doc.qualifications,
                    hospitalName: doc.hospitalName
                });
            }
        });
    }

    const verifiedDoctors = Array.from(verifiedDoctorsMap.values());

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-800">
                    Find a <span className="text-[#0E7490]">Specialist</span>
                </h1>
                <p className="text-sm sm:text-base font-medium text-slate-500 max-w-2xl">
                    Book appointments with top-rated healthcare professionals. Filter by specialty, location, or consultation fee.
                </p>
            </div>

            {/* Client Component */}
            <FindDoctorsClient doctors={verifiedDoctors} />
            </div>
        </div>
    );
};

export default DoctorPage;
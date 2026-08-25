import { getAllDoctorsProfile } from '@/lib/api/doctors';
import FindDoctorsClient from './FindDoctorsClient';

const DoctorPage = async () => {
    const doctorsData = await getAllDoctorsProfile();

    const verifiedDoctors = Array.isArray(doctorsData) 
        ? doctorsData.filter((doc, index, self) => 
            doc.verificationStatus === 'Verified' &&
            index === self.findIndex((d) => d._id === doc._id)
          )
        : [];

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
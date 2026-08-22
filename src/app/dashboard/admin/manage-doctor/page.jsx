import { getAllDoctorsProfile } from '@/lib/api/doctors';
import ManageDoctorsClient from './ManageDoctorsClient';

const ManageDoctor = async () => {
    const doctors = await getAllDoctorsProfile();

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-800">Manage Doctors</h1>
                <p className="text-xs font-semibold text-slate-500 mt-1">
                    Review, verify, reject, or update doctor status
                </p>
            </div>

            <ManageDoctorsClient initialDoctors={doctors || []} />
        </div>
    );
};

export default ManageDoctor;
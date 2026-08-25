import { getDoctorsScheduleById } from "@/lib/api/schedules";
import React from "react";
import Image from "next/image";
import DoctorScheduleSection from "@/components/DoctorScheduleSection";
import { getUserSeason } from "@/lib/core/session";


async function getDoctorById(id) {
    const res = await fetch(`http://localhost:5000/api/doctors/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
}

const DoctorDetailsPage = async ({ params }) => {
    const { id } = await params;

    // সমান্তরালে ডাটা ফেচিং
    const doctorData = getDoctorById(id);
    const scheduleData = getDoctorsScheduleById({ doctorId: id });
    const user = await getUserSeason(); 
    
    console.log("=== CHECKING USER SESSION DETAILS ===", user)
    
    const [doctor, doctorSchedule] = await Promise.all([doctorData, scheduleData]);

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Side: Doctor Profile Details & Reviews */}
                <div className="lg:col-span-8 order-2 lg:order-1 flex flex-col gap-6">
                    {/* Doctor Info Card */}
                    {doctor ? (
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6">
                            <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                <img
                                    src={doctor.profileImage || "/placeholder-doctor.jpg"}
                                    alt={doctor.doctorName}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {doctor.doctorName}
                                    </h2>
                                    <span className="inline-block mt-2 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide border border-emerald-100">
                                        {doctor.specialization} SPECIALIST
                                    </span>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <p className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                                        <strong className="text-gray-700">Qualifications:</strong> {doctor.qualifications}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        <strong className="text-gray-700">Clinical Background:</strong> {doctor.experience} Years Active Practice
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        <strong className="text-gray-700">Practicing Hospital:</strong> {doctor.hospitalName}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="font-bold text-emerald-600 ml-1 mr-0.5">$</span>
                                        <strong className="text-gray-700">Booking Co-Pay:</strong> ${doctor.consultationFee}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center text-gray-500">
                            Doctor details not found.
                        </div>
                    )}

                    {/* Reviews Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Clinician Reviews Feedback (0)</h3>
                        <p className="text-gray-400 text-sm italic">
                            No customer feedback verified for this clinician yet. Make a clinic appointment to post reviews feedback.
                        </p>
                    </div>
                </div>

                {/* Right Side: Schedules */}
                <div className="lg:col-span-4 order-1 lg:order-2">
                    <DoctorScheduleSection user={user} schedules={doctorSchedule || []} doctor={doctor} />
                </div>

            </div>
        </div>
        </div>
    );
};

export default DoctorDetailsPage;
import { getDoctorsScheduleById } from "@/lib/api/schedules";
import React from "react";
import Image from "next/image";
import DoctorScheduleSection from "@/components/DoctorScheduleSection"; // পাথ অনুযায়ী ইমপোর্ট করুন

// যদি আপনার কাছে Doctor By ID ফেচ করার API থাকে
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

    const [doctor, doctorSchedule] = await Promise.all([doctorData, scheduleData]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Side: Schedules */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                    <DoctorScheduleSection schedules={doctorSchedule || []} />
                </div>

                {/* Right Side: Doctor Profile Details */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                    {doctor ? (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                            <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                <img
                                    src={doctor.profileImage}
                                    alt={doctor.doctorName}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {doctor.doctorName}
                                    </h2>
                                    <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium border border-blue-200">
                                        {doctor.verificationStatus}
                                    </span>
                                </div>

                                <p className="text-emerald-600 font-medium">{doctor.specialization}</p>
                                <p className="text-gray-600 text-sm">{doctor.qualifications}</p>

                                <div className="pt-2 border-t border-gray-100 space-y-1.5 text-sm text-gray-600">
                                    <p>
                                        <strong className="text-gray-800">Hospital:</strong> {doctor.hospitalName}
                                    </p>
                                    <p>
                                        <strong className="text-gray-800">Experience:</strong> {doctor.experience} Years
                                    </p>
                                    <p>
                                        <strong className="text-gray-800">Consultation Fee:</strong> ৳{doctor.consultationFee}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-2xl border text-center text-gray-500">
                            Doctor details not found.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default DoctorDetailsPage;
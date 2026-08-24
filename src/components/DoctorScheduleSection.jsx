"use client";

import React, { useState } from "react";

const DoctorScheduleSection = ({ schedules = [] }) => {
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const handleBooking = () => {
        if (!selectedSchedule) return;
        console.log("Selected schedule to book:", selectedSchedule);
        // পরবর্তীতে বুকিংয়ের কাজ এখানে করবেন
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Available Schedules</h3>

            {schedules.length === 0 ? (
                <p className="text-gray-500 text-sm">No available schedules found.</p>
            ) : (
                <div className="space-y-3">
                    {schedules.map((schedule) => {
                        const isSelected = selectedSchedule?._id === schedule._id;

                        return (
                            <div
                                key={schedule._id}
                                onClick={() => setSelectedSchedule(schedule)}
                                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${isSelected
                                        ? "border-emerald-500 bg-emerald-50/50 shadow-sm"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <div>
                                    <p className="font-semibold text-gray-800">Date: {schedule.date}</p>
                                    <p className="text-sm text-gray-600">Time: {schedule.timeSlot}</p>
                                </div>
                                <div className="text-right">
                                    <span
                                        className={`inline-block px-2.5 py-1 text-xs rounded-full font-medium ${schedule.status === "Available"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {schedule.status}
                                    </span>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Max Patients: {schedule.maxPatients}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Book Now Button */}
            <button
                onClick={handleBooking}
                disabled={!selectedSchedule}
                className={`w-full mt-6 py-3 px-4 rounded-xl font-semibold transition-all shadow-md ${selectedSchedule
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
            >
                Book Now
            </button>
        </div>
    );
};

export default DoctorScheduleSection;
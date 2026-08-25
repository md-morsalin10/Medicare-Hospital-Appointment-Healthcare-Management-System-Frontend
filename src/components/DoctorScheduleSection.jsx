"use client";

import React, { useState } from "react";

const DoctorScheduleSection = ({ schedules = [], doctorFee = 0 }) => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [symptoms, setSymptoms] = useState("");

    // Extract unique dates from schedules
    const availableDates = [...new Set(schedules.map(s => s.date))];
    
    // Extract available times for selected date
    const availableTimesForDate = schedules.filter(s => s.date === selectedDate).map(s => ({
        id: s._id,
        time: s.timeSlot,
        status: s.status
    }));

    // Example of deriving workdays (simplified for UI demonstration)
    const workdays = ["Wednesday", "Friday"];

    const handleBooking = (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime) return;
        
        const scheduleDetails = availableTimesForDate.find(t => t.time === selectedTime);
        if (!scheduleDetails) return;

        const dummyBooking = {
            id: Math.random().toString(36).substr(2, 9),
            scheduleId: scheduleDetails.id,
            date: selectedDate,
            timeSlot: selectedTime,
            symptoms: symptoms,
            status: "Pending",
            createdAt: new Date().toISOString()
        };
        
        console.log("Dummy Booking created:", dummyBooking);
        alert("Booking selected! (Dummy data created)");
    };

    // Helper function to format date with day name
    const formatDateWithDay = (dateString) => {
        try {
            const dateObj = new Date(dateString);
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            return `${dateString} • ${dayName}`;
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Schedule Co-Pay</h3>
            <p className="text-sm text-gray-500 mb-6">
                Set active weekdays, daily clinician slot, and symptoms presentation description.
            </p>

            <form onSubmit={handleBooking} className="space-y-5">
                {/* CLINIC WORKDAYS */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                        Clinic Workdays
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {workdays.map((day) => (
                            <span key={day} className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-semibold">
                                {day}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CONFIGURE DATE */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Configure Date
                    </label>
                    <select
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setSelectedTime("");
                        }}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-700"
                    >
                        <option value="">Select appointment date</option>
                        {availableDates.map((date) => (
                            <option key={date} value={date}>
                                {formatDateWithDay(date)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* AVAILABLE HOURS SLOTS */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Available Hours Slots
                    </label>
                    <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        disabled={!selectedDate}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-700 disabled:bg-gray-50 disabled:text-gray-400"
                    >
                        <option value="">Select time slot</option>
                        {availableTimesForDate.map((slot) => (
                            <option key={slot.id} value={slot.time} disabled={slot.status !== "Available"}>
                                {slot.time} {slot.status !== "Available" ? `(${slot.status})` : ""}
                            </option>
                        ))}
                    </select>
                </div>

                {/* SYMPTOMS PRESENTATION */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Symptoms Presentation
                    </label>
                    <textarea
                        rows="3"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="e.g. Mild headache, regular physical co-pay check..."
                        className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-700 resize-none"
                    ></textarea>
                </div>

                {/* Book Appointment Button */}
                <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime}
                    className="w-full py-3.5 px-4 bg-[#2f614a] hover:bg-[#254f3b] text-white rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-2"
                >
                    Book Appointment (${doctorFee})
                </button>
            </form>
        </div>
    );
};

export default DoctorScheduleSection;
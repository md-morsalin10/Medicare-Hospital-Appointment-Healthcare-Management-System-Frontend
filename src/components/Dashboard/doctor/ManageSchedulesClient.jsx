"use client";

import React, { useState, useEffect } from "react";
import { Clock, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import AddScheduleForm from "./AddScheduleForm";
import DoctorInfoCard from "./DoctorInfoCard";
import ScheduleList from "./ScheduleList";
import { createDoctorSchedules } from "@/lib/action/schedules";
import { getDoctorsScheduleById } from "@/lib/api/schedules";

export default function ManageSchedulesClient({ doctor }) {
  const [schedules, setSchedules] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "10:00 AM - 10:30 AM",
    maxPatients: 1,
  });

  const timeSlots = [
    "09:00 AM - 09:30 AM",
    "09:30 AM - 10:00 AM",
    "10:00 AM - 10:30 AM",
    "10:30 AM - 11:00 AM",
    "04:00 PM - 04:30 PM",
    "04:30 PM - 05:00 PM",
    "06:00 PM - 06:30 PM",
    "07:00 PM - 07:30 PM",
  ];

  // Fix 1: _id কে অগ্রাধিকার দিন যদি ডাটাবেজে MongoDB ObjectId দিয়ে Schedule খোঁজা হয়
  const targetDoctorId = doctor?._id || doctor?.doctorId;

  const fetchSchedules = async () => {
    if (!targetDoctorId) return;
    try {
      setFetching(true);
      
      // API call
      const res = await getDoctorsScheduleById({ doctorId: targetDoctorId });

      console.log("Fetched API Raw Response:", res); // Debugging log

      // Fix 2: API Response Array নাকি Object (res.data / res.result) তা হ্যান্ডেল করা
      let finalSchedules = [];
      if (Array.isArray(res)) {
        finalSchedules = res;
      } else if (res && Array.isArray(res.data)) {
        finalSchedules = res.data;
      } else if (res && Array.isArray(res.result)) {
        finalSchedules = res.result;
      } else if (res && Array.isArray(res.schedules)) {
        finalSchedules = res.schedules;
      }

      // যদি _id দিয়ে ডাটা না পাওয়া যায়, তবে fallback হিসেবে doctorId দিয়ে চেষ্টা করে দেখতে পারেন
      if (finalSchedules.length === 0 && doctor?.doctorId && targetDoctorId !== doctor?.doctorId) {
        const fallbackRes = await getDoctorsScheduleById({ doctorId: doctor.doctorId });
        if (Array.isArray(fallbackRes)) finalSchedules = fallbackRes;
        else if (fallbackRes?.data) finalSchedules = fallbackRes.data;
      }

      setSchedules(finalSchedules);
    } catch (error) {
      console.error("Fetch schedules error:", error);
      toast.error("Failed to load schedules!");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [targetDoctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.timeSlot) {
      toast.error("Please select a valid date and time slot!");
      return;
    }

    const isDuplicate = schedules.some(
      (item) => item.date === formData.date && item.timeSlot === formData.timeSlot
    );

    if (isDuplicate) {
      toast.error("Schedule already exists for this date and time!");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        doctorId: targetDoctorId,
        doctorEmail: doctor?.doctorEmail,
        date: formData.date,
        timeSlot: formData.timeSlot,
        maxPatients: Number(formData.maxPatients),
      };

      const result = await createDoctorSchedules(payload);

      if (result?.success) {
        toast.success("Schedule created successfully!");
        fetchSchedules();
        setFormData((prev) => ({ ...prev, date: "" }));
      } else {
        toast.error(result?.message || "Failed to create schedule");
      }
    } catch (err) {
      toast.error("Network error! Could not save schedule.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      <Toaster position="top-right" />

      {/* Top Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <DoctorInfoCard doctor={doctor} totalSlots={schedules.length} />
        </div>

        <div className="lg:col-span-3">
          <AddScheduleForm
            formData={formData}
            setFormData={setFormData}
            timeSlots={timeSlots}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </div>
      </div>

      {/* Bottom Section: Active Schedules List */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80">
        <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
          <Clock size={18} className="text-[#0E7490]" /> Active Doctor Schedules
        </h2>

        {fetching ? (
          <div className="p-8 text-center bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-xs font-semibold">
            <Loader2 size={18} className="animate-spin" /> Loading schedules...
          </div>
        ) : (
          <ScheduleList
            schedules={schedules}
            onRefresh={fetchSchedules}
            timeSlots={timeSlots}
          />
        )}
      </div>
    </div>
  );
}
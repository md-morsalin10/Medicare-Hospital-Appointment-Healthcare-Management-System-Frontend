"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calendar, Users, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import AddScheduleForm from "./AddScheduleForm";
import DoctorInfoCard from "./DoctorInfoCard";

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

  const doctorId = doctor?.doctorId || doctor?._id;

  // ব্যাকএন্ড থেকে শিডিউল লোড
  const fetchSchedules = async () => {
    if (!doctorId) return;
    try {
      setFetching(true);
      const res = await fetch(`http://localhost:5000/api/schedules?doctorId=${doctorId}`);
      const data = await res.json();
      setSchedules(data);
    } catch (error) {
      toast.error("Failed to load schedules!");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [doctorId]);

  // সাবমিট হ্যান্ডলার
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
      const response = await fetch("http://localhost:5000/api/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: doctorId,
          doctorEmail: doctor?.doctorEmail,
          date: formData.date,
          timeSlot: formData.timeSlot,
          maxPatients: formData.maxPatients,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Schedule created successfully!");
        fetchSchedules();
        setFormData({ ...formData, date: "" });
      } else {
        toast.error(result.message || "Failed to create schedule");
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

      {/* Top Grid Layout: Left (Doctor Info) & Right (Form) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        
        {/* Left: Doctor Info (2 Columns) */}
        <div className="lg:col-span-2">
          <DoctorInfoCard doctor={doctor} totalSlots={schedules.length} />
        </div>

        {/* Right: Add Schedule Form (3 Columns) */}
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
        ) : schedules.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-slate-400">
            <AlertCircle size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-xs font-semibold">No schedules created yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {schedules.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-[#0E7490] bg-cyan-50 border border-cyan-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                        <Calendar size={12} /> {item.date}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 size={10} /> {item.status || "Available"}
                      </span>
                    </div>

                    <p className="text-sm font-extrabold text-slate-800 mt-2 flex items-center gap-1.5">
                      <Clock size={14} className="text-slate-400" />
                      {item.timeSlot}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs font-medium">
                    <span className="flex items-center gap-1">
                      <Users size={13} className="text-slate-400" /> Capacity: {item.maxPatients}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
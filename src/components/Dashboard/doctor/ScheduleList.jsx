"use client";

import React, { useState } from "react";
import {
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Trash2,
  X,
  Save,
  CalendarDays,
  Timer,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";


export default function ScheduleList({ schedules = [], onRefresh, timeSlots = [] }) {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Edit Modal ওপেন
  const handleEditClick = (item) => {
    setSelectedSchedule({ ...item });
    setIsOpen(true);
  };

  // Modal বন্ধ
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedSchedule(null);
  };

  // Update Submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL;
      const res = await fetch(`${baseUrl}/api/schedules/${selectedSchedule._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedSchedule.date,
          timeSlot: selectedSchedule.timeSlot,
          maxPatients: Number(selectedSchedule.maxPatients),
        }),
      });

      const data = await res.json();

      if (data?.success || res.ok) {
        toast.success("Schedule updated successfully!");
        handleCloseModal();
        onRefresh();
      } else {
        toast.error(data?.message || "Failed to update schedule");
      }
    } catch (err) {
      toast.error("Network error! Could not update schedule.");
    } finally {
      setUpdating(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-slate-800">
          Are you sure you want to delete this schedule?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              setDeletingId(id);
              try {
                const res = await fetch(`${baseUrl}/api/schedules/${id}`, {
                  method: "DELETE",
                });
                const data = await res.json();
                if (data?.success || res.ok) {
                  toast.success("Schedule deleted successfully!");
                  onRefresh();
                } else {
                  toast.error(data?.message || "Failed to delete schedule");
                }
              } catch (err) {
                toast.error("Network error! Could not delete schedule.");
              } finally {
                setDeletingId(null);
              }
            }}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 10000,
      style: { maxWidth: "360px" },
    });
  };

  // Date format helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Empty state
  if (!schedules || schedules.length === 0) {
    return (
      <div className="p-10 text-center bg-gradient-to-b from-slate-50 to-white rounded-3xl border-2 border-dashed border-slate-200">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
          <CalendarDays size={28} className="text-slate-300" />
        </div>
        <p className="text-sm font-bold text-slate-500">No schedules created yet</p>
        <p className="text-xs text-slate-400 mt-1">
          Create your first schedule using the form above
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Schedule Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence>
          {schedules.map((item, index) => {
            const isDeleting = deletingId === (item._id || item.id);
            return (
              <motion.div
                key={item._id || item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className={`group relative bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#0E7490]/20 transition-all duration-300 overflow-hidden ${isDeleting ? "opacity-50 pointer-events-none" : ""
                  }`}
              >
                {/* Top colored accent bar */}
                <div className="h-1 bg-gradient-to-r from-[#0E7490] via-cyan-400 to-emerald-400" />

                <div className="p-5">
                  {/* Date & Status Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 bg-cyan-50 border border-cyan-100 rounded-xl px-3 py-1.5">
                      <Calendar size={14} className="text-[#0E7490]" />
                      <span className="text-xs font-bold text-[#0E7490]">
                        {formatDate(item?.date)}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <CheckCircle2 size={10} />
                      {item?.status || "Available"}
                    </span>
                  </div>

                  {/* Time Slot */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0E7490] to-cyan-500 flex items-center justify-center shadow-md shadow-[#0E7490]/20">
                      <Timer size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Time Slot
                      </p>
                      <p className="text-sm font-extrabold text-slate-800">
                        {item?.timeSlot || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                    <UserCheck size={16} className="text-slate-400" />
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Max Capacity
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {item?.maxPatients ?? 0}{" "}
                        <span className="text-xs font-medium text-slate-400">patients</span>
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0E7490] bg-cyan-50 hover:bg-cyan-100 rounded-xl transition-all duration-200 cursor-pointer"
                      title="Edit Schedule"
                    >
                      <Edit2 size={13} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id || item.id)}
                      disabled={isDeleting}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all duration-200 disabled:opacity-50 cursor-pointer"
                      title="Delete Schedule"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ─── Edit Modal (Custom Overlay) ─── */}
      <AnimatePresence>
        {isOpen && selectedSchedule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleCloseModal}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#0E7490] to-cyan-500 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <Edit2 size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Edit Schedule</h3>
                    <p className="text-xs text-white/70">Modify your appointment slot</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/20 rounded-xl transition text-white/80 hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleUpdate} className="p-6 space-y-5">
                {/* Date Field */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    <Calendar size={14} className="text-[#0E7490]" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedSchedule.date || ""}
                    onChange={(e) =>
                      setSelectedSchedule({ ...selectedSchedule, date: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/10 transition-all"
                    required
                  />
                </div>

                {/* Time Slot Field */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    <Clock size={14} className="text-[#0E7490]" />
                    Time Slot
                  </label>
                  <select
                    value={selectedSchedule.timeSlot || ""}
                    onChange={(e) =>
                      setSelectedSchedule({ ...selectedSchedule, timeSlot: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/10 transition-all cursor-pointer"
                  >
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Max Patients Field */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    <Users size={14} className="text-[#0E7490]" />
                    Max Patients
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={selectedSchedule.maxPatients || 1}
                    onChange={(e) =>
                      setSelectedSchedule({
                        ...selectedSchedule,
                        maxPatients: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/10 transition-all"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-5 py-2.5 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#0E7490] hover:bg-[#085a70] rounded-xl shadow-lg shadow-[#0E7490]/20 transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    {updating ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
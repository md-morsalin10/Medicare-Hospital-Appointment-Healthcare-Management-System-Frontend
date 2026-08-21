"use client";

import React from "react";
import { Calendar, Clock, Users, Plus, Loader2 } from "lucide-react";

export default function AddScheduleForm({
  formData,
  setFormData,
  timeSlots,
  onSubmit,
  submitting,
}) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100/60">
      <h2 className="text-base font-extrabold text-slate-800 mb-4 flex items-center gap-2">
        <Plus size={18} className="text-[#0E7490]" /> Create New Schedule
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Select Date */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Select Date
          </label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0E7490]"
            />
          </div>
        </div>

        {/* Select Time Slot */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Time Slot
          </label>
          <div className="relative">
            <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={formData.timeSlot}
              onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0E7490] cursor-pointer"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Max Capacity */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Max Capacity (Patients)
          </label>
          <div className="relative">
            <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="number"
              min="1"
              max="50"
              required
              value={formData.maxPatients}
              onChange={(e) => setFormData({ ...formData, maxPatients: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0E7490]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-[#0E7490] hover:bg-[#085369] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#0E7490]/20 transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Creating...
            </>
          ) : (
            "Add Schedule"
          )}
        </button>
      </form>
    </div>
  );
}
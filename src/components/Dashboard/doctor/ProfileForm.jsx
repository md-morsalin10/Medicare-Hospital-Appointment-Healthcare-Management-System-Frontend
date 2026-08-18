"use client";

import React from "react";
import { User, GraduationCap, Briefcase, DollarSign, Building2, Image as ImageIcon, Loader2 } from "lucide-react";

const SPECIALIZATIONS = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "General Medicine"];
const AVAILABLE_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ProfileForm({ cardRef, formData, saving, isEditing, onChange, onDayToggle, onSubmit, onCancel }) {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div ref={cardRef} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl shadow-slate-200/50">
        
        {/* Header */}
        <div className="mb-8 pb-5 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Setup Provider Credentials</h2>
          <p className="text-slate-500 text-xs mt-1">Fill in your professional medical details.</p>
        </div>

        {/* Form Fields */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Doctor Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Doctor Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="doctorName"
                  required
                  placeholder="e.g. Dr. Sarah Chen"
                  value={formData.doctorName}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm font-medium outline-none focus:border-[#0E7490] focus:bg-white focus:ring-2 focus:ring-[#0E7490]/20"
                />
              </div>
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Specialization</label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={onChange}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 text-sm font-medium outline-none focus:border-[#0E7490] focus:bg-white focus:ring-2 focus:ring-[#0E7490]/20 cursor-pointer"
              >
                {SPECIALIZATIONS.map((item) => (
                  <option key={item} value={item} className="text-slate-900">{item}</option>
                ))}
              </select>
            </div>

            {/* Qualifications */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Qualifications</label>
              <div className="relative">
                <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="qualifications"
                  required
                  placeholder="e.g. MBBS, FCPS"
                  value={formData.qualifications}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm font-medium outline-none focus:border-[#0E7490] focus:bg-white focus:ring-2 focus:ring-[#0E7490]/20"
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Experience (Years)</label>
              <div className="relative">
                <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  name="experience"
                  required
                  placeholder="e.g. 10"
                  value={formData.experience}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm font-medium outline-none focus:border-[#0E7490] focus:bg-white focus:ring-2 focus:ring-[#0E7490]/20"
                />
              </div>
            </div>

            {/* Consultation Fee */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Consultation Fee ($)</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  name="consultationFee"
                  required
                  placeholder="e.g. 150"
                  value={formData.consultationFee}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm font-medium outline-none focus:border-[#0E7490] focus:bg-white focus:ring-2 focus:ring-[#0E7490]/20"
                />
              </div>
            </div>

            {/* Hospital Name (Fixed Background & Text Color) */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Hospital Affiliation</label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="hospitalName"
                  required
                  placeholder="e.g. Metro Health Hospital"
                  value={formData.hospitalName}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm font-medium outline-none focus:border-[#0E7490] focus:bg-white focus:ring-2 focus:ring-[#0E7490]/20"
                />
              </div>
            </div>

          </div>

          {/* Profile Image URL */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Profile Image URL</label>
            <div className="relative">
              <ImageIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="profileImage"
                placeholder="https://example.com/avatar.jpg"
                value={formData.profileImage}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm font-medium outline-none focus:border-[#0E7490] focus:bg-white focus:ring-2 focus:ring-[#0E7490]/20"
              />
            </div>
          </div>

          {/* Practice Days */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Available Practice Days</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_DAYS.map((day) => {
                const selected = formData.availableDays?.includes(day);
                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => onDayToggle(day)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selected ? "bg-[#0E7490] text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#0E7490] text-white text-xs font-bold hover:bg-[#085369] disabled:opacity-50 flex items-center gap-2 shadow-md transition"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? "Saving..." : isEditing ? "Update Profile" : "Create Profile"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
"use client";

import React from "react";
import {
  User,
  GraduationCap,
  Briefcase,
  DollarSign,
  Building2,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

const SPECIALIZATIONS = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "General Medicine",
];

const AVAILABLE_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const InputField = ({ label, icon: Icon, name, value, onChange, placeholder, type = "text", required = true }) => (
  <div>
    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
      {label}
    </label>
    <div className="relative group">
      <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0E7490] transition-colors" />
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white rounded-xl border border-slate-200/80 focus:border-[#0E7490] focus:ring-4 focus:ring-[#0E7490]/10 text-slate-800 text-sm font-medium transition-all outline-none"
      />
    </div>
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white rounded-xl border border-slate-200/80 focus:border-[#0E7490] focus:ring-4 focus:ring-[#0E7490]/10 text-slate-800 text-sm font-medium transition-all outline-none cursor-pointer"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default function ProfileForm({
  cardRef,
  formData,
  saving,
  isEditing,
  onChange,
  onDayToggle,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div
        ref={cardRef}
        className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-2xl shadow-slate-200/50"
      >
        <div className="mb-8 pb-5 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Setup Provider Credentials
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Fill in your professional medical details to update your official profile.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField
              label="Doctor Name"
              icon={User}
              name="doctorName"
              placeholder="e.g. Dr. Sarah Chen"
              value={formData.doctorName}
              onChange={onChange}
            />
            <SelectField
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={onChange}
              options={SPECIALIZATIONS}
            />
            <InputField
              label="Qualifications"
              icon={GraduationCap}
              name="qualifications"
              placeholder="e.g. MBBS, FCPS"
              value={formData.qualifications}
              onChange={onChange}
            />
            <InputField
              label="Experience (Years)"
              icon={Briefcase}
              name="experience"
              type="number"
              placeholder="e.g. 10"
              value={formData.experience}
              onChange={onChange}
            />
            <InputField
              label="Consultation Fee ($)"
              icon={DollarSign}
              name="consultationFee"
              type="number"
              placeholder="e.g. 150"
              value={formData.consultationFee}
              onChange={onChange}
            />
            <InputField
              label="Hospital Affiliation"
              icon={Building2}
              name="hospitalName"
              placeholder="e.g. Metro Health Hospital"
              value={formData.hospitalName}
              onChange={onChange}
            />
          </div>

          {/* Profile Image URL Input (Replacing ImageBB Upload) */}
          <InputField
            label="Profile Image URL"
            icon={ImageIcon}
            name="profileImage"
            placeholder="https://example.com/avatar.jpg"
            value={formData.profileImage}
            onChange={onChange}
            required={false}
          />

          {/* Practice Days Selection */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Available Practice Days
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_DAYS.map((day) => {
                const selected = formData.availableDays?.includes(day);
                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => onDayToggle(day)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selected
                        ? "bg-[#0E7490] text-white shadow-md shadow-[#0E7490]/25 scale-105"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0E7490] hover:bg-[#085369] text-white text-xs font-bold shadow-lg shadow-[#0E7490]/25 transition active:scale-95 disabled:opacity-70"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                "Update Profile"
              ) : (
                "Create Profile"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
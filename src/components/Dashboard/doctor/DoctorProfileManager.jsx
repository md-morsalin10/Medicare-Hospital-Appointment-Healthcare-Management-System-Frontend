"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import {
  User,
  GraduationCap,
  Briefcase,
  DollarSign,
  Building2,
  UploadCloud,
  Plus,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
} from "lucide-react";
import { createDoctorProfile } from "@/lib/action/doctorProfile";

const specializations = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "General Medicine",
];

const availableDaysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DoctorProfileManager({ initialProfile = null }) {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    doctorName: profile?.doctorName || "",
    specialization: profile?.specialization || "Cardiology",
    qualifications: profile?.qualifications || "",
    experience: profile?.experience || "",
    consultationFee: profile?.consultationFee || "",
    hospitalName: profile?.hospitalName || "",
    profileImage: profile?.profileImage || "",
    availableDays: profile?.availableDays || ["Mon", "Wed", "Fri"],
    availableSlots: profile?.availableSlots || "09:00 AM - 01:00 PM",
  });

  const cardRef = useRef(null);
  const formRef = useRef(null);

  // GSAP Entrance Animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isCreating, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDayToggle = (day) => {
    const updatedDays = formData.availableDays.includes(day)
      ? formData.availableDays.filter((d) => d !== day)
      : [...formData.availableDays, day];
    setFormData({ ...formData, availableDays: updatedDays });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDoctorProfile(formData); 
   
    setProfile(formData);
    setIsCreating(false);
    setIsEditing(false);
  };

  // State 1: No Profile Found View (Matching Image 2)
  if (!profile && !isCreating) {
    return (
      <div className="flex items-center justify-center min-h-[75vh] p-4">
        <div
          ref={cardRef}
          className="w-full max-w-2xl bg-white rounded-3xl p-10 text-center shadow-xl shadow-slate-100 border border-slate-100/80"
        >
          <div className="w-20 h-20 bg-cyan-50 text-[#0E7490] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <User size={38} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            No Doctor Profile Found
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Please set up your healthcare provider details to complete your registration and start taking patient appointments.
          </p>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 bg-[#0E7490] hover:bg-[#085369] text-white font-medium px-6 py-3.5 rounded-xl shadow-lg shadow-[#0E7490]/30 transition-all active:scale-95"
          >
            <Plus size={18} />
            Create Profile Now
          </button>
        </div>
      </div>
    );
  }

  // State 2: Setup Credentials Form View (Matching Image 1)
  if (isCreating || isEditing) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div
          ref={cardRef}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-100 border border-slate-100"
        >
          <div className="mb-8 border-b border-slate-100 pb-5">
            <h2 className="text-2xl font-bold text-slate-800">
              Setup Provider Credentials
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Complete fields explicitly matching corporate platform registry.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Doctor Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="doctorName"
                    required
                    placeholder="e.g. Dr. Sarah Chen"
                    value={formData.doctorName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/70 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#0E7490] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Specialization
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50/70 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#0E7490] focus:bg-white transition"
                >
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Qualifications
                </label>
                <div className="relative">
                  <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="qualifications"
                    required
                    placeholder="e.g. MBBS, FCPS"
                    value={formData.qualifications}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/70 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#0E7490] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Experience (Years)
                </label>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="experience"
                    required
                    placeholder="e.g. 10"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/70 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#0E7490] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Consultation Fee */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Consultation Fee ($)
                </label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="consultationFee"
                    required
                    placeholder="e.g. 150"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/70 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#0E7490] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Hospital Affiliation */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Hospital Affiliation
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="hospitalName"
                    required
                    placeholder="e.g. Metro Health Hospital"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/70 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#0E7490] focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* Available Days */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Available Practice Days
              </label>
              <div className="flex flex-wrap gap-2">
                {availableDaysList.map((day) => {
                  const selected = formData.availableDays.includes(day);
                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => handleDayToggle(day)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${selected
                          ? "bg-[#0E7490] text-white shadow-md shadow-[#0E7490]/20"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Profile Image Uploader Mock */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Profile Image
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-slate-50 transition">
                <UploadCloud size={30} className="mx-auto text-slate-400 mb-2" />
                <button
                  type="button"
                  className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
                >
                  Choose Image File
                </button>
                <p className="text-[11px] text-slate-400 mt-2">
                  Supports JPG, PNG up to 5MB
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setIsEditing(false);
                }}
                className="px-6 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 text-sm font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#0E7490] hover:bg-[#085369] text-white text-sm font-semibold shadow-md shadow-[#0E7490]/30 transition active:scale-95"
              >
                {isEditing ? "Update Profile" : "Create Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // State 3: Existing Profile Display View
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6" ref={cardRef}>
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100 border border-slate-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#0E7490] to-[#0891B2] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-[#0E7490]/30">
              {profile.doctorName?.[0] || "D"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-800">
                  {profile.doctorName}
                </h2>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={12} /> Verified
                </span>
              </div>
              <p className="text-sm font-medium text-[#0E7490] mt-0.5">
                {profile.specialization}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {profile.hospitalName}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-400">Qualifications</p>
            <p className="text-sm font-bold text-slate-800 mt-1">
              {profile.qualifications}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-400">Experience</p>
            <p className="text-sm font-bold text-slate-800 mt-1">
              {profile.experience} Years
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-400">Consultation Fee</p>
            <p className="text-sm font-bold text-[#0E7490] mt-1">
              ${profile.consultationFee}
            </p>
          </div>
        </div>

        {/* Schedule Overview */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Available Practice Days
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.availableDays?.map((day) => (
              <span
                key={day}
                className="px-3 py-1 bg-cyan-50 text-[#0E7490] text-xs font-bold rounded-lg border border-cyan-100"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
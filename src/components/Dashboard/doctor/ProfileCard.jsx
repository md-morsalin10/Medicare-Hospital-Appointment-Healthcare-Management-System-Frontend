"use client";

import React from "react";
import { CheckCircle2, ShieldAlert, Clock } from "lucide-react";

export default function ProfileCard({ cardRef, profile, onEdit }) {
  // ডাটা যদি Array হিসেবে আসে, তবে প্রথম Object টি বের করে নেওয়া হচ্ছে
  const data = Array.isArray(profile) ? profile[0] : profile;

  // ডাটা না থাকলে সেফটি রিটার্ন
  if (!data) return null;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6" ref={cardRef}>
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100 relative">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            {data?.profileImage ? (
              <img
                src={data.profileImage} // এখানে profileImage নাম দেওয়া হয়েছে
                alt={data.doctorName || "Doctor"}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-md shadow-slate-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0E7490] to-[#0891B2] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-[#0E7490]/20">
                {data?.doctorName?.[0] || "D"}
              </div>
            )}

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  {data?.doctorName}
                </h2>
                {data?.verificationStatus === "Verified" ? (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                ) : (
                  <span className="bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldAlert size={12} /> Pending Verification
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-[#0E7490] mt-1">
                {data?.specialization}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {data?.hospitalName}
              </p>
            </div>
          </div>

          <button
            onClick={onEdit}
            className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition active:scale-95"
          >
            Edit Profile
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-50/60 border border-slate-100/80">
            <p className="text-[11px] font-medium text-slate-400">Qualifications</p>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {data?.qualifications}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/60 border border-slate-100/80">
            <p className="text-[11px] font-medium text-slate-400">Experience</p>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {data?.experience} Years
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/60 border border-slate-100/80">
            <p className="text-[11px] font-medium text-slate-400">Consultation Fee</p>
            <p className="text-xs font-bold text-[#0E7490] mt-1">
              ${data?.consultationFee}
            </p>
          </div>
        </div>

        {/* Schedule & Timing */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              Available Days
            </h3>
            <div className="flex flex-wrap gap-2">
              {data?.availableDays?.map((day) => (
                <span
                  key={day}
                  className="px-3 py-1 bg-cyan-50 text-[#0E7490] text-xs font-bold rounded-lg border border-cyan-100/80"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          {data?.availableSlots && (
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Available Time
              </h3>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg w-fit">
                <Clock size={14} className="text-[#0E7490]" />
                {data.availableSlots}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
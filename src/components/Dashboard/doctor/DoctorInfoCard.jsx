"use client";

import React from "react";
import { Building2, Stethoscope, Mail, CheckCircle2, ShieldAlert, Sparkles, MapPin } from "lucide-react";

export default function DoctorInfoCard({ doctor, totalSlots }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
      {/* Background Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Header Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-full flex items-center gap-1">
            <Sparkles size={12} /> Doctor Profile
          </span>
          <span className="text-xs font-semibold bg-white/10 px-3 py-1 rounded-xl border border-white/10 text-slate-300">
            Slots: <span className="text-cyan-400 font-bold">{totalSlots}</span>
          </span>
        </div>

        {/* Doctor Avatar & Basic Info */}
        <div className="flex items-center gap-4 mb-6">
          {doctor?.profileImage ? (
            <img
              src={doctor.profileImage}
              alt={doctor.doctorName}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-500/50 shadow-md"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-cyan-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
              {doctor?.doctorName?.[0] || "D"}
            </div>
          )}

          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Dr. {doctor?.doctorName}
              {doctor?.verificationStatus === "Verified" ? (
                <CheckCircle2 size={16} className="text-emerald-400" />
              ) : (
                <ShieldAlert size={16} className="text-amber-400" />
              )}
            </h3>
            <p className="text-xs text-cyan-300 font-medium flex items-center gap-1 mt-0.5">
              <Stethoscope size={13} /> {doctor?.specialization || "Specialist"}
            </p>
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-3 border-t border-slate-700/60 pt-4 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <Building2 size={15} className="text-cyan-400 shrink-0" />
            <span className="truncate">{doctor?.hospitalName || "Hospital Not Specified"}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Mail size={15} className="text-cyan-400 shrink-0" />
            <span className="truncate">{doctor?.doctorEmail || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <MapPin size={15} className="text-cyan-400 shrink-0" />
            <span>{doctor?.qualifications || "MBBS"} ({doctor?.experience || 0} Yrs Exp)</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Status</span>
        <span className="text-emerald-400 font-bold">Active for Scheduling</span>
      </div>
    </div>
  );
}
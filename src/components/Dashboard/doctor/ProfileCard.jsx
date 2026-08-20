"use client";

import React from "react";
import { 
  CheckCircle2, 
  ShieldAlert, 
  GraduationCap, 
  Briefcase, 
  DollarSign, 
  Building2, 
  Edit3, 
  Sparkles,
  Stethoscope,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfileCard({ cardRef, profile, onEdit }) {
  const data = Array.isArray(profile) ? profile[0] : profile;

  if (!data) return null;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6" ref={cardRef}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-9 border border-slate-200/60 shadow-2xl shadow-cyan-950/5 relative overflow-hidden"
      >
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-[#0E7490]/15 to-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-cyan-500/10 to-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100 relative">
          <div className="flex items-center gap-5 text-center sm:text-left flex-col sm:flex-row">
            
            {/* Profile Avatar Container */}
            <motion.div 
              whileHover={{ scale: 1.04, rotate: 1 }} 
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group cursor-pointer"
            >
              {data?.profileImage ? (
                <div className="relative">
                  <img
                    src={data.profileImage}
                    alt={data.doctorName || "Doctor"}
                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-50 shadow-xl shadow-slate-200/80 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 pointer-events-none" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#0E7490] via-[#0891B2] to-cyan-500 flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-[#0E7490]/25">
                  {data?.doctorName?.[0] || "D"}
                </div>
              )}
              
              <span className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-md border border-slate-100/80 flex items-center justify-center">
                <Sparkles size={13} className="text-[#0E7490]" />
              </span>
            </motion.div>

            {/* Doctor Basic Details */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  {data?.doctorName}
                </h2>
                
                {/* Verification Badge */}
                {data?.verificationStatus === "Verified" ? (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <CheckCircle2 size={13} className="text-emerald-600" /> Verified
                  </span>
                ) : (
                  <span className="bg-amber-50 text-amber-700 border border-amber-200/80 text-[11px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <ShieldAlert size={13} className="text-amber-600" /> Pending Verification
                  </span>
                )}
              </div>

              {/* Specialization Badge */}
              <div className="inline-flex items-center gap-1.5 text-[#0E7490] font-bold text-xs uppercase tracking-wider bg-cyan-50/80 px-2.5 py-1 rounded-lg border border-cyan-100/80">
                <Stethoscope size={13} />
                <span>{data?.specialization}</span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onEdit}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-lg shadow-slate-900/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Edit3 size={14} />
            Edit Profile
          </motion.button>
        </div>

        {/* Highlighted Hospital/Affiliation Section */}
        <motion.div 
          whileHover={{ scale: 1.005 }}
          className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg shadow-slate-900/10 flex items-center justify-between gap-4 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-white/5 blur-xl pointer-events-none" />
          
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 text-cyan-400">
              <Building2 size={22} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Hospital Affiliation
              </p>
              <h3 className="text-sm sm:text-base font-bold text-slate-100 mt-0.5 flex items-center gap-1.5">
                {data?.hospitalName || "Not Specified"}
              </h3>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-slate-400 text-xs font-medium bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            <MapPin size={13} className="text-cyan-400" />
            <span>Primary Location</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          
          {/* Qualifications */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-md hover:shadow-slate-100 transition-all"
          >
            <div className="flex items-center gap-2 text-slate-400 mb-1.5">
              <GraduationCap size={16} className="text-[#0E7490]" />
              <p className="text-[10px] font-bold uppercase tracking-wider">Qualifications</p>
            </div>
            <p className="text-sm font-extrabold text-slate-800">
              {data?.qualifications || "N/A"}
            </p>
          </motion.div>

          {/* Experience */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-md hover:shadow-slate-100 transition-all"
          >
            <div className="flex items-center gap-2 text-slate-400 mb-1.5">
              <Briefcase size={16} className="text-[#0E7490]" />
              <p className="text-[10px] font-bold uppercase tracking-wider">Experience</p>
            </div>
            <p className="text-sm font-extrabold text-slate-800">
              {data?.experience ? `${data.experience} Years` : "N/A"}
            </p>
          </motion.div>

          {/* Consultation Fee */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 hover:border-emerald-200 hover:bg-emerald-50/80 transition-all"
          >
            <div className="flex items-center gap-2 text-emerald-600 mb-1.5">
              <DollarSign size={16} />
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Consultation Fee</p>
            </div>
            <p className="text-lg font-black text-emerald-700">
              ${data?.consultationFee || "0"}
            </p>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
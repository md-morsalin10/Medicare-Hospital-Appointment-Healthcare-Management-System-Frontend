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
    <div className="max-w-4xl mx-auto p-4 sm:p-6" ref={cardRef}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/40 relative overflow-hidden"
      >
        {/* Top Banner */}
        <div className="h-32 sm:h-48 w-full bg-gradient-to-r from-[#0E7490] via-cyan-600 to-teal-500 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          {/* Edit Profile Button */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEdit}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-white/30"
            >
              <Edit3 size={16} />
              <span className="hidden sm:inline">Edit Profile</span>
            </motion.button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 sm:px-10 pb-10 relative">
          
          {/* Avatar & Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-20 mb-8 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              className="relative group"
            >
              {data?.profileImage ? (
                <div className="relative">
                  <img
                    src={data.profileImage}
                    alt={data.doctorName || "Doctor"}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover ring-8 ring-white shadow-xl transition-all duration-300 bg-white"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-[#0E7490] to-cyan-400 flex items-center justify-center text-white font-bold text-5xl ring-8 ring-white shadow-xl">
                  {data?.doctorName?.[0] || "D"}
                </div>
              )}
              
              <span className="absolute bottom-2 right-2 bg-white p-2 rounded-xl shadow-md border border-slate-100 flex items-center justify-center">
                <Sparkles size={16} className="text-[#0E7490]" />
              </span>
            </motion.div>

            <div className="text-center sm:text-left flex-1 pt-2 sm:pt-0 sm:pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                  {data?.doctorName}
                </h2>
                {data?.verificationStatus === "Verified" ? (
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full shadow-sm w-fit mx-auto sm:mx-0">
                    <CheckCircle2 size={14} className="text-emerald-600" /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full shadow-sm w-fit mx-auto sm:mx-0">
                    <ShieldAlert size={14} className="text-amber-600" /> Pending Verification
                  </span>
                )}
              </div>
              
              <div className="inline-flex items-center gap-1.5 text-[#0E7490] font-bold text-sm uppercase tracking-wider bg-cyan-50 px-3 py-1.5 rounded-xl border border-cyan-100">
                <Stethoscope size={16} />
                <span>{data?.specialization}</span>
              </div>
            </div>
          </div>

          {/* Hospital/Affiliation Section */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg shadow-slate-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 bottom-0 w-48 bg-white/5 blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
              <div className="p-3.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 text-cyan-400">
                <Building2 size={24} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-0.5">
                  Current Hospital Affiliation
                </p>
                <h3 className="text-lg font-bold text-slate-50 flex items-center gap-2">
                  {data?.hospitalName || "Not Specified"}
                </h3>
              </div>
            </div>

            <div className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 text-slate-300 text-sm font-medium bg-white/5 px-4 py-2 rounded-xl border border-white/10 relative z-10">
              <MapPin size={16} className="text-cyan-400" />
              <span>Primary Location</span>
            </div>
          </motion.div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-2.5 text-slate-500 mb-2">
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                  <GraduationCap size={18} className="text-[#0E7490]" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider">Qualifications</p>
              </div>
              <p className="text-base font-extrabold text-slate-800 pl-[42px]">
                {data?.qualifications || "N/A"}
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-2.5 text-slate-500 mb-2">
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                  <Briefcase size={18} className="text-[#0E7490]" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider">Experience</p>
              </div>
              <p className="text-base font-extrabold text-slate-800 pl-[42px]">
                {data?.experience ? `${data.experience} Years` : "N/A"}
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-5 rounded-2xl bg-emerald-50/30 border border-emerald-100 hover:border-emerald-200 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-2.5 text-emerald-700 mb-2">
                <div className="p-2 bg-emerald-100/50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                  <DollarSign size={18} />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider">Consultation Fee</p>
              </div>
              <p className="text-xl font-black text-emerald-800 pl-[42px]">
                ${data?.consultationFee || "0"}
              </p>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
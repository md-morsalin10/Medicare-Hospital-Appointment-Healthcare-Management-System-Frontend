"use client";

import React from "react";
import { User, Plus } from "lucide-react";

export default function NoProfileCard({ cardRef, onCreateClick }) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4">
      <div
        ref={cardRef}
        className="w-full max-w-lg bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden"
      >
        <div className="absolute -right-12 -top-12 w-40 h-40 bg-cyan-50 rounded-full blur-2xl pointer-events-none" />
        <div className="w-20 h-20 bg-gradient-to-b from-cyan-50 to-cyan-100/60 text-[#0E7490] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-cyan-100/80 shadow-inner">
          <User size={36} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">
          No Doctor Profile Found
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto mb-8 leading-relaxed">
          Please set up your healthcare provider details to complete your registration and start receiving appointments.
        </p>
        <button
          onClick={onCreateClick}
          className="inline-flex items-center gap-2 bg-[#0E7490] hover:bg-[#085369] text-white text-sm font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-[#0E7490]/25 hover:shadow-xl hover:shadow-[#0E7490]/35 transition-all active:scale-95"
        >
          <Plus size={18} />
          Create Profile Now
        </button>
      </div>
    </div>
  );
}